import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Check,
  Heart,
  Share2,
  ShoppingBag,
  Sparkles,
  Tag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist, type WishlistItem } from '@/context/WishlistContext';
import RestockAlertModal, {
  type RestockProduct,
} from '@/components/product/RestockAlertModal';

type WishlistFilter = 'all' | 'in-stock' | 'price-drop' | 'sold-out';

const SIZE_CHOICES = ['US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'];

export default function WishlistPage() {
  const { addToCart, openCart } = useCart();
  const { items, removeFromWishlist, updateSavedSize } = useWishlist();
  const [activeFilter, setActiveFilter] = useState<WishlistFilter>('all');
  const [restockProduct, setRestockProduct] = useState<RestockProduct | null>(
    null
  );
  const [copiedShare, setCopiedShare] = useState(false);

  const inStockItems = items.filter((item) => item.status !== 'sold-out');
  const priceDropCount = items.filter((item) => item.status === 'price-drop').length;
  const soldOutCount = items.filter((item) => item.status === 'sold-out').length;
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  const visibleItems = useMemo(() => {
    if (activeFilter === 'in-stock') {
      return items.filter((item) => item.status !== 'sold-out');
    }
    if (activeFilter === 'price-drop') {
      return items.filter((item) => item.status === 'price-drop');
    }
    if (activeFilter === 'sold-out') {
      return items.filter((item) => item.status === 'sold-out');
    }
    return items;
  }, [items, activeFilter]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  const handleChangeSize = (id: string, nextSize: string) => {
    updateSavedSize(id, nextSize);
  };

  const handleMoveToBag = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.savedSize,
      color: item.colorway,
    });
    openCart();
  };

  const handleMoveAllToBag = () => {
    inStockItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.savedSize,
        color: item.colorway,
      });
    });
    if (inStockItems.length > 0) openCart();
  };

  const handleShare = () => {
    setCopiedShare(true);
    window.setTimeout(() => setCopiedShare(false), 1800);
  };

  return (
    <div className="bg-[#F5F5F7]">
      {/* Dark Obsidian Curated Wishlist Hero Banner */}
      <section className="relative overflow-hidden bg-[#09090B] text-white">
        <img
          src="/images/bg-streetwear.jpg?v=2"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#09090B]/95 via-[#09090B]/80 to-[#09090B]/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-[#F04E2A] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>CURATED ARCHIVE • {items.length} PAIRS SAVED</span>
              </p>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
                SAVED WISHLIST
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 backdrop-blur-md">
                  Collection Value:{' '}
                  <strong className="text-white">
                    ${totalValue.toFixed(2)}
                  </strong>
                </span>
                {priceDropCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-300">
                    <Tag className="h-3 w-3" />
                    {priceDropCount} Price Drop
                  </span>
                )}
                {soldOutCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-neutral-300">
                    <Bell className="h-3 w-3 text-[#F04E2A]" />
                    {soldOutCount} Restock Watch
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-neutral-950"
              >
                {copiedShare ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share List</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={inStockItems.length === 0}
                onClick={handleMoveAllToBag}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F04E2A] px-5 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-[#F04E2A]/25 transition-all hover:-translate-y-0.5 hover:bg-[#D94120] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Move All to Bag ({inStockItems.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-3.5 sm:flex-row sm:items-center lg:px-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'all', label: `All Saved (${items.length})` },
                { id: 'in-stock', label: `In Stock (${inStockItems.length})` },
                { id: 'price-drop', label: `Price Drops (${priceDropCount})` },
                { id: 'sold-out', label: `Sold Out (${soldOutCount})` },
              ] as const
            ).map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Link
            to="/collections"
            className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 transition-colors hover:text-[#F04E2A]"
          >
            <span>Add More Silhouettes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        {visibleItems.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200/80 bg-white py-20 text-center">
            <p className="font-display text-lg font-bold text-neutral-950 uppercase">
              No saved silhouettes in this view
            </p>
            <p className="mt-1.5 text-xs text-neutral-500">
              Explore the collection to save your favorite pairs and track price
              drops or restocks.
            </p>
            <Link
              to="/collections"
              className="mt-6 inline-block rounded-lg bg-neutral-950 px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleItems.map((item) => {
              const isSoldOut = item.status === 'sold-out';
              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[4/4] overflow-hidden rounded-xl bg-[#ECECEF]">
                      {item.badgeText && (
                        <span
                          className={`absolute top-3 left-3 z-10 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-xs ${
                            item.status === 'price-drop'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-950/90 text-white'
                          }`}
                        >
                          {item.badgeText}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        aria-label={`Remove ${item.name} from wishlist`}
                        title="Remove from wishlist"
                        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#F04E2A] shadow-xs transition-transform hover:scale-110"
                      >
                        <Heart
                          className="h-4 w-4 fill-[#F04E2A]"
                          strokeWidth={1.8}
                        />
                      </button>

                      <Link
                        to={`/product/${item.slug}`}
                        className="block h-full w-full"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                            isSoldOut ? 'opacity-70 grayscale-[35%]' : ''
                          }`}
                        />
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
                          {item.brand}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold ${
                            isSoldOut ? 'text-neutral-400' : 'text-emerald-600'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isSoldOut ? 'bg-neutral-400' : 'bg-emerald-500'
                            }`}
                          />
                          {isSoldOut ? 'Waitlist' : 'In Stock'}
                        </span>
                      </div>

                      <Link
                        to={`/product/${item.slug}`}
                        className="mt-1 block font-display text-sm font-bold text-neutral-950 transition-colors hover:text-[#F04E2A]"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-neutral-500">{item.colorway}</p>

                      <div className="mt-2.5 flex items-baseline gap-2">
                        <span className="font-display text-base font-bold text-neutral-950">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Size Selector + Action Button */}
                  <div className="mt-4 space-y-2.5 border-t border-neutral-100 px-1 pt-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                        Saved Size
                      </span>
                      <select
                        value={item.savedSize}
                        onChange={(e) =>
                          handleChangeSize(item.id, e.target.value)
                        }
                        aria-label={`Saved size for ${item.name}`}
                        className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-bold text-neutral-900 focus:border-neutral-900 focus:outline-none"
                      >
                        {SIZE_CHOICES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isSoldOut ? (
                      <button
                        type="button"
                        onClick={() =>
                          setRestockProduct({
                            id: item.id,
                            brand: item.brand,
                            name: item.name,
                            colorway: item.colorway,
                            image: item.image,
                            defaultSize: item.savedSize,
                          })
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-950 bg-white py-2.5 text-xs font-bold tracking-wider text-neutral-950 uppercase transition-colors hover:bg-neutral-950 hover:text-white"
                      >
                        <Bell className="h-3.5 w-3.5" strokeWidth={2} />
                        <span>Notify When Back</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMoveToBag(item)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
                        <span>Move to Bag</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Restock Alert Modal */}
      <RestockAlertModal
        isOpen={restockProduct !== null}
        product={restockProduct}
        onClose={() => setRestockProduct(null)}
      />
    </div>
  );
}
