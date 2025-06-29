import { ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
  created_at?: string;
  updated_at?: string;
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