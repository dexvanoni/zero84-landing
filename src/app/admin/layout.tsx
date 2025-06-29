import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Strike Personalizados',
  description: 'Painel administrativo para gerenciar produtos da Strike Personalizados',
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