import { supabase, isSupabaseConfigured } from './supabase';
import { Category, Product } from '@/types';
import { categories as staticCategories } from '@/data/products';

// ============= FUNÇÃO DE DEBUG =============

export async function debugDatabase(): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('🔧 Supabase não configurado - não é possível debugar');
    return;
  }

  try {
    // Verificar se as tabelas existem
    const { error: catTableError } = await supabase
      .from('categories')
      .select('count')
      .limit(0);

    if (catTableError) {
      console.error('❌ CRÍTICO: Tabela categories não existe:', catTableError);
    }

    const { error: prodTableError } = await supabase
      .from('products')
      .select('count')
      .limit(0);

    if (prodTableError) {
      console.error('❌ CRÍTICO: Tabela products não existe:', prodTableError);
    }

    // Testar relacionamento
    const { data: categoriesWithProducts, error: relError } = await supabase
      .from('categories')
      .select(`
        id,
        title,
        products (
          id,
          name,
          category_id
        )
      `)
      .limit(3);

    if (relError) {
      console.error('❌ CRÍTICO: Erro no relacionamento:', relError);
    } else if (categoriesWithProducts) {
      const totalProducts = categoriesWithProducts.reduce((sum, cat) => sum + (cat.products?.length || 0), 0);
      if (totalProducts === 0) {
        console.warn('⚠️ CRÍTICO: Nenhum produto encontrado no relacionamento');
      }
    }

  } catch (error) {
    console.error('💥 CRÍTICO: Erro durante debug:', error);
  }
}

// ============= CATEGORIAS =============

export async function getCategories(): Promise<Category[]> {
  try {
    // Verificação detalhada de configuração
    if (!isSupabaseConfigured) {
      console.warn('🔧 Supabase não configurado - usando dados estáticos');
      return [];
    }

    if (!supabase) {
      console.warn('⚠️ Cliente Supabase não inicializado');
      return [];
    }

    const { data: categories, error } = await supabase
      .from('categories')
      .select(`
        id,
        title,
        description,
        created_at,
        updated_at,
        products (
          id,
          name,
          description,
          image,
          tags,
          category_id,
          created_at,
          updated_at
        )
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ Erro específico do Supabase:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    if (!categories) {
      console.warn('⚠️ Nenhuma categoria retornada do Supabase');
      return [];
    }

    return categories || [];
  } catch (error) {
    console.error('💥 Erro geral ao buscar categorias:', {
      error: error,
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      supabaseConfigured: isSupabaseConfigured,
      hasSupabaseClient: !!supabase
    });
    return [];
  }
}

// Função para popular o banco com dados iniciais
export async function populateInitialData(): Promise<boolean> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado para popular dados');
      return false;
    }

    // Verificar se já há dados
    const { data: existingCategories, error: checkError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('❌ CRÍTICO: Erro ao verificar dados existentes:', checkError);
      return false;
    }

    if (existingCategories && existingCategories.length > 0) {
      // Verificar se há produtos
      const { data: existingProducts, error: prodError } = await supabase
        .from('products')
        .select('id')
        .limit(1);

      if (prodError) {
        console.error('❌ CRÍTICO: Erro ao verificar produtos:', prodError);
        return false;
      }

      if (existingProducts && existingProducts.length > 0) {
        return true;
      }
    }

    // Inserir categorias (se não existirem)
    for (const category of staticCategories) {
      // Verificar se categoria já existe
      const { data: existingCat } = await supabase
        .from('categories')
        .select('id')
        .eq('id', category.id)
        .single();

      if (!existingCat) {
        const { error: categoryError } = await supabase
          .from('categories')
          .insert([{
            id: category.id,
            title: category.title,
            description: category.description
          }])
          .select()
          .single();

        if (categoryError) {
          console.error(`❌ CRÍTICO: Erro ao inserir categoria ${category.title}:`, categoryError);
          continue;
        }
      }

      // Inserir produtos da categoria
      if (category.products && category.products.length > 0) {
        const productsToInsert = category.products.map(product => ({
          name: product.name,
          description: product.description,
          image: product.image,
          tags: product.tags,
          category_id: category.id
        }));

        const { error: productsError } = await supabase
          .from('products')
          .insert(productsToInsert)
          .select();

        if (productsError) {
          console.error(`❌ CRÍTICO: Erro ao inserir produtos para ${category.title}:`, productsError);
        }
      }
    }

    return true;
  } catch (error) {
    console.error('💥 Erro ao popular dados iniciais:', {
      error: error,
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
    return false;
  }
}

// ============= RESTO DAS FUNÇÕES EXISTENTES =============

export async function createCategory(category: Omit<Category, 'products'>): Promise<Category | null> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return null;
    }

    const { data, error } = await supabase
      .from('categories')
      .insert([{
        id: category.id,
        title: category.title,
        description: category.description
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar categoria:', error);
      throw error;
    }
    return { ...data, products: [] };
  } catch (error) {
    console.error('💥 Erro geral ao criar categoria:', error);
    return null;
  }
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return null;
    }

    const { data, error } = await supabase
      .from('categories')
      .update({
        title: category.title,
        description: category.description
      })
      .eq('id', id)
      .select(`
        *,
        products (*)
      `)
      .single();

    if (error) {
      console.error('❌ Erro ao atualizar categoria:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('💥 Erro geral ao atualizar categoria:', error);
    return null;
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return false;
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Erro ao deletar categoria:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('💥 Erro geral ao deletar categoria:', error);
    return false;
  }
}

// ============= PRODUTOS =============

export async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return [];
    }

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Erro ao buscar produtos:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('💥 Erro geral ao buscar produtos:', error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, 'id'> & { category_id: string }): Promise<Product | null> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return null;
    }

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        image: product.image,
        tags: product.tags,
        category_id: product.category_id
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar produto:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('💥 Erro geral ao criar produto:', error);
    return null;
  }
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return null;
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        image: product.image,
        tags: product.tags
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('💥 Erro geral ao atualizar produto:', error);
    return null;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('🔧 Supabase não configurado');
      return false;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Erro ao deletar produto:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('💥 Erro geral ao deletar produto:', error);
    return false;
  }
} 