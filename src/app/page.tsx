'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProductSection from '@/components/sections/ProductSection';
import { getCategories, populateInitialData, debugDatabase } from '@/lib/database';
import { diagnoseSupabaseConfig } from '@/lib/supabase';
import { Category } from '@/types';
import { categories as staticCategories } from '@/data/products';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(false); // Prevenir múltiplas chamadas

  useEffect(() => {
    const loadCategories = async () => {
      // Prevenir múltiplas execuções simultâneas
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;

      try {
        // Diagnóstico inicial
        const config = diagnoseSupabaseConfig();
        
        // Aguardar um pouco para evitar sobrecarga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Se Supabase está configurado, fazer debug completo (apenas uma vez)
        if (config.isConfigured) {
          await debugDatabase();
        }
        
        let data = await getCategories();
        
        // Se não há dados no Supabase e ele está configurado, tenta popular
        if (data.length === 0 && config.isConfigured) {
          const populated = await populateInitialData();
          
          if (populated) {
            // Aguardar antes de recarregar
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getCategories();
            await debugDatabase();
          }
        }
        
        // Se há dados do Supabase, usa eles; senão usa dados estáticos
        if (data.length > 0) {
          setCategories(data);
          
          // Verificar se as categorias têm produtos
          const totalProducts = data.reduce((sum, cat) => sum + (cat.products?.length || 0), 0);
          
          if (totalProducts === 0) {
            console.warn('⚠️ CRÍTICO: Categorias carregadas mas SEM PRODUTOS!');
            console.warn('💡 Execute o SQL schema completo no Supabase Dashboard');
          }
        } else {
          console.warn('⚠️ Supabase indisponível - usando dados estáticos');
          setCategories(staticCategories);
        }
      } catch (error) {
        console.error('💥 ERRO CRÍTICO ao carregar categorias:', error);
        console.warn('🌐 Problema de rede detectado - usando fallback');
        setCategories(staticCategories);
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    };

    loadCategories();
  }, []); // Dependência vazia para executar apenas uma vez

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-xl">Carregando Strike Personalizados...</p>
          <p className="text-sm text-gray-400 mt-2">Buscando categorias e produtos do banco de dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Products Sections */}
        <div id="produtos" className="relative">
          {categories.map((category, index) => (
            <ProductSection 
              key={category.id} 
              id={category.id}
              title={category.title}
              description={category.description}
              categories={categories} // Passando todas as categorias como prop
              gradient={index % 2 === 0 
                ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20' 
                : 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20'
              }
            />
          ))}
        </div>
        
        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 relative overflow-hidden bg-pattern"
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 via-emerald-900/20 to-green-900/40" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow-green"
            >
              Pronto para Personalizar?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Entre em contato conosco e transforme suas ideias em produtos únicos. 
              Nossa equipe está pronta para criar algo especial para você!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:shadow-green-500/25 flex items-center space-x-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                </svg>
                <span>Chamar no WhatsApp</span>
              </motion.a>
              
              <motion.a
                href="mailto:contato@strike.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent green-border-glow green-text-glow hover:bg-green-500/10 hover:text-white font-semibold rounded-full transition-all duration-300 flex items-center space-x-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Enviar Email</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
