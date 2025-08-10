export interface Coffee {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
  description?: string;
  temperatures?: TemperatureOption[];
  sizes?: SizeOption[];
  sugarLevels?: SugarLevel[];
  toppings?: Topping[];
}

export interface TemperatureOption {
  id: string;
  name: string;
  available: boolean;
}

export interface SizeOption {
  id: string;
  name: string;
  price: number;
}

export interface SugarLevel {
  id: string;
  name: string;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface CartItemOptions {
  temperature?: string;
  size?: string;
  sugarLevel?: string;
  toppings?: string[];
  quantity: number;
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

export type CategoryFilter = 'All' | 'Smoothies' | 'Coffee' | 'Tea' | 'Cake';