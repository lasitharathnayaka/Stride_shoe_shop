import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Heart, Plus, Star } from 'lucide-react';
import { FEATURED_PRODUCTS, type FeaturedProduct } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

type FilterTab = 'ALL' | 'RUNNING' | 'LIFESTYLE';

const FILTER_TABS: FilterTab[] = ['ALL', 'RUNNING', 'LIFESTYLE'];

export default function FeaturedReleasesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const filteredProducts =
    activeFilter === 'ALL'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter(
          (item) => item.filterCategory === activeFilter
        );

  const handleQuickAdd = (product: FeaturedProduct) => {
    addToCart(product);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((current) => (current === product.id ? null : current));
    }, 900);
  };

  const handleToggleWishlist = (product: FeaturedProduct) => {
    toggleWishlist({
      id: product.id,
      slug: product.slug,
      brand: 'STRIDE LAB',
      name: product.name,
      colorway: product.categoryLabel,
      savedSize: 'US 10',
      price: product.price,
      image: product.image,
    });
  };

  return (
    <section id="featured" className="bg-[#F5F5F7] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header + Filter Pills */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-stride-red uppercase">
              FEATURED RELEASES
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase sm:text-3xl">
              TRENDING NOW
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 self-start rounded-lg border border-neutral-200/80 bg-white p-1 sm:self-auto">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-md px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isAdded = justAddedId === product.id;
            const isLimited = product.badge === 'LIMITED';
            const wishlisted = isWishlisted(product.slug);

            return (
              <article
                key={product.id}
                className="group rounded-2xl border border-neutral-200/80 bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#EFEFF2]">
                  <span
                    className={`absolute top-2.5 left-2.5 z-10 rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      isLimited
                        ? 'bg-neutral-900 text-white'
                        : 'bg-stride-red text-white'
                    }`}
                  >
                    {product.badge}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleWishlist(product)}
                    aria-label={`Save ${product.name} to wishlist`}
                    className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-xs backdrop-blur-xs transition-transform hover:scale-105"
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        wishlisted ? 'fill-stride-red text-stride-red' : ''
                      }`}
                      strokeWidth={1.9}
                    />
                  </button>

                  <Link
                    to={`/product/${product.slug}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    aria-label={`Add ${product.name} to bag`}
                    className={`absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm transition-all active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600'
                        : 'bg-neutral-950 hover:bg-stride-red'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2.4} />
                    )}
                  </button>
                </div>

                {/* Product Details */}
                <div className="mt-4 px-1 pb-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((hex, index) => (
                        <span
                          key={`${product.id}-color-${index}`}
                          className="h-3 w-3 rounded-full border border-neutral-300"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600">
                      <Star className="h-3 w-3 fill-neutral-900 text-neutral-900" />
                      4.9
                    </span>
                  </div>

                  <p className="mt-2.5 text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
                    {product.categoryLabel}
                  </p>

                  <h3 className="mt-0.5 text-sm font-bold text-neutral-950">
                    <Link
                      to={`/product/${product.slug}`}
                      className="transition-colors hover:text-stride-red"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="mt-1 font-editorial text-sm font-semibold text-neutral-800">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Collection Link */}
        <div className="mt-10 text-center">
          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-xs font-bold tracking-wider text-neutral-900 uppercase transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
          >
            <span>View Full Collection</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
