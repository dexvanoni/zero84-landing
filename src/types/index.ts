import { ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

export interface SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
} 