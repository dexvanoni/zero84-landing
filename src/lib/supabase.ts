import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verificar se as credenciais estão configuradas
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://exemplo.supabase.co' && 
  supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo';

// Função de diagnóstico
export function diagnoseSupabaseConfig() {
  const config = {
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    urlValid: supabaseUrl.includes('supabase.co'),
    keyValid: supabaseAnonKey.startsWith('eyJ'),
    isConfigured: isSupabaseConfigured
  };

  if (!config.isConfigured) {
    console.warn('⚠️ CRÍTICO: Supabase não configurado - verifique .env.local');
  }

  return config;
}

// Configurações mais robustas para o cliente Supabase
const supabaseOptions = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'strike-personalizados@1.0.0',
    },
  },
  // Configurações de rede mais robustas
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
};

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)
  : null;

// Cliente para operações administrativas
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
export const supabaseAdmin = isSupabaseConfigured && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, supabaseOptions)
  : null;

// Função wrapper para operações com retry e timeout
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Criar uma Promise com timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Timeout após ${5000}ms`));
        }, 5000); // 5 segundos de timeout
      });

      // Executar operação com timeout
      const result = await Promise.race([
        operation(),
        timeoutPromise
      ]);

      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Se não é a última tentativa, aguardar antes de tentar novamente
      if (attempt < maxRetries) {
        const delay = delayMs * attempt; // Delay progressivo
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`❌ CRÍTICO: Falha em ${maxRetries} tentativas:`, error);
      }
    }
  }

  throw lastError!;
}

// Diagnóstico apenas se necessário
if (typeof window !== 'undefined') {
  setTimeout(() => {
    if (!isSupabaseConfigured) {
      diagnoseSupabaseConfig();
    }
  }, 1000);
}

export { isSupabaseConfigured }; 