'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { Category } from '@/types';

interface CategoryFormProps {
  category?: Category;
  onSave: (category: Omit<Category, 'products'>) => Promise<void>;
  onCancel: () => void;
}

export default function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    id: category?.id || '',
    title: category?.title || '',
    description: category?.description || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id.trim() || !formData.title.trim()) {
      alert('ID e título são obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        id: formData.id.toLowerCase().replace(/\s+/g, '-'),
        title: formData.title,
        description: formData.description
      });
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria');
    } finally {
      setIsLoading(false);
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
        className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-green-300 mb-6">
          {category ? '✏️ Editar Categoria' : '➕ Nova Categoria'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-green-300">
              🏷️ ID da Categoria
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
              placeholder="Ex: camisetas"
              disabled={!!category} // Não permitir editar ID de categoria existente
            />
            {!category && (
              <p className="text-xs text-gray-400 mt-1">
                O ID será usado na URL e não pode ser alterado depois
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-green-300">
              📝 Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
              placeholder="Ex: Camisetas Personalizadas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-green-300">
              📄 Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors resize-none"
              rows={3}
              placeholder="Descrição da categoria..."
            />
          </div>

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
                  {category ? 'Salvar' : 'Criar'}
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