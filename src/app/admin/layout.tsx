import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Zero84 Personalizados',
  description: 'Painel administrativo para gerenciar produtos da Zero84 Personalizados',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 