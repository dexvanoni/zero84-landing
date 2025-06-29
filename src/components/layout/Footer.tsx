'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Facebook, Mail, Heart, Sparkles, Phone, ChevronUp } from 'lucide-react';
import { SocialLink } from '@/types';

const socialLinks: SocialLink[] = [
  {
    href: 'https://wa.me/5511999999999',
    icon: <MessageCircle size={24} />,
    label: 'WhatsApp'
  },
  {
            href: 'https://instagram.com/strikepersonalizados',
    icon: <Instagram size={24} />,
    label: 'Instagram'
  },
  {
            href: 'https://facebook.com/strikepersonalizados',
    icon: <Facebook size={24} />,
    label: 'Facebook'
  },
  {
            href: 'mailto:contato@strike.com',
    icon: <Mail size={24} />,
    label: 'Email'
  }
];

const categories = [
  { name: 'Camisetas Personalizadas', id: 'camisetas' },
  { name: 'Canecas e Copos', id: 'canecas' },
  { name: 'Acessórios e Chaveiros', id: 'acessorios' },
  { name: 'Decoração e Quadros', id: 'decoracao' },
  { name: 'Brindes Corporativos', id: 'brindes' },
  { name: 'Presentes Especiais', id: 'presentes' }
];

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 green-gradient-primary hover-green-glow rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl"
      title={label}
    >
      {icon}
    </motion.a>
  );
}

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Botão flutuante para topo */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 green-gradient-primary hover-green-glow rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 btn-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>

      <footer className="relative bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white py-20 overflow-hidden">
        {/* Efeito de ondas no topo */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-900/50" />
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo e descrição */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 green-gradient-primary hover-green-glow rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-glow-green">
                  Strike Personalizados
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-lg">
                Transformamos suas ideias em produtos únicos e especiais. 
                Cada peça é criada com qualidade, criatividade e muito amor, 
                porque acreditamos que personalização é dar vida às suas memórias.
              </p>
              <div className="flex items-center space-x-2 text-green-300">
                <Phone className="w-5 h-5" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-green-300">
                <Mail className="w-5 h-5" />
                <span>contato@strike.com</span>
              </div>
            </motion.div>
            
            {/* Links rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-300 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-green-glow"></span>
                Categorias
              </h4>
              <ul className="space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => scrollToSection(cat.id)}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm hover:translate-x-2 transform transition-transform"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Redes sociais e contato */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-green-300 flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
                Conecte-se
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Siga-nos nas redes sociais e fique por dentro das novidades!
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, idx) => (
                  <SocialButton key={idx} {...social} />
                ))}
              </div>
              
              {/* Newsletter */}
              <div className="mt-8">
                <h5 className="text-sm font-medium text-gray-300 mb-3">Receba nossas novidades</h5>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 green-gradient-primary hover-green-glow rounded-lg text-white text-sm font-medium transition-all duration-300 btn-glow"
                  >
                    OK
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Divisor */}
          <div className="border-t border-gray-700/50 mb-8"></div>
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center flex-wrap">
              <span>© 2024 Strike Personalizados. Todos os direitos reservados.</span>
              <span className="mx-2 hidden sm:inline">•</span>
              <span className="flex items-center">
                Feito com <Heart size={14} className="text-red-400 mx-1" /> para você
              </span>
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
} 