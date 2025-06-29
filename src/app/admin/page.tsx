'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, AlertTriangle } from 'lucide-react';
import { Category, Product } from '@/types';
import CategoryForm from '@/components/admin/CategoryForm';
import ProductForm from '@/components/admin/ProductForm';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/lib/database';

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados dos modais
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'category' | 'product';
    id: string | number;
    name: string;
  } | null>(null);

  // Função para obter o ícone baseado no ID da categoria
  const getCategoryIcon = (categoryId: string) => {
    const icons: { [key: string]: string } = {
      'camisetas': '👕',
      'canecas': '☕',
      'acessorios': '🎀',
      'decoracao': '🖼️',
      'brindes': '🎁',
      'presentes': '💝'
    };
    return icons[categoryId] || '📦';
  };

  // Carregar categorias
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
      
      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0].id);
      }
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setError('Erro ao carregar dados. Verifique as configurações do banco.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ========== FUNÇÕES DE CATEGORIA ==========
  
  const handleCreateCategory = async (categoryData: Omit<Category, 'products'>) => {
    const result = await createCategory(categoryData);
    if (result) {
      await loadCategories();
      setShowCategoryForm(false);
      setSelectedCategory(result.id);
    }
  };

  const handleUpdateCategory = async (categoryData: Omit<Category, 'products'>) => {
    if (!editingCategory) return;
    
    const result = await updateCategory(editingCategory.id, categoryData);
    if (result) {
      await loadCategories();
      setEditingCategory(null);
      setShowCategoryForm(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const success = await deleteCategory(categoryId);
    if (success) {
      await loadCategories();
      setDeleteConfirm(null);
      
      // Se a categoria deletada era a selecionada, selecionar outra
      if (selectedCategory === categoryId && categories.length > 1) {
        const remainingCategories = categories.filter(cat => cat.id !== categoryId);
        if (remainingCategories.length > 0) {
          setSelectedCategory(remainingCategories[0].id);
        }
      }
    }
  };

  // ========== FUNÇÕES DE PRODUTO ==========
  
  const handleCreateProduct = async (productData: Omit<Product, 'id'> & { category_id: string }) => {
    const result = await createProduct(productData);
    if (result) {
      await loadCategories();
      setShowProductForm(false);
    }
  };

  const handleUpdateProduct = async (productData: Omit<Product, 'id'> & { category_id: string }) => {
    if (!editingProduct) return;
    
    const result = await updateProduct(editingProduct.id, productData);
    if (result) {
      await loadCategories();
      setEditingProduct(null);
      setShowProductForm(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const success = await deleteProduct(productId);
    if (success) {
      await loadCategories();
      setDeleteConfirm(null);
    }
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white bg-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-xl">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white bg-pattern flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Erro de Conexão</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="bg-gray-800 p-4 rounded-lg text-left text-sm">
            <p className="font-semibold mb-2">Para configurar o Supabase:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-400">
              <li>Configure as variáveis no arquivo <code>.env.local</code></li>
              <li>Execute o SQL do arquivo <code>src/sql/database_schema.sql</code></li>
              <li>Verifique as credenciais do banco</li>
            </ol>
          </div>
          <button
            onClick={loadCategories}
            className="mt-6 px-6 py-3 green-gradient-primary rounded-lg btn-glow"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white bg-pattern">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-glow-green">
            🎨 Admin - Strike Personalizados
          </h1>
          <p className="text-gray-300 mt-4">Gerencie produtos e categorias</p>
        </div>

        {/* Seção de Categorias */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-300">📁 Categorias</h2>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="px-4 py-2 green-gradient-primary rounded-lg btn-glow flex items-center gap-2"
            >
              <Plus size={18} />
              Nova Categoria
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl transition-all duration-300 cursor-pointer relative group ${
                  selectedCategory === category.id
                    ? 'green-gradient-primary green-glow shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-2xl mb-2">{getCategoryIcon(category.id)}</div>
                <div className="text-sm font-medium">{category.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {category.products.length} produtos
                </div>
                
                {/* Botões de ação */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCategory(category);
                      setShowCategoryForm(true);
                    }}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mr-1"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm({
                        type: 'category',
                        id: category.id,
                        name: category.title
                      });
                    }}
                    className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Seção de Produtos */}
        {currentCategory && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-300">
                {getCategoryIcon(currentCategory.id)} {currentCategory.title} ({currentCategory.products.length} produtos)
              </h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="px-4 py-2 green-gradient-primary rounded-lg btn-glow flex items-center gap-2"
              >
                <Plus size={18} />
                Novo Produto
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCategory.products.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-48 green-gradient-primary flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <div className="text-3xl mb-2">🎨</div>
                        <div className="text-sm font-medium">{product.name}</div>
                      </div>
                    )}
                    
                    {/* Botões de ação do produto */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowProductForm(true);
                        }}
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteConfirm({
                            type: 'product',
                            id: product.id,
                            name: product.name
                          });
                        }}
                        className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2 text-white">{product.name}</h4>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Modais */}
        <AnimatePresence>
          {showCategoryForm && (
            <CategoryForm
              category={editingCategory || undefined}
              onSave={editingCategory ? handleUpdateCategory : handleCreateCategory}
              onCancel={() => {
                setShowCategoryForm(false);
                setEditingCategory(null);
              }}
            />
          )}
          
          {showProductForm && currentCategory && (
            <ProductForm
              product={editingProduct || undefined}
              categoryId={currentCategory.id}
              onSave={editingProduct ? handleUpdateProduct : handleCreateProduct}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            />
          )}
          
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">
                    Confirmar Exclusão
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Tem certeza que deseja excluir {deleteConfirm.type === 'category' ? 'a categoria' : 'o produto'}{' '}
                    <strong>"{deleteConfirm.name}"</strong>?
                    {deleteConfirm.type === 'category' && (
                      <span className="block text-red-400 text-sm mt-2">
                        Todos os produtos desta categoria também serão excluídos!
                      </span>
                    )}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        if (deleteConfirm.type === 'category') {
                          handleDeleteCategory(deleteConfirm.id as string);
                        } else {
                          handleDeleteProduct(deleteConfirm.id as number);
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      Sim, Excluir
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 