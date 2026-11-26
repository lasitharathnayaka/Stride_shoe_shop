import { COLLECTION_PRODUCTS } from '@/data/collectionData';
import { FEATURED_PRODUCTS } from '@/data/homeData';

export interface ProductColorOption {
  id: string;
  name: string;
  image: string;
  accentHex: string;
}

export interface ProductReview {
  id: string;
  initials: string;
  author: string;
  verified: boolean;
  rating: number;
  dateLabel: string;
  title: string;
  body: string;
  photo: string;
  tags: ('With Photos' | 'Marathon Runners' | 'True to Size')[];
}

export interface ProductDetailData {
  id: string;
  slug: string;
  brandLabel: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  gallery: string[];
  colors: ProductColorOption[];
  sizes: { label: string; available: boolean }[];
}

export const TECH_SPECS = [
  {
    id: 'carbon',
    icon: 'zap' as const,
    title: 'Carbon Plate Tech',
    description:
      'Spoon-shaped carbon fiber plate delivers maximum energy return and aggressive toe-off propulsion.',
  },
  {
    id: 'foam',
    icon: 'wind' as const,
    title: 'Nitrogen-Infused Foam',
    description:
      'Ultra-responsive supercritical cushioning provides maximum impact absorption without extra weight.',
  },
  {
    id: 'weight',
    icon: 'weight' as const,
    title: '210g Weight',
    description:
      'Featherlight construction optimized for speed sessions, tempo runs, and marathon PRs.',
  },
  {
    id: 'drop',
    icon: 'drop' as const,
    title: '8mm Drop',
    description:
      'Balanced geometry offering smooth heel-to-toe transitions across various running strides.',
  },
];

export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    initials: 'JD',
    author: 'Julian D.',
    verified: true,
    rating: 5,
    dateLabel: '2 days ago',
    title: 'Absolute game changer for race day!',
    body: 'Shaved 3 minutes off my half marathon time. The carbon plate combined with the nitrogen foam gives an incredible bounce that keeps legs fresh late in the run.',
    photo: '/images/cat-running.jpg',
    tags: ['With Photos', 'Marathon Runners', 'True to Size'],
  },
  {
    id: 'rev-2',
    initials: 'SM',
    author: 'Sarah M.',
    verified: true,
    rating: 5,
    dateLabel: '1 week ago',
    title: 'Incredible comfort right out of the box.',
    body: 'Was worried about break-in period with carbon plated shoes, but these fit true to size and felt dialed in immediately. Great lockdown across the midfoot.',
    photo: '/images/cat-lifestyle.jpg',
    tags: ['With Photos', 'True to Size'],
  },
  {
    id: 'rev-3',
    initials: 'AK',
    author: 'Alex K.',
    verified: true,
    rating: 5,
    dateLabel: '2 weeks ago',
    title: 'Sleek styling and elite performance',
    body: 'Not only do they look amazing for casual wear, but they perform exceptionally on speed workouts. Worth every penny of the investment.',
    photo: '/images/cat-basketball.jpg',
    tags: ['With Photos', 'Marathon Runners'],
  },
];

const DEFAULT_SIZES: { label: string; available: boolean }[] = [
  { label: 'US 7', available: true },
  { label: 'US 7.5', available: true },
  { label: 'US 8', available: true },
  { label: 'US 8.5', available: false },
  { label: 'US 9', available: true },
  { label: 'US 9.5', available: true },
  { label: 'US 10', available: true },
  { label: 'US 10.5', available: true },
  { label: 'US 11', available: true },
  { label: 'US 11.5', available: true },
  { label: 'US 12', available: true },
];

const DEFAULT_COLORS: ProductColorOption[] = [
  {
    id: 'volt-black',
    name: 'Volt Black',
    image: '/images/prod-vapor-x.jpg',
    accentHex: '#111111',
  },
  {
    id: 'glacier-white',
    name: 'Glacier White',
    image: '/images/hero-apex-pro.jpg',
    accentHex: '#E5E7EB',
  },
  {
    id: 'crimson-pulse',
    name: 'Crimson Pulse',
    image: '/images/prod-apex-court.jpg',
    accentHex: '#EA4325',
  },
  {
    id: 'stealth-carbon',
    name: 'Stealth Carbon',
    image: '/images/prod-kinetic.jpg',
    accentHex: '#3F3F46',
  },
];

export const DEFAULT_PRODUCT_DETAIL: ProductDetailData = {
  id: 'aerostride-velocity-x',
  slug: 'aerostride-velocity-x',
  brandLabel: 'STRIDE LAB',
  name: 'AeroStride Velocity X',
  price: 180.0,
  rating: 4.9,
  reviewCount: 312,
  description:
    'Engineered for explosive energy return and lightweight endurance. Featuring a full-length carbon plate encased in nitrogen-infused foam for an unmatched propulsion feel.',
  gallery: [
    '/images/prod-vapor-x.jpg',
    '/images/hero-apex-pro.jpg',
    '/images/innovation-carbon.jpg',
    '/images/cat-running.jpg',
  ],
  colors: DEFAULT_COLORS,
  sizes: DEFAULT_SIZES,
};

export function getProductDetailBySlug(slug?: string): ProductDetailData {
  if (!slug || slug === DEFAULT_PRODUCT_DETAIL.slug) {
    return DEFAULT_PRODUCT_DETAIL;
  }

  const fromCollection = COLLECTION_PRODUCTS.find((p) => p.slug === slug);
  if (fromCollection) {
    return {
      ...DEFAULT_PRODUCT_DETAIL,
      id: fromCollection.id,
      slug: fromCollection.slug,
      brandLabel: fromCollection.brandLabel,
      name: fromCollection.name,
      price: fromCollection.price,
      rating: fromCollection.rating,
      gallery: [
        fromCollection.image,
        '/images/hero-apex-pro.jpg',
        '/images/innovation-carbon.jpg',
        '/images/cat-running.jpg',
      ],
      colors: [
        {
          id: 'primary',
          name: 'Volt Black',
          image: fromCollection.image,
          accentHex: fromCollection.colors[0] ?? '#111111',
        },
        ...DEFAULT_COLORS.slice(1),
      ],
    };
  }

  const fromFeatured = FEATURED_PRODUCTS.find((p) => p.slug === slug);
  if (fromFeatured) {
    return {
      ...DEFAULT_PRODUCT_DETAIL,
      id: fromFeatured.id,
      slug: fromFeatured.slug,
      brandLabel: 'STRIDE LAB',
      name: fromFeatured.name,
      price: fromFeatured.price,
      gallery: [
        fromFeatured.image,
        '/images/hero-apex-pro.jpg',
        '/images/innovation-carbon.jpg',
        '/images/cat-running.jpg',
      ],
      colors: [
        {
          id: 'primary',
          name: 'Volt Black',
          image: fromFeatured.image,
          accentHex: fromFeatured.colors[0] ?? '#111111',
        },
        ...DEFAULT_COLORS.slice(1),
      ],
    };
  }

  return DEFAULT_PRODUCT_DETAIL;
}
