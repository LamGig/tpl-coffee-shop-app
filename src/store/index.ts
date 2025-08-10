import { Coffee, Store, User, CartItemOptions } from '@/src/types';
import { create } from 'zustand';

interface CartItem {
  coffee: Coffee;
  quantity: number;
  options?: Omit<CartItemOptions, 'quantity'>;
}

interface AppState {
  user: User;
  selectedStore: Store;
  stores: Store[];
  cart: CartItem[];
  favorites: string[];
  coffeeData: Coffee[];
  
  setUser: (user: User) => void;
  setSelectedStore: (store: Store) => void;
  addToCart: (coffee: Coffee) => void;
  addToCartWithOptions: (coffee: Coffee, options: CartItemOptions) => void;
  removeFromCart: (coffeeId: string) => void;
  updateCartQuantity: (coffeeId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (coffeeId: string) => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  setCoffeeData: (coffees: Coffee[]) => void;
  getCoffeeById: (id: string) => Coffee | undefined;
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
  coffeeData: [],

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
    return state.cart.reduce((total, item) => {
      let itemPrice = item.coffee.price;
      
      if (item.options?.size && item.coffee.sizes) {
        const size = item.coffee.sizes.find(s => s.id === item.options?.size);
        if (size) itemPrice = size.price;
      }
      
      if (item.options?.toppings && item.coffee.toppings) {
        const toppingsPrice = item.options.toppings.reduce((sum, toppingId) => {
          const topping = item.coffee.toppings?.find(t => t.id === toppingId);
          return sum + (topping?.price || 0);
        }, 0);
        itemPrice += toppingsPrice;
      }
      
      return total + (itemPrice * item.quantity);
    }, 0);
  },

  addToCartWithOptions: (coffee, options) => set((state) => {
    const { quantity, ...itemOptions } = options;
    
    const existingItemIndex = state.cart.findIndex(item => {
      if (item.coffee.id !== coffee.id) return false;
      
      const sameTemp = item.options?.temperature === itemOptions.temperature;
      const sameSize = item.options?.size === itemOptions.size;
      const sameSugar = item.options?.sugarLevel === itemOptions.sugarLevel;
      const sameToppings = JSON.stringify(item.options?.toppings?.sort()) === 
                          JSON.stringify(itemOptions.toppings?.sort());
      
      return sameTemp && sameSize && sameSugar && sameToppings;
    });
    
    if (existingItemIndex >= 0) {
      const newCart = [...state.cart];
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + quantity,
      };
      return { cart: newCart };
    }
    
    return { 
      cart: [...state.cart, { 
        coffee, 
        quantity, 
        options: itemOptions 
      }] 
    };
  }),

  setCoffeeData: (coffees) => set({ coffeeData: coffees }),
  
  getCoffeeById: (id) => {
    const state = get();
    return state.coffeeData.find(coffee => coffee.id === id);
  },
}));