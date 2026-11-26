import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import { FEATURED_PRODUCTS, type FeaturedProduct } from '@/data/homeData';
import { useCart } from '@/context/CartContext';

type FilterTab = 'ALL' | 'RUNNING' | 'LIFESTYLE';

const FILTER_TABS: FilterTab[] = ['ALL', 'RUNNING', 'LIFESTYLE'];

export default function FeaturedReleasesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

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

  return (
    <section id="featured" className="bg-[#F5F5F5] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header + Filter Pills */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
              FEATURED RELEASES
            </p>
            <h2 className="mt-1 font-display text-lg font-bold tracking-wide text-neutral-900 uppercase sm:text-xl">
              TRENDING NOW
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-md px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-neutral-200/90 text-neutral-900'
                      : 'bg-white/80 text-neutral-500 hover:bg-neutral-200/50 hover:text-neutral-900'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isAdded = justAddedId === product.id;
            const isLimited = product.badge === 'LIMITED';

            return (
              <article
                key={product.id}
                className="group rounded-xl border border-neutral-200/80 bg-white p-3.5 transition-shadow hover:shadow-md"
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#EFEFEF]">
                  <span
                    className={`absolute top-2.5 left-2.5 z-10 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      isLimited
                        ? 'bg-neutral-200 text-neutral-700'
                        : 'bg-stride-red text-white'
                    }`}
                  >
                    {product.badge}
                  </span>

                  <Link
                    to={`/product/${product.slug}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    aria-label={`Add ${product.name} to bag`}
                    className={`absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-md text-white transition-all active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600'
                        : 'bg-stride-dark hover:bg-neutral-800'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="h-4 w-4" strokeWidth={2.2} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    )}
                  </button>
                </div>

                {/* Product Details */}
                <div className="mt-3.5 px-0.5">
                  <div className="flex items-center gap-1.5">
                    {product.colors.map((hex, index) => (
                      <span
                        key={`${product.id}-color-${index}`}
                        className="h-2.5 w-2.5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>

                  <p className="mt-2.5 text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                    {product.categoryLabel}
                  </p>

                  <h3 className="mt-0.5 text-sm font-bold text-neutral-900">
                    <Link
                      to={`/product/${product.slug}`}
                      className="transition-colors hover:text-stride-red"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-neutral-700">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
