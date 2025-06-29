'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Upload, Plus } from 'lucide-react';
import { Product } from '@/types';

interface ProductFormProps {
  product?: Product;
  categoryId: string;
  onSave: (product: Omit<Product, 'id'> & { category_id: string }) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ product, categoryId, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    image: product?.image || '',
    tags: product?.tags || []
  });
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Nome e descrição são obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        name: formData.name,
        description: formData.description,
        image: formData.image,
        tags: formData.tags,
        category_id: categoryId
      });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, image: result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-green-300 mb-6">
          {product ? '✏️ Editar Produto' : '➕ Novo Produto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload de Imagem */}
          <div>
            <label className="block text-sm font-medium mb-3 text-green-300">
              📸 Imagem do Produto
            </label>
            <div
              className="relative h-64 green-gradient-primary rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden group"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.image ? (
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white">
                  <Upload size={48} className="mb-4" />
                  <div className="text-lg font-semibold">Clique para adicionar imagem</div>
                  <div className="text-sm opacity-70">PNG, JPG até 5MB</div>
                </div>
              )}
              
              {/* Overlay no hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <Upload size={32} className="mx-auto mb-2" />
                  <div className="text-sm">Alterar Imagem</div>
                </div>
              </div>
              
              {isUploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
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
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-green-600 rounded-full text-sm flex items-center gap-2 group btn-glow"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
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
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg btn-glow flex items-center gap-2"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 green-gradient-primary text-white font-semibold rounded-lg transition-all duration-300 btn-glow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save size={18} />
                  {product ? 'Salvar' : 'Criar'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <X size={18} />
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 