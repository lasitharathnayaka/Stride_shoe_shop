export interface CollectionProduct {
  id: string;
  slug: string;
  brandLabel: string;
  brand: 'Stride Lab' | 'Nike' | 'Adidas' | 'New Balance';
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  badge?: 'NEW' | 'LOW STOCK';
  image: string;
  colors: string[];
  colorNames: string[];
  sizes: number[];
  widths: ('Standard (D)' | 'Wide (2E)' | 'Extra Wide (4E)')[];
  material: 'Leather' | 'Knit Mesh';
  category: string;
}

export const US_SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

export const WIDTH_OPTIONS = [
  'Standard (D)',
  'Wide (2E)',
  'Extra Wide (4E)',
] as const;

export const COLORWAY_OPTIONS = [
  { id: 'black', label: 'Black', hex: '#111111' },
  { id: 'white', label: 'White', hex: '#FFFFFF' },
  { id: 'red', label: 'Crimson', hex: '#B91C0C' },
  { id: 'charcoal', label: 'Charcoal', hex: '#27272A' },
  { id: 'slate', label: 'Slate', hex: '#52525B' },
  { id: 'silver', label: 'Silver', hex: '#E4E4E7' },
] as const;

export const BRAND_OPTIONS = [
  'Stride Lab',
  'Nike',
  'Adidas',
  'New Balance',
] as const;

export const MATERIAL_OPTIONS = ['Leather', 'Knit Mesh'] as const;

export const COLLECTION_PRODUCTS: CollectionProduct[] = [
  {
    id: 'col-1',
    slug: 'aeroapex-pro-v1',
    brandLabel: 'STRIDE LAB',
    brand: 'Stride Lab',
    name: 'AeroApex Pro V1',
    subtitle: 'Ultralight Endurance Runner',
    price: 210,
    rating: 4.8,
    badge: 'NEW',
    image: '/images/prod-kinetic.jpg',
    colors: ['#111111', '#B91C0C', '#E4E4E7'],
    colorNames: ['black', 'red', 'silver'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    widths: ['Standard (D)', 'Wide (2E)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
  {
    id: 'col-2',
    slug: 'zoomknit-elite',
    brandLabel: 'NIKE RUNNING',
    brand: 'Nike',
    name: 'ZoomKnit Elite',
    subtitle: 'Responsive Marathon Shoe',
    price: 195,
    rating: 4.9,
    badge: 'LOW STOCK',
    image: '/images/cat-lifestyle.jpg',
    colors: ['#E4E4E7', '#52525B'],
    colorNames: ['white', 'silver', 'slate'],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
    widths: ['Standard (D)', 'Wide (2E)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
  {
    id: 'col-3',
    slug: 'stratastride-4',
    brandLabel: 'ADIDAS PERFORMANCE',
    brand: 'Adidas',
    name: 'StrataStride 4',
    subtitle: 'Daily Distance Trainer',
    price: 165,
    rating: 4.7,
    image: '/images/hero-apex-pro.jpg',
    colors: ['#111111', '#E4E4E7'],
    colorNames: ['black', 'white', 'silver'],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    widths: ['Standard (D)', 'Wide (2E)', 'Extra Wide (4E)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
  {
    id: 'col-4',
    slug: 'fuelcell-carbon-x',
    brandLabel: 'NEW BALANCE',
    brand: 'New Balance',
    name: 'FuelCell Carbon X',
    subtitle: 'Speed Propulsion Runner',
    price: 220,
    rating: 4.9,
    badge: 'NEW',
    image: '/images/prod-vapor-x.jpg',
    colors: ['#E4E4E7', '#B91C0C'],
    colorNames: ['white', 'silver', 'red'],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    widths: ['Standard (D)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
  {
    id: 'col-5',
    slug: 'kinetics-speed-2',
    brandLabel: 'STRIDE LAB',
    brand: 'Stride Lab',
    name: 'Kinetics Speed 2',
    subtitle: 'Lightweight Trainer',
    price: 180,
    rating: 4.8,
    image: '/images/cat-boots.jpg',
    colors: ['#111111', '#27272A'],
    colorNames: ['black', 'charcoal'],
    sizes: [7, 7.5, 8, 9, 9.5, 10, 10.5, 11, 12],
    widths: ['Standard (D)', 'Wide (2E)'],
    material: 'Leather',
    category: 'Running',
  },
  {
    id: 'col-6',
    slug: 'air-vaportrail',
    brandLabel: 'NIKE RUNNING',
    brand: 'Nike',
    name: 'Air VaporTrail',
    subtitle: 'Cushioned Road Shoe',
    price: 210,
    rating: 4.9,
    badge: 'LOW STOCK',
    image: '/images/prod-apex-court.jpg',
    colors: ['#E4E4E7', '#111111'],
    colorNames: ['white', 'black', 'silver'],
    sizes: [7.5, 8, 8.5, 9, 10, 10.5, 11, 12, 13],
    widths: ['Standard (D)', 'Extra Wide (4E)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
  {
    id: 'col-7',
    slug: 'apex-motion-carbon',
    brandLabel: 'STRIDE LAB',
    brand: 'Stride Lab',
    name: 'Apex Motion Carbon',
    subtitle: 'Elite Racing Silhouette',
    price: 220,
    rating: 5.0,
    image: '/images/cat-running.jpg',
    colors: ['#B91C0C', '#111111'],
    colorNames: ['red', 'black', 'charcoal'],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    widths: ['Standard (D)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
  {
    id: 'col-8',
    slug: 'fresh-foam-trail',
    brandLabel: 'NEW BALANCE',
    brand: 'New Balance',
    name: 'Fresh Foam Trail',
    subtitle: 'All-Terrain Running Shoe',
    price: 175,
    rating: 4.8,
    image: '/images/prod-terra-trail.jpg',
    colors: ['#52525B', '#27272A'],
    colorNames: ['slate', 'charcoal'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    widths: ['Standard (D)', 'Wide (2E)', 'Extra Wide (4E)'],
    material: 'Leather',
    category: 'Running',
  },
  {
    id: 'col-9',
    slug: 'ultraboost-light',
    brandLabel: 'ADIDAS PERFORMANCE',
    brand: 'Adidas',
    name: 'Ultraboost Light',
    subtitle: 'Maximum Energy Return',
    price: 190,
    rating: 4.9,
    badge: 'NEW',
    image: '/images/cat-basketball.jpg',
    colors: ['#B91C0C', '#27272A'],
    colorNames: ['red', 'charcoal', 'black'],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    widths: ['Standard (D)', 'Wide (2E)'],
    material: 'Knit Mesh',
    category: 'Running',
  },
];
