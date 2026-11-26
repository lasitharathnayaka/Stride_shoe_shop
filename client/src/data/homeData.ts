export interface CategoryItem {
  id: string;
  index: string;
  subtitle: string;
  title: string;
  image: string;
  slug: string;
}

export interface FeaturedProduct {
  id: string;
  slug: string;
  badge: 'NEW' | 'LIMITED' | 'HOT';
  categoryLabel: string;
  filterCategory: 'RUNNING' | 'LIFESTYLE';
  name: string;
  price: number;
  image: string;
  colors: string[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    index: '01 / PERFORMANCE',
    subtitle: 'PERFORMANCE',
    title: 'RUNNING',
    image: '/images/cat-running.jpg',
    slug: 'running',
  },
  {
    id: 'cat-2',
    index: '02 / STREETWEAR',
    subtitle: 'STREETWEAR',
    title: 'LIFESTYLE',
    image: '/images/cat-lifestyle.jpg',
    slug: 'lifestyle',
  },
  {
    id: 'cat-3',
    index: '03 / COURT',
    subtitle: 'COURT',
    title: 'BASKETBALL',
    image: '/images/cat-basketball.jpg',
    slug: 'basketball',
  },
  {
    id: 'cat-4',
    index: '04 / OUTDOOR',
    subtitle: 'OUTDOOR',
    title: 'BOOTS',
    image: '/images/cat-boots.jpg',
    slug: 'boots',
  },
];

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'prod-vapor-x',
    slug: 'stride-vapor-x',
    badge: 'NEW',
    categoryLabel: 'MARATHON ELITE',
    filterCategory: 'RUNNING',
    name: 'STRIDE Vapor X',
    price: 185.0,
    image: '/images/prod-vapor-x.jpg',
    colors: ['#111111', '#B91C0C', '#D4D4D8'],
  },
  {
    id: 'prod-kinetic',
    slug: 'stride-kinetic',
    badge: 'NEW',
    categoryLabel: 'URBAN UTILITY',
    filterCategory: 'LIFESTYLE',
    name: 'STRIDE Kinetic',
    price: 160.0,
    image: '/images/prod-kinetic.jpg',
    colors: ['#111111', '#52525B'],
  },
  {
    id: 'prod-apex-court',
    slug: 'stride-apex-court',
    badge: 'LIMITED',
    categoryLabel: 'PRO COURT',
    filterCategory: 'RUNNING',
    name: 'STRIDE Apex Court',
    price: 195.0,
    image: '/images/prod-apex-court.jpg',
    colors: ['#B91C0C', '#111111'],
  },
  {
    id: 'prod-terra-trail',
    slug: 'stride-terra-trail',
    badge: 'HOT',
    categoryLabel: 'ALL-TERRAIN',
    filterCategory: 'LIFESTYLE',
    name: 'STRIDE Terra Trail',
    price: 210.0,
    image: '/images/prod-terra-trail.jpg',
    colors: ['#57534E', '#B91C0C'],
  },
];
