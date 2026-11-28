import { useState } from 'react';
import { Check, Heart, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CollectionProduct } from '@/data/collectionData';
import { useCart } from '@/context/CartContext';

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
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'US 10',
      color: product.colorNames[0] ?? 'Standard',
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-black/[0.06]">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#ECECEF]">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 z-10 rounded-md px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] uppercase shadow-xs ${
              product.badge === 'LOW STOCK'
                ? 'bg-[#F04E2A] text-white'
                : 'bg-neutral-950 text-white'
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
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-xs backdrop-blur-xs transition-transform hover:scale-110"
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              isWishlisted ? 'fill-[#F04E2A] text-[#F04E2A]' : ''
            }`}
            strokeWidth={1.9}
          />
        </button>

        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Slide-Up Quick Add Bar on Hover */}
        <div className="absolute right-3 bottom-3 left-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md transition-colors ${
              justAdded
                ? 'bg-emerald-600'
                : 'bg-neutral-950/90 hover:bg-[#F04E2A]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Quick Add — US 10</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.slug}`} className="block p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
            {product.brandLabel}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-800">
            <Star className="h-2.5 w-2.5 fill-neutral-900 text-neutral-900" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-sm font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-[#F04E2A] sm:text-[15px]">
          {product.name}
        </h3>

        <p className="mt-0.5 text-xs text-neutral-500">{product.subtitle}</p>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3.5">
          <span className="font-display text-base font-bold text-neutral-950">
            ${product.price}.00
          </span>

          <div className="flex items-center gap-1.5">
            {product.colors.map((hex, index) => (
              <span
                key={`${product.id}-swatch-${index}`}
                className="h-3 w-3 rounded-full border border-neutral-300 shadow-2xs"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
