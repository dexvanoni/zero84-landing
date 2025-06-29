'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import ProductCard from '@/components/ui/ProductCard';
import { Category } from '@/types';

// Importar estilos do Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



interface ProductSectionProps {
  category: Category;
  index: number;
}

export default function ProductSection({ category, index }: ProductSectionProps) {
  // Configurações dinâmicas baseadas no número de produtos
  const hasEnoughSlides = category.products.length >= 8;
  const enableLoop = hasEnoughSlides;
  const enableAutoplay = category.products.length > 1;

  return (
    <motion.section
      id={category.id}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background com blur e gradiente alternado */}
      <div 
        className={`absolute inset-0 ${
          index % 2 === 0 
            ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20' 
            : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
        } backdrop-blur-sm bg-pattern`} 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Título da categoria */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow-green"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {category.title}
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {category.description}
          </motion.p>
        </motion.div>
        
        {/* Carrossel de produtos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <Swiper
            modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={!enableLoop}
            loop={enableLoop}
            autoplay={enableAutoplay ? { 
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            } : false}
            effect="coverflow"
            coverflowEffect={{
              rotate: 45,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: `.swiper-button-next-${category.id}`,
              prevEl: `.swiper-button-prev-${category.id}`,
            }}
            pagination={{
              el: `.swiper-pagination-${category.id}`,
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: { 
                slidesPerView: 3,
                spaceBetween: 30
              },
              1024: { 
                slidesPerView: 4,
                spaceBetween: 40
              },
              1280: { 
                slidesPerView: 5,
                spaceBetween: 40
              },
            }}
            className="pb-16"
          >
            {category.products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Botões de navegação customizados */}
          <button 
            className={`swiper-button-prev-${category.id} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group`}
          >
            <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={`swiper-button-next-${category.id} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group`}
          >
            <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Paginação customizada */}
          <div className={`swiper-pagination-${category.id} !bottom-0`} />
        </motion.div>
      </div>
      
      {/* Elementos decorativos */}
      <div className={`absolute ${index % 2 === 0 ? 'top-20 right-20' : 'bottom-20 left-20'} w-64 h-64 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse-slow`} />
      <div className={`absolute ${index % 2 === 0 ? 'bottom-40 left-10' : 'top-40 right-10'} w-32 h-32 bg-teal-500/5 rounded-full blur-2xl animate-float`} />
    </motion.section>
  );
} 