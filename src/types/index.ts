export interface Coffee {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}

export interface User {
  name: string;
  points: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  discount?: string;
  image: string;
}

export type CategoryFilter = 'All' | 'Smoothies' | 'Coffee Based' | 'Tea';