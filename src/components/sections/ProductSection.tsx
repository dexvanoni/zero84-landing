'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ZoomIn } from 'lucide-react';
import { Category } from '@/types';
import ProductModal from '@/components/ui/ProductModal';

// Import dos estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductSectionProps {
  id: string;
  title: string;
  description: string;
  gradient: string;
  categories: Category[]; // Receber categorias como prop
}

export default function ProductSection({ id, title, description, gradient, categories }: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Encontrar a categoria correspondente ao ID da seção
  const currentCategory = categories.find(cat => cat.id === id);
  const products = currentCategory?.products || [];

  return (
    <>
      <section
        id={id}
        className="min-h-screen py-20 relative overflow-hidden"
      >
        <div className={`absolute inset-0 ${gradient} backdrop-blur-sm bg-pattern`}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow-green">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          <div className="relative">
            {products.length > 0 ? (
              <div className="swiper pb-16">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={{
                    nextEl: `.swiper-button-next-${id}`,
                    prevEl: `.swiper-button-prev-${id}`
                  }}
                  pagination={{
                    el: `.swiper-pagination-${id}`,
                    clickable: true
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                  }}
                  className="w-full"
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <motion.div
                        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900"
                        style={{ transformStyle: 'preserve-3d' }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedProduct(product)}
                      >
                        {/* Overlay de hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        
                        {/* Imagem do produto */}
                        <div className="relative w-full h-80 green-gradient-primary flex items-center justify-center">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-white text-center p-6">
                              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🎨</span>
                              </div>
                              <h4 className="font-bold text-lg">{product.name}</h4>
                            </div>
                          )}
                          
                          {/* Efeito de brilho */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </div>

                        {/* Informações do produto */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-sm opacity-90 mb-3">{product.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag: string, index: number) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Botão de zoom */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Botões de navegação */}
                <button className={`swiper-button-prev-${id} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group`}>
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                
                <button className={`swiper-button-next-${id} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group`}>
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>

                {/* Paginação */}
                <div className={`swiper-pagination-${id} !bottom-0`}></div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-white mb-4">Nenhum produto encontrado</h3>
                <p className="text-gray-300 mb-6">
                  {currentCategory ? 
                    'Esta categoria ainda não possui produtos cadastrados.' : 
                    'Categoria não encontrada.'
                  }
                </p>
                <div className="bg-gray-800 p-4 rounded-lg text-left text-sm max-w-md mx-auto">
                  <p className="font-semibold mb-2">Debug:</p>
                  <ul className="text-gray-400 space-y-1">
                    <li>ID da seção: <code>{id}</code></li>
                    <li>Categoria encontrada: {currentCategory ? '✅' : '❌'}</li>
                    <li>Total de categorias: {categories.length}</li>
                    <li>Produtos na categoria: {products.length}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Elementos decorativos */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-10 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl animate-float"></div>
        </div>
      </section>

      {/* Modal do produto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
} 