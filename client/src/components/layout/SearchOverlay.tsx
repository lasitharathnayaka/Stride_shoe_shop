import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Flame,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface SearchProduct {
  id: string;
  slug: string;
  name: string;
  stockNote: string;
  price: number;
  image: string;
  badge?: 'NEW';
  keywords: string[];
}

const SEARCH_PRODUCTS: SearchProduct[] = [
  {
    id: 'search-velocity-x',
    slug: 'aerostride-velocity-x',
    name: 'Velocity X Elite',
    stockNote: 'US 8 – 12 in stock',
    price: 180.0,
    image: '/images/prod-kinetic.jpg',
    badge: 'NEW',
    keywords: [
      'aero',
      'runn',
      'running',
      'velocity',
      'carbon plate',
      'us 10 deals',
    ],
  },
  {
    id: 'search-glide-v2',
    slug: 'zoomknit-elite',
    name: 'Glide Daily v2',
    stockNote: 'US 7.5 – 13 in stock',
    price: 150.0,
    image: '/images/hero-apex-pro.jpg',
    keywords: [
      'aero',
      'runn',
      'running',
      'glide',
      'white leather',
      'us 10 deals',
    ],
  },
  {
    id: 'search-lite-carbon',
    slug: 'fuelcell-carbon-x',
    name: 'Lite Carbon',
    stockNote: 'US 9 – 11 in stock',
    price: 220.0,
    image: '/images/cat-running.jpg',
    keywords: ['aero', 'runn', 'running', 'carbon plate', 'lite'],
  },
  {
    id: 'search-trail-max',
    slug: 'stride-terra-trail',
    name: 'Trail Max GTX',
    stockNote: 'US 8 – 14 in stock',
    price: 195.0,
    image: '/images/prod-terra-trail.jpg',
    keywords: ['aero', 'runn', 'running', 'trail', 'waterproof trail', 'gtx'],
  },
];

const SUGGESTION_ITEMS = [
  { label: 'AeroStride Velocity X', slug: 'aerostride-velocity-x' },
  { label: 'AeroGlide Daily Trainer', slug: 'zoomknit-elite' },
  { label: 'AeroLite Carbon', slug: 'fuelcell-carbon-x' },
];

const TRENDING_SEARCHES = [
  'Carbon Plate',
  'Waterproof Trail',
  'US 10 Deals',
  'White Leather',
];

