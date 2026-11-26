import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartProductInput {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
}

export interface CartEntry {
  key: string;
  product: CartProductInput;
  quantity: number;
}

interface CartContextValue {
  items: CartEntry[];
  totalCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: CartProductInput) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
}

const INITIAL_CART_ITEMS: CartEntry[] = [
  {
    key: 'aerostride-velocity-x-US 9.5-Volt Black',
    product: {
      id: 'aerostride-velocity-x',
      name: 'AeroStride Velocity X',
      price: 180.0,
      image: '/images/prod-kinetic.jpg',
      size: 'US 9.5',
      color: 'Volt Black',
    },
    quantity: 1,
  },
  {
    key: 'stride-apex-pro-carbon-US 10-Alpine White',
    product: {
      id: 'stride-apex-pro-carbon',
      name: 'Stride Apex Pro Carbon',
      price: 165.0,
      image: '/images/hero-apex-pro.jpg',
      size: 'US 10',
      color: 'Alpine White',
    },
    quantity: 1,
  },
];

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>(INITIAL_CART_ITEMS);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: CartProductInput) => {
    const normalized: CartProductInput = {
      ...product,
      size: product.size ?? 'US 10',
      color: product.color ?? 'Standard',
    };
    const key = `${normalized.id}-${normalized.size}-${normalized.color}`;

    setItems((prev) => {
      const existing = prev.find((entry) => entry.key === key);
      if (existing) {
        return prev.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { key, product: normalized, quantity: 1 }];
    });
  };

  const updateQuantity = (key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.key === key
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeFromCart = (key: string) => {
    setItems((prev) => prev.filter((entry) => entry.key !== key));
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = items.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
