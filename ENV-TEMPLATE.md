# 🔑 Template para Configuração do .env.local

## 📋 Instruções para Configurar o Supabase

**Crie um arquivo chamado `.env.local` na raiz do projeto** com o seguinte conteúdo:

```env
# ========================================
# 🔑 CONFIGURAÇÕES DO SUPABASE
# ========================================

# 🌐 URL do seu projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL_HERE

# 🔓 Chave Anônima (Public Key)
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE

# 🔐 Chave de Serviço (Admin Key)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE
```

## 🎯 Como Obter Suas Credenciais:

1. **Acesse o Supabase Dashboard**: https://app.supabase.com
2. **Selecione seu projeto**
3. **Vá em Settings > API**
4. **Copie as seguintes informações**:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

## 📝 Exemplo de Valores Reais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA2NzI2MCwiZXhwIjoxOTYxNjQzMjYwfQ.exemplo_signature_aqui
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ2MDY3MjYwLCJleHAiOjE5NjE2NDMyNjB9.exemplo_service_signature_aqui
```

## ⚠️ Importante:

- **NUNCA** commite o arquivo `.env.local` para o repositório
- O `.env.local` já está no `.gitignore` por padrão
- Mantenha suas credenciais seguras
- A **service_role key** é especialmente sensível - ela tem acesso total ao banco

## 🚀 Após Configurar:

1. **Execute o schema SQL** no Supabase Dashboard (SQL Editor)
2. **Reinicie o servidor**: `npm run dev`
3. **Acesse**: http://localhost:3000/admin
4. **Teste**: Criar/editar categorias e produtos

## 🛠️ Troubleshooting:

Se ainda houver erros:
- Verifique se todas as 3 variáveis estão configuradas
- Confirme se não há espaços extras nas chaves
- Verifique se o projeto Supabase está ativo
- Execute o SQL schema se ainda não fez

---

**🎨 Strike Personalizados - Sistema Pronto para Usar! 🎨** 