const CATEGORY_LINKS = [
  { label: "Men's Running", count: 42 },
  { label: "Women's Running", count: 38 },
  { label: 'All-Terrain Trail', count: 19 },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const normalizedQuery = query.trim().toLowerCase();

  const matchedProducts = useMemo(() => {
    if (!normalizedQuery) return SEARCH_PRODUCTS;
    const tokens = normalizedQuery.split(/\s+/);
    return SEARCH_PRODUCTS.filter((product) => {
      const haystack = `${product.name} ${product.keywords.join(' ')}`.toLowerCase();
      return tokens.some((token) => haystack.includes(token));
    });
  }, [normalizedQuery]);

  const matchedSuggestions = useMemo(() => {
    if (!normalizedQuery) return SUGGESTION_ITEMS;
    const firstToken = normalizedQuery.split(/\s+/)[0];
    const filtered = SUGGESTION_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(firstToken)
    );
    return filtered.length > 0 ? filtered : SUGGESTION_ITEMS;
  }, [normalizedQuery]);

  if (!isOpen) return null;

  const highlightMatch = (text: string) => {
    const firstWord = normalizedQuery.split(/\s+/)[0];
    if (!firstWord) return <span>{text}</span>;
    const idx = text.toLowerCase().indexOf(firstWord);
    if (idx === -1) return <span>{text}</span>;

    return (
      <>
        <span>{text.slice(0, idx)}</span>
        <span className="font-bold text-[#F04E2A]">
          {text.slice(idx, idx + firstWord.length)}
        </span>
        <span>{text.slice(idx + firstWord.length)}</span>
      </>
    );
  };

  const handleQuickAdd = (product: SearchProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'US 10',
      color: 'Standard',
    });
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 900);
  };

  const handleNavigate = (to: string) => {
    onClose();
    navigate(to);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/65 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Predictive Search"
    >
      <div
        className="w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark Obsidian Command Search Header */}
        <div className="relative border-b border-white/10 bg-[#09090B] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#F04E2A]/60 to-transparent"
          />

          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
            <div className="flex flex-1 items-center gap-4">
              <Search
                className="h-5 w-5 shrink-0 text-[#F04E2A]"
                strokeWidth={2.2}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search silhouettes, carbon plate, trail..."
                aria-label="Search products"
                className="w-full bg-transparent font-display text-xl font-bold tracking-tight text-white caret-[#F04E2A] placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-neutral-500 focus:outline-none sm:text-2xl"
              />
            </div>

            <div className="flex items-center gap-2.5">
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-neutral-300 uppercase transition-colors hover:bg-white/15 hover:text-white"
                >
                  Clear
                </button>
              )}

              <kbd className="hidden rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-[10px] text-neutral-400 sm:inline-block">
                ESC
              </kbd>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-neutral-300 transition-colors hover:border-[#F04E2A] hover:bg-[#F04E2A] hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Predictive Results Panel */}
        <div className="bg-[#F5F5F7]">
          <div className="mx-auto max-w-6xl px-6 py-6 lg:px-10 lg:py-8">
            <div className="grid grid-cols-1 gap-8 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm lg:grid-cols-12 lg:p-8">
              {/* Left Column: Suggestions, Trending, Categories */}
              <div className="space-y-7 lg:col-span-3 lg:border-r lg:border-neutral-100 lg:pr-6">
                {/* Suggestions */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase">
                    SUGGESTIONS
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {matchedSuggestions.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() =>
                            handleNavigate(`/product/${item.slug}`)
                          }
                          className="group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                        >
                          <span>{highlightMatch(item.label)}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trending Searches */}
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase">
                    <Flame className="h-3 w-3 text-[#F04E2A]" />
                    <span>TRENDING SEARCHES</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-neutral-200/80 bg-[#FAFAFB] px-3 py-1.5 text-[11px] font-semibold text-neutral-700 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase">
                    CATEGORIES
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {CATEGORY_LINKS.map((cat) => (
                      <li key={cat.label}>
                        <button
                          type="button"
                          onClick={() => handleNavigate('/collections')}
                          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                        >
                          <span>{cat.label}</span>
                          <span className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-500">
                            {cat.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Top Matches */}
              <div className="lg:col-span-9">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase">
                      TOP MATCHES
                    </p>
                    <span className="rounded-full bg-neutral-950 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                      {matchedProducts.length}
                    </span>
                  </div>

                  <Link
                    to="/collections"
                    onClick={onClose}
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 transition-colors hover:text-[#F04E2A]"
                  >
                    <span>View All Results</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {matchedProducts.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-neutral-200/70 bg-[#FAFAFB] px-6 py-14 text-center">
                    <p className="font-display text-sm font-bold text-neutral-950 uppercase">
                      No matching silhouettes for &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Try searching for &ldquo;carbon&rdquo;, &ldquo;aero&rdquo;,
                      or &ldquo;trail&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {matchedProducts.map((product) => {
                      const isAdded = justAddedId === product.id;
                      return (
                        <article
                          key={product.id}
                          className="group rounded-2xl border border-neutral-200/80 bg-[#FAFAFB] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-white hover:shadow-lg"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#ECECEF]">
                            {product.badge && (
                              <span className="absolute top-2 right-2 z-10 rounded-md bg-[#F04E2A] px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase">
                                {product.badge}
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                handleNavigate(`/product/${product.slug}`)
                              }
                              className="block h-full w-full"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </button>
                          </div>

                          <div className="mt-3 px-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleNavigate(`/product/${product.slug}`)
                              }
                              className="block text-left font-display text-xs font-bold text-neutral-950 transition-colors hover:text-[#F04E2A]"
                            >
                              {product.name}
                            </button>

                            <p className="mt-0.5 text-[10px] font-medium text-neutral-400">
                              {product.stockNote}
                            </p>

                            <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5">
                              <span className="font-display text-xs font-bold text-neutral-950">
                                ${product.price.toFixed(2)}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleQuickAdd(product)}
                                aria-label={`Add ${product.name} to bag`}
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-white transition-all active:scale-95 ${
                                  isAdded
                                    ? 'bg-emerald-600'
                                    : 'bg-neutral-950 hover:bg-[#F04E2A]'
                                }`}
                              >
                                {isAdded ? (
                                  <Check
                                    className="h-3.5 w-3.5"
                                    strokeWidth={2.4}
                                  />
                                ) : (
                                  <Plus
                                    className="h-3.5 w-3.5"
                                    strokeWidth={2.4}
                                  />
                                )}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
