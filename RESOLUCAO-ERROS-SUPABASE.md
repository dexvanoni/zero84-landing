# 🔧 Resolução de Erros do Supabase

## ❌ **Erro Reportado:**
```
Error: Erro ao buscar categorias: {}
```

## 🔍 **Diagnóstico do Problema:**

Este erro indica que há um problema na configuração ou conexão com o Supabase. Vamos resolver passo a passo:

### **1. Verificar Console do Navegador**

Abra o **Console do Navegador** (F12) e procure por mensagens como:

- 🔧 `Supabase não configurado - usando dados estáticos`
- ⚠️ `Cliente Supabase não inicializado`
- ❌ `Erro específico do Supabase:`

### **2. Status Possíveis e Soluções:**

#### **🔧 Caso: Supabase Não Configurado**
**Mensagem:** `Supabase não configurado - usando dados estáticos`

**Solução:**
1. Crie o arquivo `.env.local` na raiz do projeto
2. Configure suas credenciais seguindo o `ENV-TEMPLATE.md`

#### **❌ Caso: Erro de Conexão/Credenciais**
**Mensagem:** `Erro específico do Supabase`

**Verificações:**
- ✅ URL do Supabase está correta?
- ✅ Chave anônima está correta?
- ✅ Projeto Supabase está ativo?
- ✅ Tabelas foram criadas no banco?

#### **🗄️ Caso: Tabelas Não Existem**
**Mensagem:** `relation "categories" does not exist`

**Solução:**
1. Acesse Supabase Dashboard > SQL Editor
2. Execute o conteúdo do arquivo `src/sql/database_schema.sql`

## 📋 **Checklist de Resolução:**

### **Passo 1: Verificar Configuração**
```bash
# Verificar se arquivo existe
ls -la .env.local

# Se não existir, criar:
touch .env.local
```

### **Passo 2: Configurar Credenciais**
Edite `.env.local` com suas credenciais reais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seuproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sua_chave_service_aqui
```

### **Passo 3: Executar Schema SQL**
1. Acesse: https://app.supabase.com
2. Vá em: **SQL Editor**
3. Cole o conteúdo de: `src/sql/database_schema.sql`
4. Execute o SQL

### **Passo 4: Reiniciar Servidor**
```bash
# Parar servidor atual
Ctrl+C

# Reiniciar
npm run dev
```

### **Passo 5: Verificar Logs**
Abra o Console do Navegador (F12) e procure por:
- ✅ `Categorias carregadas com sucesso: X encontradas`
- 🔍 `Diagnóstico Supabase: {isConfigured: true}`

## 🚀 **Teste Rápido:**

### **Opção A: Com Supabase Configurado**
```
1. Configurar .env.local ✅
2. Executar SQL schema ✅
3. Reiniciar servidor ✅
4. Ver logs positivos ✅
```

### **Opção B: Modo Demonstração (Sem Supabase)**
```
1. NÃO configurar .env.local
2. Site funciona com dados estáticos
3. Console mostra: "usando dados estáticos"
```

## 🔍 **Comandos de Diagnóstico:**

### **Ver Status das Variáveis:**
```javascript
// No console do navegador:
console.log({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
});
```

### **Testar Conexão:**
```javascript
// No console do navegador (após configurar):
const { supabase } = await import('/src/lib/supabase.js');
const { data, error } = await supabase.from('categories').select('*').limit(1);
console.log('Teste:', { data, error });
```

## ❓ **Problemas Comuns:**

### **1. Arquivo .env.local não carrega**
- Certificar que está na **raiz do projeto** (mesmo nível que package.json)
- Reiniciar servidor após criar/editar

### **2. Credenciais inválidas**
- Verificar se não há espaços extras
- Confirmar se copiou as chaves completas
- Verificar se projeto Supabase está ativo

### **3. Tabelas não existem**
- Executar SQL schema no Supabase Dashboard
- Verificar se não há erros na execução do SQL

### **4. CORS/Domínio**
- Adicionar localhost:3000 nas configurações do Supabase
- Verificar se URL está exata (sem barra no final)

## ✅ **Resultado Esperado:**

Após resolver, você deve ver no console:
```
🔍 Tentando buscar categorias do Supabase...
✅ Categorias carregadas com sucesso: X encontradas
```

E o site carregará produtos dinamicamente do banco de dados!

---

**🎨 Strike Personalizados - Supabase Configurado! 🎨**

*Precisando de ajuda? Verifique se seguiu todos os passos do ENV-TEMPLATE.md* 