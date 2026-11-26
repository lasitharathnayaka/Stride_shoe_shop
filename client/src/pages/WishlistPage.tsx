import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Heart, Share2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import RestockAlertModal, {
  type RestockProduct,
} from '@/components/product/RestockAlertModal';

interface WishlistItem {
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

export default function WishlistPage() {
  const { addToCart, openCart } = useCart();
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [restockProduct, setRestockProduct] = useState<RestockProduct | null>(
    null
  );
  const [copiedShare, setCopiedShare] = useState(false);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
    const inStock = items.filter((item) => item.status !== 'sold-out');
    inStock.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.savedSize,
        color: item.colorway,
      });
    });
    if (inStock.length > 0) openCart();
  };

  const handleShare = () => {
    setCopiedShare(true);
    window.setTimeout(() => setCopiedShare(false), 1800);
  };

  return (
    <div className="bg-[#FAFAFA] py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
              CURATED COLLECTION / {items.length} PAIRS SAVED
            </p>
            <h1 className="mt-1 font-editorial text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Saved Wishlist
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <Share2 className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>{copiedShare ? 'Link Copied!' : 'Share Wishlist'}</span>
            </button>

            <button
              type="button"
              onClick={handleMoveAllToBag}
              className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>Move All to Bag</span>
            </button>
          </div>
        </div>

        {/* Wishlist Cards Grid */}
        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-neutral-200/80 bg-white py-16 text-center">
            <p className="font-editorial text-lg font-semibold text-neutral-900">
              Your wishlist is empty
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Save your favorite pairs to track price drops and restocks.
            </p>
            <Link
              to="/collections"
              className="mt-5 inline-block rounded-md bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const isSoldOut = item.status === 'sold-out';
              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-neutral-200/70 bg-white p-3.5 transition-shadow hover:shadow-md"
                >
                  {/* Image Box */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#EAEAEF]">
                    {item.badgeText && (
                      <span
                        className={`absolute top-2.5 left-2.5 z-10 rounded px-2.5 py-1 text-[10px] font-bold ${
                          item.status === 'price-drop'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-900/85 text-white'
                        }`}
                      >
                        {item.badgeText}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stride-red shadow-xs transition-transform hover:scale-105"
                    >
                      <Heart className="h-4 w-4 fill-stride-red" strokeWidth={1.8} />
                    </button>

                    <Link
                      to={`/product/${item.slug}`}
                      className="block h-full w-full"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          isSoldOut ? 'opacity-75 grayscale-[30%]' : ''
                        }`}
                      />
                    </Link>

                    <span className="absolute bottom-2.5 left-2.5 rounded bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-neutral-800 backdrop-blur-xs">
                      Saved Size: {item.savedSize}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="mt-3.5">
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                      {item.brand}
                    </p>
                    <Link
                      to={`/product/${item.slug}`}
                      className="mt-0.5 block font-editorial text-sm font-semibold text-neutral-900 hover:text-stride-red"
                    >
                      {item.name} • {item.colorway}
                    </Link>

                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-xs font-bold text-neutral-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[11px] text-neutral-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
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
                        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-900 bg-white py-2.5 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                      >
                        <Bell className="h-3.5 w-3.5" strokeWidth={1.8} />
                        <span>Notify When Back</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleMoveToBag(item)}
                        className="mt-4 w-full rounded-md bg-neutral-900 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        Move to Bag
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
