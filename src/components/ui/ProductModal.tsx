'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '@/types';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Botão de fechar - APENAS este elemento visível */}
        <motion.button
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="fixed top-8 right-8 w-16 h-16 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 group shadow-2xl border-2 border-white/20 hover:border-white/40 z-[100000]"
        >
          <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>

        {/* Conteúdo do modal - A imagem em fullscreen */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotateY: -45 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.7, opacity: 0, rotateY: 45 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full relative fluid-green overflow-hidden"
        >
          {/* Efeito de partículas flutuantes */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Conteúdo centralizado */}
          <div className="w-full h-full flex items-center justify-center text-white relative z-10">
            <motion.div
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Ícone principal gigante */}
              <motion.div
                className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="text-8xl md:text-9xl">🎨</span>
              </motion.div>

              {/* Nome do produto */}
              <motion.h1
                className="font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-8 text-shadow-lg leading-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {product.name}
              </motion.h1>

              {/* Descrição */}
              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl opacity-90 max-w-6xl mx-auto mb-12 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {product.description}
              </motion.p>

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center mb-16"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {product.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full text-xl md:text-2xl font-medium border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.1 + index * 0.1,
                      type: "spring",
                      bounce: 0.4 
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.button
                className="px-16 py-6 bg-white/25 backdrop-blur-md hover:bg-white/35 border-2 border-white/40 hover:border-white/60 rounded-full font-bold text-2xl md:text-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                initial={{ scale: 0, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.3,
                  type: "spring",
                  bounce: 0.4 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Solicitar Orçamento
              </motion.button>
            </motion.div>
          </div>

          {/* Efeito de brilho animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 3, 
              delay: 1.5, 
              repeat: Infinity, 
              repeatDelay: 4,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
} 