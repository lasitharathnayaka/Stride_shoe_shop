export interface ShoeVariant {
  id: string;
  colorName: string;
  colorHex: string;
  images: string[];
  sizes: {
    size: number;
    stock: number;
  }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'running' | 'casual' | 'basketball' | 'training' | 'lifestyle';
  gender: 'men' | 'women' | 'unisex' | 'kids';
  price: number;
  originalPrice?: number;
  description: string;
  variants: ShoeVariant[];
  featured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  size: number;
  quantity: number;
}
