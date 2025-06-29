'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Shield } from 'lucide-react';
import { NavigationItem } from '@/types';

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'camisetas', label: 'Camisetas', href: '#camisetas' },
  { id: 'canecas', label: 'Canecas', href: '#canecas' },
  { id: 'acessorios', label: 'Acessórios', href: '#acessorios' },
  { id: 'decoracao', label: 'Decoração', href: '#decoracao' },
  { id: 'brindes', label: 'Brindes', href: '#brindes' },
  { id: 'presentes', label: 'Presentes', href: '#presentes' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId === 'home' ? 'produtos' : sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 green-gradient-primary rounded-full flex items-center justify-center green-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-glow-green">
              Zero84
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 green-gradient-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Admin Link */}
            <motion.a
              href="/admin"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full transition-all duration-300 flex items-center gap-2 group"
              title="Área Administrativa"
            >
              <Shield size={16} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm">Admin</span>
            </motion.a>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 green-gradient-primary hover-green-glow text-white font-semibold rounded-full transition-all duration-300 btn-glow"
            >
              Orçamento
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* Mobile Admin Link */}
                <motion.a
                  href="/admin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigationItems.length * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 font-medium py-2 border-t border-white/10 pt-4 mt-4"
                >
                  🛡️ Área Admin
                </motion.a>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navigationItems.length + 1) * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 px-6 py-3 green-gradient-primary hover-green-glow text-white font-semibold rounded-full transition-all duration-300 btn-glow"
                >
                  Solicitar Orçamento
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
} 