import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CollectionProduct } from '@/data/collectionData';

interface CollectionProductCardProps {
  product: CollectionProduct;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export default function CollectionProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: CollectionProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200/70 bg-white transition-shadow hover:shadow-md">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E5E7]">
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 rounded px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${
              product.badge === 'LOW STOCK'
                ? 'bg-stride-red text-white'
                : 'bg-neutral-900 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-xs backdrop-blur-xs transition-transform hover:scale-105"
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              isWishlisted ? 'fill-stride-red text-stride-red' : ''
            }`}
            strokeWidth={1.8}
          />
        </button>

        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.slug}`} className="block p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            {product.brandLabel}
          </span>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-700">
            <Star className="h-2.5 w-2.5 fill-neutral-900 text-neutral-900" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1 font-editorial text-sm font-semibold text-neutral-900 transition-colors group-hover:text-stride-red">
          {product.name}
        </h3>

        <p className="mt-0.5 text-[11px] text-neutral-500">
          {product.subtitle}
        </p>

        <div className="mt-3.5 flex items-center justify-between">
          <span className="font-editorial text-sm font-semibold text-neutral-900">
            ${product.price}
          </span>

          <div className="flex items-center gap-1.5">
            {product.colors.map((hex, index) => (
              <span
                key={`${product.id}-swatch-${index}`}
                className="h-2.5 w-2.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
