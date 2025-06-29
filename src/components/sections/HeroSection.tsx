'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { useEffect, useState } from 'react';

const typewriterTexts = [
  'Transformamos Suas Ideias em Arte Personalizada',
  'Criamos Presentes Únicos e Especiais',
  'Personalizamos com Qualidade e Amor',
  'Cada Peça Conta Sua História'
];

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = typewriterTexts[currentTextIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
          setIsTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentTextIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 bg-pattern">
      {/* Background com partículas */}
      <ParticleBackground />
      
      {/* Overlay com gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-teal-900/30 animate-pulse-slow" />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            className="inline-flex items-center justify-center w-20 h-20 green-gradient-primary rounded-full mb-8 animate-green-glow"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow-green">
                              Strike Personalizados
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white min-h-[80px] flex items-center justify-center">
            {displayText}
            <span className="ml-1 animate-pulse text-glow-green">|</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Especializados em criar produtos únicos que contam sua história. 
          Camisetas, canecas, acessórios e muito mais com a personalização que você merece.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('produtos')}
            className="px-8 py-4 green-gradient-primary text-white font-semibold rounded-full shadow-2xl transition-all duration-300 btn-glow green-glow-strong"
          >
            Ver Nossos Produtos
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent green-border-glow green-text-glow hover:bg-green-500/10 hover:text-white font-semibold rounded-full transition-all duration-300"
          >
            Solicitar Orçamento
          </motion.button>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection('produtos')}
        >
          <p className="text-gray-400 mb-2 text-sm">Explore nossos produtos</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-6 h-6 text-glow-green" />
          </motion.div>
        </motion.div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-teal-500/10 rounded-full blur-lg animate-green-glow" />
    </section>
  );
} 