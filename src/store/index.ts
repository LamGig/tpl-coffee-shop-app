import { Coffee, Store, User } from '@/src/types';
import { create } from 'zustand';

interface CartItem {
  coffee: Coffee;
  quantity: number;
}

interface AppState {
  user: User;
  selectedStore: Store;
  stores: Store[];
  cart: CartItem[];
  favorites: string[];
  
  setUser: (user: User) => void;
  setSelectedStore: (store: Store) => void;
  addToCart: (coffee: Coffee) => void;
  removeFromCart: (coffeeId: string) => void;
  updateCartQuantity: (coffeeId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (coffeeId: string) => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  user: {
    name: 'John Doe',
    points: 1,
  },
  selectedStore: {
    id: '1',
    name: 'CIPLAZ Garut, Garut Kota',
    address: 'Jl. Ahmad Yani No. 123, Garut',
  },
  stores: [
    {
      id: '1',
      name: 'CIPLAZ Garut, Garut Kota',
      address: 'Jl. Ahmad Yani No. 123, Garut',
    },
    {
      id: '2',
      name: 'CIPLAZ Bandung, Dago',
      address: 'Jl. Ir. H. Djuanda No. 456, Bandung',
    },
    {
      id: '3',
      name: 'CIPLAZ Jakarta, Senopati',
      address: 'Jl. Senopati No. 789, Jakarta Selatan',
    },
  ],
  cart: [],
  favorites: [],

  setUser: (user) => set({ user }),
  
  setSelectedStore: (store) => set({ selectedStore: store }),
  
  addToCart: (coffee) => set((state) => {
    const existingItem = state.cart.find(item => item.coffee.id === coffee.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.coffee.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { coffee, quantity: 1 }] };
  }),
  
  removeFromCart: (coffeeId) => set((state) => ({
    cart: state.cart.filter(item => item.coffee.id !== coffeeId),
  })),
  
  updateCartQuantity: (coffeeId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { cart: state.cart.filter(item => item.coffee.id !== coffeeId) };
    }
    return {
      cart: state.cart.map(item =>
        item.coffee.id === coffeeId ? { ...item, quantity } : item
      ),
    };
  }),
  
  clearCart: () => set({ cart: [] }),
  
  toggleFavorite: (coffeeId) => set((state) => {
    const isFavorite = state.favorites.includes(coffeeId);
    return {
      favorites: isFavorite
        ? state.favorites.filter(id => id !== coffeeId)
        : [...state.favorites, coffeeId],
    };
  }),
  
  getCartItemCount: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + (item.coffee.price * item.quantity), 0);
  },
}));