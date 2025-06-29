-- Extensão para UUIDs (se não estiver habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  image TEXT,
  tags TEXT[] DEFAULT '{}',
  category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_categories_created_at ON categories(created_at);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security) - Opcional para segurança
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de categorias" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Permitir leitura pública de produtos" ON products
  FOR SELECT USING (true);

-- Política para permitir operações administrativas (você pode ajustar conforme sua autenticação)
CREATE POLICY "Permitir todas operações para admin" ON categories
  FOR ALL USING (true);

CREATE POLICY "Permitir todas operações para admin em produtos" ON products
  FOR ALL USING (true);

-- Inserir categorias iniciais (se não existirem)
INSERT INTO categories (id, title, description) VALUES
  ('camisetas', 'Camisetas Personalizadas', 'Designs únicos em tecidos de alta qualidade para toda a família'),
  ('canecas', 'Canecas e Copos', 'Canecas personalizadas para momentos especiais e uso diário'),
  ('acessorios', 'Acessórios e Chaveiros', 'Pequenos detalhes que fazem toda a diferença no seu dia a dia'),
  ('decoracao', 'Decoração e Quadros', 'Transforme seus ambientes com arte personalizada'),
  ('brindes', 'Brindes Corporativos', 'Produtos personalizados para fortalecer sua marca'),
  ('presentes', 'Presentes Especiais', 'Presentes únicos para ocasiões inesquecíveis')
ON CONFLICT (id) DO NOTHING; 