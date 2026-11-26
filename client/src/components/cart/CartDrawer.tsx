import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[1px]"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Bag"
    >
      <aside
        className="flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-editorial text-lg font-semibold text-neutral-900">
                Your Bag
              </h2>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-100 px-1.5 text-[11px] font-semibold text-neutral-700">
                {totalCount}
              </span>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close bag"
              className="rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span
                className={
                  hasFreeShipping ? 'text-emerald-600' : 'text-neutral-600'
                }
              >
                {hasFreeShipping
                  ? "You've unlocked FREE Express Shipping!"
                  : `Add $${remainingForFreeShipping.toFixed(2)} more for FREE Express Shipping`}
              </span>
              <span
                className={
                  hasFreeShipping ? 'text-emerald-600' : 'text-neutral-500'
                }
              >
                {shippingProgress}%
              </span>
            </div>

            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="mt-4 font-editorial text-base font-semibold text-neutral-900">
                Your bag is empty
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Add your favorite Stride silhouettes to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((entry) => (
                <div
                  key={entry.key}
                  className="flex gap-3.5 rounded-xl bg-[#F5F5F5] p-3.5"
                >
                  <img
                    src={entry.product.image}
                    alt={entry.product.name}
                    className="h-16 w-16 shrink-0 rounded-lg bg-[#E5E5E7] object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-editorial text-xs font-semibold text-neutral-900 sm:text-[13px]">
                          {entry.product.name}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-neutral-500">
                          {entry.product.color} / {entry.product.size}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(entry.key)}
                        aria-label={`Remove ${entry.product.name}`}
                        className="text-neutral-400 transition-colors hover:text-stride-red"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center rounded-md border border-neutral-200 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.key, -1)}
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-[11px] font-semibold text-neutral-900">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.key, 1)}
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-neutral-900">
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
        <div className="border-t border-neutral-100 bg-white px-6 py-5">
          {/* Promo Code */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code"
              aria-label="Promo code"
              className="flex-1 rounded-md border border-neutral-200 bg-[#F5F5F5] px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-neutral-200/80 px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-300/80"
            >
              Apply
            </button>
          </form>

          {promoMessage && (
            <p
              className={`mt-1.5 text-[11px] ${
                discountRate > 0 ? 'text-emerald-600' : 'text-stride-red'
              }`}
            >
              {promoMessage}
            </p>
          )}

          {/* Totals */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-500">
              <span>Subtotal</span>
              <span className="font-medium text-neutral-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-600">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-neutral-500">
              <span>Estimated Shipping</span>
              <span
                className={
                  estimatedShipping === 0
                    ? 'font-semibold text-emerald-600'
                    : 'font-medium text-neutral-900'
                }
              >
                {estimatedShipping === 0
                  ? 'Free'
                  : `$${estimatedShipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center justify-between text-neutral-500">
              <span>Estimated Tax</span>
              <span className="font-medium text-neutral-900">
                ${estimatedTax.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-base font-bold text-neutral-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#F04E2A] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#D94120] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={items.length === 0}
                className="rounded-md bg-neutral-900 py-2.5 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Apple Pay
              </button>
              <button
                type="button"
                disabled={items.length === 0}
                className="rounded-md bg-neutral-200/80 py-2.5 text-[11px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-300/80 disabled:opacity-50"
              >
                Google Pay
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
