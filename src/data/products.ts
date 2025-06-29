import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'camisetas',
    title: 'Camisetas Personalizadas',
    description: 'Designs únicos em tecidos de alta qualidade para toda a família',
    products: [
      {
        id: 1,
        name: 'Camiseta Família Personalizada',
        description: 'Designs exclusivos para toda a família com estampas durabilíssimas',
        image: 'https://picsum.photos/800/600?random=1',
        tags: ['família', 'presente', 'personalizado']
      },
      {
        id: 2,
        name: 'Camiseta Casal Romântica',
        description: 'Estampas especiais para casais apaixonados',
        image: 'https://picsum.photos/800/600?random=2',
        tags: ['casal', 'romance', 'presente']
      },
      {
        id: 3,
        name: 'Camiseta Infantil Divertida',
        description: 'Designs coloridos e divertidos para os pequenos',
        image: 'https://picsum.photos/800/600?random=3',
        tags: ['infantil', 'colorido', 'divertido']
      },
      {
        id: 4,
        name: 'Camiseta Corporativa',
        description: 'Uniformes personalizados para sua empresa',
        image: '/images/camiseta-corporativa.jpg',
        tags: ['corporativo', 'uniforme', 'empresa']
      },
      {
        id: 5,
        name: 'Camiseta Esportiva Premium',
        description: 'Camisetas técnicas para atletas e esportistas',
        image: '/images/camiseta-esportiva.jpg',
        tags: ['esporte', 'premium', 'técnica']
      },
      {
        id: 6,
        name: 'Camiseta Vintage Retrô',
        description: 'Estilo vintage com toque moderno e exclusivo',
        image: '/images/camiseta-vintage.jpg',
        tags: ['vintage', 'retrô', 'exclusivo']
      },
      {
        id: 7,
        name: 'Camiseta Aniversário Especial',
        description: 'Designs únicos para celebrar datas especiais',
        image: '/images/camiseta-aniversario.jpg',
        tags: ['aniversário', 'celebração', 'especial']
      },
      {
        id: 8,
        name: 'Camiseta Arte Personalizada',
        description: 'Transforme sua arte em uma camiseta exclusiva',
        image: '/images/camiseta-arte.jpg',
        tags: ['arte', 'criativo', 'único']
      }
    ]
  },
  {
    id: 'canecas',
    title: 'Canecas e Copos',
    description: 'Canecas personalizadas para momentos especiais e uso diário',
    products: [
      {
        id: 9,
        name: 'Caneca Mágica Personalizada',
        description: 'Caneca que muda de cor com líquidos quentes',
        image: 'https://picsum.photos/800/600?random=9',
        tags: ['mágica', 'presente', 'inovador']
      },
      {
        id: 10,
        name: 'Caneca de Porcelana Premium',
        description: 'Canecas de porcelana com acabamento premium',
        image: '/images/caneca-porcelana.jpg',
        tags: ['porcelana', 'premium', 'elegante']
      },
      {
        id: 11,
        name: 'Copo Térmico Personalizado',
        description: 'Copos térmicos para manter sua bebida na temperatura ideal',
        image: '/images/copo-termico.jpg',
        tags: ['térmico', 'prático', 'durável']
      },
      {
        id: 12,
        name: 'Caneca Dia dos Namorados',
        description: 'Designs românticos para presentear quem você ama',
        image: '/images/caneca-namorados.jpg',
        tags: ['romance', 'namorados', 'presente']
      },
      {
        id: 13,
        name: 'Caneca Profissão Personalizada',
        description: 'Homenageie sua profissão com designs únicos',
        image: '/images/caneca-profissao.jpg',
        tags: ['profissão', 'carreira', 'personalizado']
      },
      {
        id: 14,
        name: 'Caneca Foto Família',
        description: 'Suas memórias favoritas impressas com qualidade',
        image: '/images/caneca-foto-familia.jpg',
        tags: ['foto', 'família', 'memórias']
      },
      {
        id: 15,
        name: 'Caneca Gamer Personalizada',
        description: 'Designs especiais para gamers e entusiastas',
        image: '/images/caneca-gamer.jpg',
        tags: ['gamer', 'jogos', 'geek']
      },
      {
        id: 16,
        name: 'Caneca Motivacional',
        description: 'Frases inspiradoras para começar bem o dia',
        image: '/images/caneca-motivacional.jpg',
        tags: ['motivacional', 'inspiração', 'energia']
      }
    ]
  },
  {
    id: 'acessorios',
    title: 'Acessórios e Chaveiros',
    description: 'Pequenos detalhes que fazem toda a diferença no seu dia a dia',
    products: [
      {
        id: 17,
        name: 'Chaveiro Foto Personalizado',
        description: 'Chaveiros com suas fotos favoritas em acrílico resistente',
        image: 'https://picsum.photos/800/600?random=17',
        tags: ['foto', 'acrílico', 'resistente']
      },
      {
        id: 18,
        name: 'Chaveiro LED Personalizado',
        description: 'Chaveiros com LED e gravação personalizada',
        image: '/images/chaveiro-led.jpg',
        tags: ['LED', 'útil', 'inovador']
      },
      {
        id: 19,
        name: 'Pulseira Personalizada',
        description: 'Pulseiras com nomes e designs exclusivos',
        image: '/images/pulseira.jpg',
        tags: ['pulseira', 'acessório', 'estilo']
      },
      {
        id: 20,
        name: 'Colar Personalizado',
        description: 'Colares únicos com gravações especiais',
        image: '/images/colar.jpg',
        tags: ['colar', 'joia', 'presente']
      },
      {
        id: 21,
        name: 'Ímã de Geladeira Personalizado',
        description: 'Ímãs únicos para decorar sua geladeira',
        image: '/images/ima-geladeira.jpg',
        tags: ['ímã', 'decoração', 'útil']
      },
      {
        id: 22,
        name: 'Porta-chaves Casal',
        description: 'Chaveiros combinando para casais apaixonados',
        image: '/images/porta-chaves-casal.jpg',
        tags: ['casal', 'romance', 'combinando']
      },
      {
        id: 23,
        name: 'Pin Personalizado',
        description: 'Pins exclusivos para jaquetas e mochilas',
        image: '/images/pin-personalizado.jpg',
        tags: ['pin', 'acessório', 'jovem']
      },
      {
        id: 24,
        name: 'Marcador de Página',
        description: 'Marcadores únicos para amantes da leitura',
        image: '/images/marcador-pagina.jpg',
        tags: ['leitura', 'livro', 'estudante']
      }
    ]
  },
  {
    id: 'decoracao',
    title: 'Decoração e Quadros',
    description: 'Transforme seus ambientes com arte personalizada',
    products: [
      {
        id: 25,
        name: 'Quadro Família Personalizado',
        description: 'Quadros com fotos da família em alta resolução',
        image: 'https://picsum.photos/800/600?random=25',
        tags: ['quadro', 'família', 'decoração']
      },
      {
        id: 26,
        name: 'Quadro Motivacional',
        description: 'Frases inspiradoras em designs modernos',
        image: '/images/quadro-motivacional.jpg',
        tags: ['motivacional', 'inspirador', 'moderno']
      },
      {
        id: 27,
        name: 'Luminária Personalizada',
        description: 'Luminárias com gravações únicas em LED',
        image: '/images/luminaria.jpg',
        tags: ['luminária', 'LED', 'ambiente']
      },
      {
        id: 28,
        name: 'Placa Decorativa',
        description: 'Placas personalizadas para decorar qualquer ambiente',
        image: '/images/placa-decorativa.jpg',
        tags: ['placa', 'decoração', 'personalizada']
      },
      {
        id: 29,
        name: 'Puzzle Personalizado',
        description: 'Quebra-cabeças com suas fotos favoritas',
        image: '/images/puzzle-personalizado.jpg',
        tags: ['puzzle', 'diversão', 'família']
      },
      {
        id: 30,
        name: 'Almofada Foto Personalizada',
        description: 'Almofadas macias com estampas especiais',
        image: '/images/almofada-foto.jpg',
        tags: ['almofada', 'conforto', 'casa']
      },
      {
        id: 31,
        name: 'Calendário Personalizado',
        description: 'Calendários únicos com suas datas especiais',
        image: '/images/calendario-personalizado.jpg',
        tags: ['calendário', 'organizacao', 'datas']
      },
      {
        id: 32,
        name: 'Vaso Decorativo Personalizado',
        description: 'Vasos únicos para plantas e decoração',
        image: '/images/vaso-decorativo.jpg',
        tags: ['vaso', 'plantas', 'decoração']
      }
    ]
  },
  {
    id: 'brindes',
    title: 'Brindes Corporativos',
    description: 'Produtos personalizados para fortalecer sua marca',
    products: [
      {
        id: 33,
        name: 'Kit Escritório Personalizado',
        description: 'Conjuntos completos para escritório com sua marca',
        image: 'https://picsum.photos/800/600?random=33',
        tags: ['escritório', 'corporativo', 'kit']
      },
      {
        id: 34,
        name: 'Caneta Personalizada Premium',
        description: 'Canetas elegantes com gravação da sua empresa',
        image: '/images/caneta-premium.jpg',
        tags: ['caneta', 'premium', 'elegante']
      },
      {
        id: 35,
        name: 'Agenda Corporativa',
        description: 'Agendas personalizadas para seus colaboradores',
        image: '/images/agenda-corporativa.jpg',
        tags: ['agenda', 'corporativo', 'útil']
      },
      {
        id: 36,
        name: 'Squeeze Personalizado',
        description: 'Garrafas esportivas com a identidade da sua marca',
        image: '/images/squeeze.jpg',
        tags: ['squeeze', 'esportivo', 'sustentável']
      },
      {
        id: 37,
        name: 'Mousepad Corporativo',
        description: 'Mousepads personalizados para escritório',
        image: '/images/mousepad-corporativo.jpg',
        tags: ['mousepad', 'escritório', 'marca']
      },
      {
        id: 38,
        name: 'Crachá Personalizado',
        description: 'Crachás elegantes para identificação corporativa',
        image: '/images/cracha-personalizado.jpg',
        tags: ['crachá', 'identificação', 'profissional']
      },
      {
        id: 39,
        name: 'Porta Cartão Executivo',
        description: 'Porta cartões elegantes para networking',
        image: '/images/porta-cartao.jpg',
        tags: ['cartão', 'networking', 'executivo']
      },
      {
        id: 40,
        name: 'Chaveiro Corporativo',
        description: 'Chaveiros metálicos com logo da empresa',
        image: '/images/chaveiro-corporativo.jpg',
        tags: ['chaveiro', 'metal', 'corporativo']
      }
    ]
  },
  {
    id: 'presentes',
    title: 'Presentes Especiais',
    description: 'Presentes únicos para ocasiões inesquecíveis',
    products: [
      {
        id: 41,
        name: 'Caixa Surpresa Personalizada',
        description: 'Caixas temáticas com múltiplos itens personalizados',
        image: 'https://picsum.photos/800/600?random=41',
        tags: ['caixa', 'surpresa', 'completo']
      },
      {
        id: 42,
        name: 'Álbum de Fotos Exclusivo',
        description: 'Álbuns artesanais para guardar memórias especiais',
        image: '/images/album-fotos.jpg',
        tags: ['álbum', 'memórias', 'artesanal']
      },
      {
        id: 43,
        name: 'Troféu Personalizado',
        description: 'Troféus únicos para reconhecer conquistas especiais',
        image: '/images/trofeu.jpg',
        tags: ['troféu', 'conquista', 'reconhecimento']
      },
      {
        id: 44,
        name: 'Kit Aniversário Completo',
        description: 'Conjunto completo para celebrar aniversários',
        image: '/images/kit-aniversario.jpg',
        tags: ['aniversário', 'celebração', 'kit']
      },
      {
        id: 45,
        name: 'Presente Dia das Mães',
        description: 'Conjuntos especiais para homenagear as mães',
        image: '/images/presente-dia-maes.jpg',
        tags: ['mães', 'homenagem', 'amor']
      },
      {
        id: 46,
        name: 'Kit Bebê Personalizado',
        description: 'Conjuntos fofos para recém-nascidos',
        image: '/images/kit-bebe.jpg',
        tags: ['bebê', 'nascimento', 'fofo']
      },
      {
        id: 47,
        name: 'Presente Formatura',
        description: 'Lembranças especiais para formandos',
        image: '/images/presente-formatura.jpg',
        tags: ['formatura', 'conquista', 'lembrança']
      },
      {
        id: 48,
        name: 'Kit Casamento Personalizado',
        description: 'Presentes únicos para casais especiais',
        image: '/images/kit-casamento.jpg',
        tags: ['casamento', 'casal', 'união']
      }
    ]
  }
]; 