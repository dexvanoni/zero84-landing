'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Save, Edit3, Trash2, Eye, Image as ImageIcon, Plus, X } from 'lucide-react';
import { categories } from '@/data/products';
import { Category, Product } from '@/types';

export default function AdminPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    tags: [] as string[],
    image: ''
  });
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      tags: [...product.tags],
      image: product.image
    });
    setIsEditing(true);
    setIsAddingNew(false);
  };

  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setEditForm({
      name: '',
      description: '',
      tags: [],
      image: ''
    });
    setIsEditing(true);
    setIsAddingNew(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simular upload (aqui você integraria com seu backend)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditForm(prev => ({ ...prev, image: result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editForm.tags.includes(newTag.trim())) {
      setEditForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSaveProduct = () => {
    // Validações básicas
    if (!editForm.name.trim()) {
      alert('Nome do produto é obrigatório');
      return;
    }
    if (!editForm.description.trim()) {
      alert('Descrição do produto é obrigatória');
      return;
    }

    if (isAddingNew) {
      // Lógica para adicionar novo produto
      const newProduct: Product = {
        id: Date.now(), // ID temporário usando timestamp
        name: editForm.name,
        description: editForm.description,
        tags: editForm.tags,
        image: editForm.image || ''
      };
      
      console.log('Adicionando novo produto:', newProduct);
      alert('Produto adicionado com sucesso! (Esta é uma demo - em produção salvaria no backend)');
    } else {
      // Lógica para editar produto existente
      console.log('Editando produto:', selectedProduct?.id, editForm);
      alert('Produto editado com sucesso! (Esta é uma demo - em produção salvaria no backend)');
    }

    // Reset do formulário
    setIsEditing(false);
    setIsAddingNew(false);
    setSelectedProduct(null);
    setEditForm({
      name: '',
      description: '',
      tags: [],
      image: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white bg-pattern">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-glow-green">
            🎨 Admin - Zero84 Personalizados
          </h1>
          <p className="text-gray-300 mt-4">Gerencie produtos e categorias</p>
        </div>

        {/* Navegação das categorias */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-green-300">📁 Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'green-gradient-primary green-glow shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {category.products.length} produtos
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lista de produtos da categoria selecionada */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-300">
            {currentCategory?.icon} {currentCategory?.name} ({currentCategory?.products.length} produtos)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {currentCategory?.products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-48 green-gradient-primary flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-2">🎨</div>
                    <div className="text-sm font-medium">{product.name}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2 text-white">{product.name}</h4>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center btn-glow"
                  >
                    ✏️
                  </button>
                </div>
              </motion.div>
            ))}
            
            {/* Botão Adicionar Produto */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddNewProduct}
              className="h-full min-h-[300px] bg-gray-800 border-2 border-dashed border-green-500 rounded-xl flex flex-col items-center justify-center text-green-300 hover:bg-gray-700 hover:border-green-400 transition-all duration-300"
            >
              <div className="text-4xl mb-4">➕</div>
              <div className="text-lg font-semibold">Adicionar Produto</div>
              <div className="text-sm opacity-70">Clique para criar novo</div>
            </motion.button>
          </div>
        </div>

        {/* Modal de edição/criação */}
        <AnimatePresence>
          {editingProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setEditingProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-green-300">
                  {isAddingNew ? '➕ Adicionar Produto' : '✏️ Editar Produto'}
                </h2>
                
                <div className="space-y-6 mt-6">
                  {/* Upload de Imagem */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-green-300">
                      📸 Imagem do Produto
                    </label>
                    <div
                      className="relative h-64 green-gradient-primary rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden group"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      {editingProduct.image ? (
                        <img 
                          src={editingProduct.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-white">
                          <div className="text-4xl mb-4">📷</div>
                          <div className="text-lg font-semibold">Clique para adicionar imagem</div>
                          <div className="text-sm opacity-70">PNG, JPG até 5MB</div>
                        </div>
                      )}
                      
                      {/* Overlay no hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-2xl mb-2">📤</div>
                          <div className="text-sm">Alterar Imagem</div>
                        </div>
                      </div>
                    </div>
                    
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-green-300">
                      🏷️ Nome do Produto
                    </label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="Ex: Camiseta Personalizada"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-green-300">
                      📝 Descrição
                    </label>
                    <textarea
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors resize-none"
                      rows={3}
                      placeholder="Descreva o produto..."
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-green-300">
                      🏷️ Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editingProduct.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-green-600 rounded-full text-sm flex items-center gap-2 group btn-glow"
                        >
                          {tag}
                          <button
                            onClick={() => {
                              const newTags = editingProduct.tags.filter((_, i) => i !== index);
                              setEditingProduct({...editingProduct, tags: newTags});
                            }}
                            className="text-red-300 hover:text-red-200 transition-colors"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                        placeholder="Digite uma tag e pressione Enter"
                      />
                      <button
                        onClick={addTag}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg btn-glow"
                      >
                        ➕
                      </button>
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={saveProduct}
                      className="flex-1 px-6 py-3 green-gradient-primary text-white font-semibold rounded-lg transition-all duration-300 btn-glow"
                    >
                      {isAddingNew ? '➕ Criar Produto' : '💾 Salvar Alterações'}
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      ❌ Cancelar
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