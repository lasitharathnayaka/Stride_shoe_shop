import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 150;
const TAX_RATE = 0.07;

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    totalCount,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const discountAmount = subtotal * discountRate;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const hasFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(
    100,
    Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  );

  const estimatedShipping = items.length === 0 || hasFreeShipping ? 0 : 15;
  const estimatedTax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + estimatedShipping + estimatedTax;

  const handleApplyPromo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'STRIDE10') {
      setDiscountRate(0.1);
      setPromoMessage('STRIDE10 applied — 10% off your order.');
    } else {
      setDiscountRate(0);
      setPromoMessage('Invalid promo code. Try STRIDE10.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Bag"
    >
      <aside
        className="flex h-full w-full max-w-[430px] flex-col bg-[#F5F5F7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark Obsidian Header matching site theme */}
        <div className="relative bg-[#09090B] px-6 pt-5 pb-5 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#F04E2A]/60 to-transparent"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag
                className="h-4 w-4 text-[#F04E2A]"
                strokeWidth={2.2}
              />
              <h2 className="font-display text-sm font-bold tracking-[0.18em] uppercase">
                YOUR BAG
              </h2>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F04E2A] px-1.5 font-mono text-[10px] font-bold text-white">
                {totalCount}
              </span>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close bag"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-neutral-300 transition-colors hover:border-[#F04E2A] hover:bg-[#F04E2A] hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {/* Free Express Shipping Progress Bar */}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
              <span
                className={`inline-flex items-center gap-1.5 ${
                  hasFreeShipping ? 'text-emerald-400' : 'text-neutral-300'
                }`}
              >
                <Truck className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {hasFreeShipping
                    ? 'FREE Express Shipping Unlocked'
                    : `Add $${remainingForFreeShipping.toFixed(2)} for FREE Shipping`}
                </span>
              </span>
              <span
                className={`font-mono text-[10px] font-bold ${
                  hasFreeShipping ? 'text-emerald-400' : 'text-neutral-400'
                }`}
              >
                {shippingProgress}%
              </span>
            </div>

            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  hasFreeShipping
                    ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                    : 'bg-[#F04E2A]'
                }`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-neutral-400 shadow-xs">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-sm font-bold text-neutral-950 uppercase">
                Your bag is empty
              </p>
              <p className="mt-1 max-w-xs text-xs text-neutral-500">
                Add your favorite Stride silhouettes to unlock express checkout.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/collections');
                }}
                className="mt-5 rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((entry) => (
                <div
                  key={entry.key}
                  className="flex gap-4 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs transition-shadow hover:shadow-sm"
                >
                  <img
                    src={entry.product.image}
                    alt={entry.product.name}
                    className="h-[74px] w-[74px] shrink-0 rounded-xl bg-[#ECECEF] object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-xs font-bold text-neutral-950 sm:text-sm">
                          {entry.product.name}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                            {entry.product.color}
                          </span>
                          <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-800">
                            {entry.product.size}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(entry.key)}
                        aria-label={`Remove ${entry.product.name}`}
                        className="rounded-md p-1 text-neutral-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center rounded-lg border border-neutral-200 bg-[#FAFAFB]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.key, -1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-950"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-7 text-center font-mono text-xs font-bold text-neutral-950">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.key, 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-950"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-display text-sm font-bold text-neutral-950">
                        ${(entry.product.price * entry.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Checkout Footer */}
        <div className="border-t border-neutral-200/80 bg-white px-6 py-5 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.08)]">
          {/* Promo Code */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (try STRIDE10)"
                aria-label="Promo code"
                className="w-full rounded-xl border border-neutral-200 bg-[#F5F5F7] py-2.5 pr-3 pl-9 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-neutral-950 px-4 py-2.5 text-[11px] font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
            >
              Apply
            </button>
          </form>

          {promoMessage && (
            <p
              className={`mt-1.5 text-[11px] font-medium ${
                discountRate > 0 ? 'text-emerald-600' : 'text-[#F04E2A]'
              }`}
            >
              {promoMessage}
            </p>
          )}

          {/* Totals */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-500">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between font-medium text-emerald-600">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-neutral-500">
              <span>Estimated Shipping</span>
              <span
                className={
                  estimatedShipping === 0
                    ? 'font-bold text-emerald-600 uppercase'
                    : 'font-semibold text-neutral-900'
                }
              >
                {estimatedShipping === 0
                  ? 'Free'
                  : `$${estimatedShipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-500">
              <span>Estimated Tax</span>
              <span className="font-semibold text-neutral-900">
                ${estimatedTax.toFixed(2)}
              </span>
            </div>

            <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3">
              <span className="font-display text-sm font-bold text-neutral-950 uppercase">
                Total
              </span>
              <span className="font-display text-xl font-bold text-neutral-950">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Actions */}
          <div className="mt-4 space-y-2.5">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-all hover:bg-[#D94120] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className="rounded-xl bg-neutral-950 py-2.5 text-[11px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Apple Pay
              </button>
              <button
                type="button"
                disabled={items.length === 0}
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                className="rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 text-[11px] font-bold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-white disabled:opacity-50"
              >
                Google Pay
              </button>
            </div>

            <p className="flex items-center justify-center gap-1.5 pt-1 text-[10px] font-medium text-neutral-400">
              <Lock className="h-3 w-3" />
              <span>256-Bit Encrypted • Free 30-Day Returns</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
