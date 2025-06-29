# 🗄️ Configuração do Supabase para Strike Personalizados

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Banco de dados PostgreSQL configurado

## 🔧 Configuração Passo a Passo

### 1. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seuprojectoid.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Como obter as credenciais:**
1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em `Settings` → `API`
3. Copie:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Executar o Schema SQL

1. No Supabase Dashboard, vá em `SQL Editor`
2. Clique em `New Query`
3. Cole todo o conteúdo do arquivo `src/sql/database_schema.sql`
4. Execute o script (`Run`)

### 3. Verificar Tabelas Criadas

Após executar o SQL, você deve ver:

**Tabela `categories`:**
- `id` (VARCHAR) - Chave primária
- `title` (VARCHAR) - Nome da categoria
- `description` (TEXT) - Descrição
- `created_at`, `updated_at` (TIMESTAMP)

**Tabela `products`:**
- `id` (BIGSERIAL) - Chave primária auto-incremento
- `name` (VARCHAR) - Nome do produto
- `description` (TEXT) - Descrição
- `image` (TEXT) - URL/base64 da imagem
- `tags` (TEXT[]) - Array de tags
- `category_id` (VARCHAR) - FK para categories
- `created_at`, `updated_at` (TIMESTAMP)

### 4. Configurar Row Level Security (RLS)

O schema já inclui políticas RLS básicas que:
- Permitem leitura pública (necessário para o site)
- Permitem operações administrativas (para o painel admin)

**Para produção, ajuste as políticas conforme sua autenticação.**

### 5. Testar a Conexão

1. Execute o projeto: `npm run dev`
2. Acesse `http://localhost:3000/admin`
3. Se configurado corretamente:
   - ✅ Carregará as categorias
   - ✅ Permitirá criar/editar produtos
   - ❌ Se houver erro, verifique as credenciais

## 🚀 Funcionalidades Implementadas

### Página Pública (`/`)
- ✅ Lista produtos do banco
- ✅ Carrosséis dinâmicos por categoria
- ✅ Fallback para dados estáticos em caso de erro

### Painel Admin (`/admin`)
- ✅ **CRUD Categorias**: Criar, editar, excluir
- ✅ **CRUD Produtos**: Criar, editar, excluir
- ✅ Upload de imagens (base64)
- ✅ Sistema de tags
- ✅ Interface responsiva

## 🔄 Migração de Dados Existentes

Se você tem dados estáticos, pode migrá-los:

1. Acesse o SQL Editor no Supabase
2. Execute comandos INSERT para seus produtos:

```sql
-- Exemplo de inserção
INSERT INTO products (name, description, image, tags, category_id) VALUES
('Camiseta Personalizada', 'Descrição do produto', '', ARRAY['tag1', 'tag2'], 'camisetas');
```

## 🛠️ Troubleshooting

### ❌ Erro "Failed to fetch"
- Verifique se as URLs estão corretas
- Confirme se o projeto Supabase está ativo
- Teste as credenciais no dashboard

### ❌ Erro de autenticação
- Verifique se as keys estão corretas
- Confirme se RLS permite as operações
- Teste com service_role key para admin

### ❌ Erro de CORS
- Supabase geralmente não tem problemas de CORS
- Se houver, configure os domínios permitidos no dashboard

## 📁 Estrutura de Arquivos

```
src/
├── lib/
│   ├── supabase.ts        # Cliente Supabase
│   └── database.ts        # Funções CRUD
├── components/admin/
│   ├── CategoryForm.tsx   # Formulário de categoria
│   └── ProductForm.tsx    # Formulário de produto
├── sql/
│   └── database_schema.sql # Schema do banco
└── app/admin/
    └── page.tsx           # Painel administrativo
```

## 🎯 Próximos Passos

1. **Autenticação**: Adicionar login para admin
2. **Upload de Imagens**: Usar Supabase Storage
3. **Cache**: Implementar cache para melhor performance
4. **Validação**: Adicionar validação de dados mais robusta
5. **Logs**: Sistema de auditoria para mudanças

---

**🎨 Strike Personalizados - Sistema de Gestão Completo!** 