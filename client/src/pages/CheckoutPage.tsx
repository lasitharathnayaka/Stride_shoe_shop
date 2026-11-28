import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Tag,
  Truck,
  Wallet,
  Zap,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { PlacedOrderState } from '@/pages/OrderConfirmationPage';

type DeliveryOption = 'standard' | 'express';
type PaymentTab = 'card' | 'wallet';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalCount, subtotal, clearCart } = useCart();

  // Contact & Shipping state
  const [email, setEmail] = useState('alexander.vance@studio.net');
  const [fullName, setFullName] = useState('Alexander Vance');
  const [street, setStreet] = useState('452 Broome Street, 3rd Floor');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10013');
  const [phone, setPhone] = useState('+1 (212) 555-8392');

  // Delivery & Payment state
  const [delivery, setDelivery] = useState<DeliveryOption>('standard');
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('card');
  const [cardNumber, setCardNumber] = useState('4532 8920 1928 8892');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('•••');

  // Promo state
  const [promoInput, setPromoInput] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const shippingCost = delivery === 'express' ? 15 : 0;
  const discountAmount = subtotal * discountRate;
  const totalDue = Math.max(0, subtotal - discountAmount) + shippingCost;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'STRIDE10') {
      setDiscountRate(0.1);
      setPromoFeedback('STRIDE10 applied — 10% off.');
    } else {
      setDiscountRate(0);
      setPromoFeedback('Invalid code. Try STRIDE10.');
    }
  };

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digitsOnly = cardNumber.replace(/\D/g, '');
    const orderState: PlacedOrderState = {
      orderNumber: `#SH-${Math.floor(10000 + Math.random() * 90000)}`,
      email,
      fullName,
      street,
      city,
      postalCode,
      cardLast4: digitsOnly.slice(-4) || '4821',
      items: [...items],
      subtotal,
      shippingCost,
      total: totalDue,
    };
    clearCart();
    navigate('/order-confirmation', { state: orderState });
  };

  return (
    <div className="bg-[#F5F5F7]">
      {/* Dark Obsidian Checkout Header Banner */}
      <section className="relative overflow-hidden bg-[#09090B] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#F04E2A]/60 to-transparent"
        />

        <div className="mx-auto max-w-6xl px-6 py-9 lg:px-10 lg:py-11">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#F04E2A] uppercase">
                STEP 04 OF 04 • EXPRESS CHECKOUT
              </p>
              <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
                FINALIZE YOUR ACQUISITION
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden items-center gap-2 text-[11px] font-semibold text-neutral-400 sm:flex">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> Bag
                </span>
                <span className="text-white/20">/</span>
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> Shipping
                </span>
                <span className="text-white/20">/</span>
                <span className="text-white">Payment</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-medium text-neutral-200 backdrop-blur-md">
                <Lock className="h-3.5 w-3.5 text-[#F04E2A]" strokeWidth={2} />
                <span>256-Bit Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Checkout Form */}
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12"
        >
          {/* Left Column: Steps 1, 2, 3 */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Contact & Shipping Address */}
            <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 font-mono text-xs font-bold text-white">
                    01
                  </span>
                  <h2 className="font-display text-sm font-bold tracking-wide text-neutral-950 uppercase sm:text-base">
                    Contact &amp; Shipping Address
                  </h2>
                </div>
                <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[9px] font-bold tracking-[0.14em] text-neutral-500 uppercase">
                  REQUIRED
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-[11px] font-bold tracking-wide text-neutral-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 text-xs font-medium text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-[11px] font-bold tracking-wide text-neutral-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 text-xs font-medium text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-street"
                    className="block text-[11px] font-bold tracking-wide text-neutral-700"
                  >
                    Street Address
                  </label>
                  <input
                    id="checkout-street"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 text-xs font-medium text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="block text-[11px] font-bold tracking-wide text-neutral-700"
                    >
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 text-xs font-medium text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-postal"
                      className="block text-[11px] font-bold tracking-wide text-neutral-700"
                    >
                      Postal Code
                    </label>
                    <input
                      id="checkout-postal"
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 text-xs font-medium text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-[11px] font-bold tracking-wide text-neutral-700"
                  >
                    Phone Number (for courier updates)
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 text-xs font-medium text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Delivery Method */}
            <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 font-mono text-xs font-bold text-white">
                  02
                </span>
                <h2 className="font-display text-sm font-bold tracking-wide text-neutral-950 uppercase sm:text-base">
                  Delivery Method
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDelivery('standard')}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    delivery === 'standard'
                      ? 'border-neutral-950 bg-[#FAFAFB] ring-2 ring-[#F04E2A]/20'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-white">
                        <Truck className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-display text-xs font-bold text-neutral-950 uppercase">
                          Standard Archive
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                          3–5 Business Days via Secure Transit
                        </p>
                      </div>
                    </div>
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        delivery === 'standard'
                          ? 'border-[#F04E2A]'
                          : 'border-neutral-300'
                      }`}
                    >
                      {delivery === 'standard' && (
                        <span className="h-2 w-2 rounded-full bg-[#F04E2A]" />
                      )}
                    </span>
                  </div>
                  <span className="mt-4 inline-block self-start rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                    FREE
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDelivery('express')}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    delivery === 'express'
                      ? 'border-neutral-950 bg-[#FAFAFB] ring-2 ring-[#F04E2A]/20'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDECE7] text-[#F04E2A]">
                        <Zap className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-display text-xs font-bold text-neutral-950 uppercase">
                          Express Priority
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                          Next-Day Guaranteed Delivery
                        </p>
                      </div>
                    </div>
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        delivery === 'express'
                          ? 'border-[#F04E2A]'
                          : 'border-neutral-300'
                      }`}
                    >
                      {delivery === 'express' && (
                        <span className="h-2 w-2 rounded-full bg-[#F04E2A]" />
                      )}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-xs font-bold text-neutral-900">
                    $15.00
                  </p>
                </button>
              </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 font-mono text-xs font-bold text-white">
                    03
                  </span>
                  <h2 className="font-display text-sm font-bold tracking-wide text-neutral-950 uppercase sm:text-base">
                    Payment Method
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-neutral-400">
                  <CreditCard className="h-4 w-4" strokeWidth={1.7} />
                  <Wallet className="h-4 w-4" strokeWidth={1.7} />
                </div>
              </div>

              {/* Payment Pill Switcher */}
              <div className="mt-5 inline-flex rounded-xl bg-neutral-100 p-1">
                <button
                  type="button"
                  onClick={() => setPaymentTab('card')}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    paymentTab === 'card'
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('wallet')}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    paymentTab === 'wallet'
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  Digital Wallet
                </button>
              </div>

              {paymentTab === 'card' ? (
                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="checkout-card"
                      className="block text-[11px] font-bold tracking-wide text-neutral-700"
                    >
                      Card Number
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        id="checkout-card"
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-16 pl-4 font-mono text-xs font-semibold text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                      />
                      <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded bg-neutral-950 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white">
                        VISA
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="checkout-expiry"
                        className="block text-[11px] font-bold tracking-wide text-neutral-700"
                      >
                        Expiration Date
                      </label>
                      <input
                        id="checkout-expiry"
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 font-mono text-xs font-semibold text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-cvv"
                        className="block text-[11px] font-bold tracking-wide text-neutral-700"
                      >
                        CVV Security Code
                      </label>
                      <input
                        id="checkout-cvv"
                        type="password"
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] px-4 py-2.5 font-mono text-xs font-semibold text-neutral-950 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="rounded-xl bg-neutral-950 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Pay with Apple Pay
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-neutral-300 bg-[#FAFAFB] py-3 text-xs font-bold text-neutral-900 transition-colors hover:bg-white"
                  >
                    Pay with Google Pay
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Obsidian-Capped Sticky Order Summary */}
          <aside className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm lg:sticky lg:top-24 lg:col-span-5">
            {/* Dark Obsidian Header */}
            <div className="flex items-center justify-between bg-[#09090B] px-6 py-4 text-white">
              <h2 className="font-display text-xs font-bold tracking-[0.18em] uppercase">
                ORDER SUMMARY
              </h2>
              <span className="rounded-full bg-[#F04E2A] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            <div className="p-6">
              {/* Scrollable Summary Items */}
              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-xs text-neutral-500">Your bag is empty.</p>
                  <Link
                    to="/collections"
                    className="mt-3 inline-block text-xs font-bold text-[#F04E2A] underline"
                  >
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <div className="max-h-[290px] divide-y divide-neutral-100 overflow-y-auto pr-1">
                  {items.map((entry) => (
                    <div
                      key={entry.key}
                      className="flex items-center justify-between gap-3 py-3.5 first:pt-0"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={entry.product.image}
                          alt={entry.product.name}
                          className="h-14 w-14 shrink-0 rounded-xl bg-[#ECECEF] object-cover"
                        />
                        <div>
                          <p className="text-[9px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
                            STRIDE LABS
                          </p>
                          <h3 className="mt-0.5 font-display text-xs font-bold text-neutral-950">
                            {entry.product.name}
                          </h3>
                          <span className="mt-1 inline-block rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                            {entry.product.size} • Qty {entry.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="font-display text-xs font-bold text-neutral-950">
                        ${(entry.product.price * entry.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo or Archive Code */}
              <div className="mt-4 flex gap-2 border-t border-neutral-100 pt-4">
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (STRIDE10)"
                    aria-label="Promo or Archive Code"
                    className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-3 pl-9 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="rounded-xl bg-neutral-950 px-4 py-2.5 text-[10px] font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
                >
                  Apply
                </button>
              </div>

              {promoFeedback && (
                <p
                  className={`mt-1.5 text-[11px] font-medium ${
                    discountRate > 0 ? 'text-emerald-600' : 'text-[#F04E2A]'
                  }`}
                >
                  {promoFeedback}
                </p>
              )}

              {/* Totals */}
              <div className="mt-5 space-y-2.5 border-t border-neutral-100 pt-4 text-xs">
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between font-medium text-emerald-600">
                    <span>Archive Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-500">
                  <span>Estimated Shipping</span>
                  <span
                    className={
                      shippingCost === 0
                        ? 'font-bold text-emerald-600 uppercase'
                        : 'font-semibold text-neutral-900'
                    }
                  >
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-500">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-neutral-600">
                    Calculated at step
                  </span>
                </div>

                <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3.5">
                  <span className="font-display text-xs font-bold text-neutral-950 uppercase">
                    Total Due
                  </span>
                  <span className="font-display text-2xl font-bold text-neutral-950">
                    ${totalDue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={items.length === 0}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-all hover:bg-[#D94120] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Place Order — ${totalDue.toFixed(2)}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-medium text-neutral-400">
                <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" />
                <span>Free 30-Day Size Exchanges • 2-Year Carbon Warranty</span>
              </div>

              <p className="mt-3 text-center text-[10px] leading-relaxed text-neutral-400">
                By placing your order, you agree to STRIDE&apos;s{' '}
                <a href="#terms" className="underline hover:text-neutral-800">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="underline hover:text-neutral-800">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
