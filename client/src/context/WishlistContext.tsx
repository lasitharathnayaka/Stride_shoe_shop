import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export interface WishlistItem {
  id: string;
  slug: string;
  brand: string;
  name: string;
  colorway: string;
  savedSize: string;
  price: number;
  originalPrice?: number;
  image: string;
  status?: 'price-drop' | 'sold-out';
  badgeText?: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  totalCount: number;
  isWishlisted: (idOrSlug: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  updateSavedSize: (id: string, nextSize: string) => void;
}

const STORAGE_KEY = 'stride_wishlist_v1';

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'wish-1',
    slug: 'zoomknit-elite',
    brand: 'STRIDE STUDIO',
    name: 'Classic Court Low',
    colorway: 'Triple White',
    savedSize: 'US 10',
    price: 225,
    originalPrice: 265,
    image: '/images/hero-apex-pro.jpg',
    status: 'price-drop',
    badgeText: 'Price Dropped -$40',
  },
  {
    id: 'wish-2',
    slug: 'aerostride-velocity-x',
    brand: 'BALENCIAGA',
    name: 'Runner Sneaker',
    colorway: 'Vintage Grey',
    savedSize: 'US 10',
    price: 310,
    image: '/images/prod-vapor-x.jpg',
    status: 'sold-out',
    badgeText: 'Sold Out',
  },
  {
    id: 'wish-3',
    slug: 'stride-terra-trail',
    brand: 'STRIDE LAB',
    name: 'Heritage Suede',
    colorway: 'Sand / Forest',
    savedSize: 'US 9.5',
    price: 195,
    image: '/images/cat-lifestyle.jpg',
  },
  {
    id: 'wish-4',
    slug: 'kinetics-speed-2',
    brand: 'STRIDE ADVANCED',
    name: 'ACS Carbon Pro',
    colorway: 'Black Matte',
    savedSize: 'US 10.5',
    price: 220,
    image: '/images/prod-kinetic.jpg',
  },
];

function loadInitialWishlist(): WishlistItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_WISHLIST;
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : INITIAL_WISHLIST;
  } catch {
    return INITIAL_WISHLIST;
  }
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(loadInitialWishlist);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  const isWishlisted = (idOrSlug: string) =>
    items.some((item) => item.id === idOrSlug || item.slug === idOrSlug);

  const toggleWishlist = (candidate: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some(
        (item) => item.id === candidate.id || item.slug === candidate.slug
      );
      if (exists) {
        return prev.filter(
          (item) => item.id !== candidate.id && item.slug !== candidate.slug
        );
      }
      return [candidate, ...prev];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSavedSize = (id: string, nextSize: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, savedSize: nextSize } : item
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalCount: items.length,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        updateSavedSize,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return ctx;
}
