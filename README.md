# 🎨 Zero84 Personalizados - Landing Page

Uma landing page moderna e altamente animada para Zero84 Personalizados, focada na apresentação visual do portfólio através de seções categorizadas com carrosséis de imagens interativos.

## ✨ Destaques do Projeto

- 🎨 **Design Inovador**: Inspirado no AIMug com efeitos glassmorphism, gradientes animados e micro-interações
- 🖼️ **Foco nas Imagens**: Carrosséis 3D com efeito coverflow, zoom modal e transições suaves
- 📱 **Mobile-First**: Totalmente responsivo com animações otimizadas
- ⚡ **Performance**: Next.js 14, otimização de imagens, lazy loading
- 🎭 **Animações Avançadas**: Framer Motion para transições cinematográficas

## 🚀 Stack Tecnológico

- **React 18** + TypeScript
- **Next.js 14** (App Router)
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **Swiper.js** para carrosséis
- **Lucide React** para ícones
- **Sharp** para otimização de imagens

## 📋 Seções Principais

### 🏠 Hero Section
- Partículas flutuantes animadas
- Efeito typewriter com textos rotativos
- CTAs com animações 3D
- Gradientes animados

### 🛍️ Categorias de Produtos (6 seções)
1. **Camisetas Personalizadas**
2. **Canecas e Copos**
3. **Acessórios e Chaveiros**
4. **Decoração e Quadros**
5. **Brindes Corporativos**
6. **Presentes Especiais**

### 🎯 Funcionalidades
- Cards com hover 3D e informações sobrepostas
- Modal de zoom para produtos
- Carrosséis com efeito coverflow
- Navegação suave entre seções
- Header com efeito glassmorphism
- Footer elegante com redes sociais

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd zero84-landing
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🏗️ Estrutura do Projeto

```
zero84-landing/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   ├── layout/           # Header e Footer
│   │   ├── sections/         # Seções da página
│   │   └── ui/               # Componentes UI
│   ├── data/                 # Dados mockados
│   └── types/                # Definições TypeScript
├── public/                   # Arquivos estáticos
└── config files             # Configurações
```

## 🎨 Componentes Principais

### `HeroSection`
- Background com partículas canvas
- Efeito typewriter animado
- Botões com animações hover
- Scroll indicator

### `ProductSection`
- Carrossel Swiper com efeito coverflow
- Navegação customizada
- Backgrounds alternados
- Elementos decorativos

### `ProductCard`
- Animações 3D no hover
- Modal de zoom com Framer Motion
- Efeitos de brilho
- Tags interativas

### `Header`
- Navegação glassmorphism
- Menu hamburger animado
- Scroll detection
- Logo animado

### `Footer`
- Layout em grid responsivo
- Botões de redes sociais
- Newsletter signup
- Links de navegação

## 🎯 Otimizações Implementadas

### Performance
- ✅ Lazy loading de componentes
- ✅ Otimização de imagens com Next.js
- ✅ Code splitting automático
- ✅ Minificação de CSS/JS

### SEO
- ✅ Meta tags otimizadas
- ✅ Open Graph completo
- ✅ Schema markup
- ✅ Sitemap automático

### Acessibilidade
- ✅ ARIA labels
- ✅ Navegação por teclado
- ✅ Contraste adequado
- ✅ Focus indicators

### PWA
- ✅ Service worker
- ✅ Manifest.json
- ✅ Cache offline
- ✅ Ícones otimizados

## 📱 Responsividade

O projeto foi desenvolvido com abordagem **Mobile-First**:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

Todas as animações são otimizadas para dispositivos móveis com `prefers-reduced-motion`.

## 🎨 Sistema de Cores

```css
/* Cores principais */
Primary Purple: #8b5cf6
Primary Pink: #ec4899
Secondary Blue: #3b82f6

/* Backgrounds */
Dark Gray: #111827
Medium Gray: #374151
Light Gray: #6b7280

/* Gradientes */
Purple to Pink: linear-gradient(45deg, #8b5cf6, #ec4899)
Dark to Purple: linear-gradient(135deg, #111827, #7c3aed)
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npx vercel --prod
```

### Netlify
```bash
npm run build
# Deploy da pasta .next
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Core Web Vitals

O projeto foi otimizado para atender aos Core Web Vitals:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

## 🔄 Próximos Passos

- [ ] Integração com CMS (Strapi/Sanity)
- [ ] Sistema de carrinho
- [ ] Integração com WhatsApp Business API
- [ ] Analytics avançado (GA4)
- [ ] Testes automatizados (Jest/Cypress)
- [ ] Performance monitoring (Sentry)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**Zero84 Personalizados**
- Website: [zero84.com](https://zero84.com)
- WhatsApp: [(11) 99999-9999](https://wa.me/5511999999999)
- Email: contato@zero84.com
- Instagram: [@zero84personalizados](https://instagram.com/zero84personalizados)

---

**Desenvolvido com ❤️ para Zero84 Personalizados**
