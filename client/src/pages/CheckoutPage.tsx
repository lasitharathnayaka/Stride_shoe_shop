import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CreditCard,
  Lock,
  Wallet,
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
    <div className="bg-[#FAFAFA] py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
              STEP 04 OF 04
            </p>
            <h1 className="mt-1 font-editorial text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Finalize Your Acquisition
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-md bg-[#F0F0F2] px-3.5 py-2 text-[11px] font-medium text-neutral-600 sm:self-auto">
            <Lock className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.8} />
            <span>Secure 256-Bit Encrypted Checkout</span>
          </div>
        </div>

        {/* Main 2-Column Checkout Form */}
        <form
          onSubmit={handlePlaceOrder}
          className="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-12"
        >
          {/* Left Column: Steps 1, 2, 3 */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Contact & Shipping Address */}
            <section className="rounded-xl bg-[#F3F3F5] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-bold text-white">
                    1
                  </span>
                  <h2 className="font-editorial text-sm font-semibold text-neutral-900 sm:text-base">
                    Contact &amp; Shipping Address
                  </h2>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                  REQUIRED
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-[11px] font-medium text-neutral-600"
                  >
                    Email Address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-[11px] font-medium text-neutral-600"
                  >
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-street"
                    className="block text-[11px] font-medium text-neutral-600"
                  >
                    Street Address
                  </label>
                  <input
                    id="checkout-street"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-city"
                      className="block text-[11px] font-medium text-neutral-600"
                    >
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-postal"
                      className="block text-[11px] font-medium text-neutral-600"
                    >
                      Postal Code
                    </label>
                    <input
                      id="checkout-postal"
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-[11px] font-medium text-neutral-600"
                  >
                    Phone Number (for courier updates)
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Delivery Method */}
            <section className="rounded-xl bg-[#F3F3F5] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-bold text-white">
                  2
                </span>
                <h2 className="font-editorial text-sm font-semibold text-neutral-900 sm:text-base">
                  Delivery Method
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDelivery('standard')}
                  className={`flex flex-col justify-between rounded-lg border bg-white p-4 text-left transition-all ${
                    delivery === 'standard'
                      ? 'border-neutral-900 ring-1 ring-neutral-900'
                      : 'border-neutral-200/80 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-editorial text-xs font-semibold text-neutral-900">
                        Standard Archive
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                        3–5 Business Days via Secure Transit
                      </p>
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
                  <p className="mt-4 text-[11px] font-bold tracking-wide text-neutral-900 uppercase">
                    FREE
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDelivery('express')}
                  className={`flex flex-col justify-between rounded-lg border bg-white p-4 text-left transition-all ${
                    delivery === 'express'
                      ? 'border-neutral-900 ring-1 ring-neutral-900'
                      : 'border-neutral-200/80 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-editorial text-xs font-semibold text-neutral-900">
                        Express Priority
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                        Next-Day Guaranteed Delivery
                      </p>
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
                  <p className="mt-4 text-[11px] font-semibold text-neutral-700">
                    $15.00
                  </p>
                </button>
              </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="rounded-xl bg-[#F3F3F5] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-bold text-white">
                    3
                  </span>
                  <h2 className="font-editorial text-sm font-semibold text-neutral-900 sm:text-base">
                    Payment Method
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-neutral-500">
                  <CreditCard className="h-4 w-4" strokeWidth={1.7} />
                  <Wallet className="h-4 w-4" strokeWidth={1.7} />
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="mt-4 flex items-center gap-6 border-b border-neutral-200/90">
                <button
                  type="button"
                  onClick={() => setPaymentTab('card')}
                  className={`border-b-2 pb-2.5 text-xs font-semibold transition-colors ${
                    paymentTab === 'card'
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('wallet')}
                  className={`border-b-2 pb-2.5 text-xs font-semibold transition-colors ${
                    paymentTab === 'wallet'
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
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
                      className="block text-[11px] font-medium text-neutral-600"
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
                        className="w-full rounded-md border border-neutral-200/80 bg-white py-2.5 pr-16 pl-3.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                      />
                      <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-neutral-600">
                        VISA
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="checkout-expiry"
                        className="block text-[11px] font-medium text-neutral-600"
                      >
                        Expiration Date
                      </label>
                      <input
                        id="checkout-expiry"
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-cvv"
                        className="block text-[11px] font-medium text-neutral-600"
                      >
                        CVV Security Code
                      </label>
                      <input
                        id="checkout-cvv"
                        type="password"
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-neutral-200/80 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="rounded-md bg-neutral-900 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Pay with Apple Pay
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-neutral-300 bg-white py-3 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                  >
                    Pay with Google Pay
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="rounded-xl bg-[#F3F3F5] p-6 lg:sticky lg:top-24 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
              <h2 className="font-editorial text-sm font-semibold text-neutral-900 sm:text-base">
                Order Summary
              </h2>
              <span className="text-[11px] font-medium text-neutral-500">
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            {/* Summary Items */}
            {items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs text-neutral-500">Your bag is empty.</p>
                <Link
                  to="/collections"
                  className="mt-3 inline-block text-xs font-semibold text-stride-red underline"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-neutral-200/60 py-2">
                {items.map((entry) => (
                  <div
                    key={entry.key}
                    className="flex items-center justify-between gap-3 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.product.image}
                        alt={entry.product.name}
                        className="h-14 w-14 shrink-0 rounded-lg bg-[#E5E5E7] object-cover"
                      />
                      <div>
                        <p className="text-[9px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                          STRIDE LABS
                        </p>
                        <h3 className="mt-0.5 font-editorial text-xs font-semibold text-neutral-900">
                          {entry.product.name}
                        </h3>
                        <span className="mt-1 inline-block rounded bg-neutral-200/80 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                          Size: {entry.product.size} • Qty {entry.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-neutral-900">
                      ${(entry.product.price * entry.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Promo or Archive Code */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo or Archive Code"
                aria-label="Promo or Archive Code"
                className="flex-1 rounded-md border border-neutral-200/80 bg-white px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="rounded-md bg-neutral-900 px-4 py-2 text-[10px] font-bold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
              >
                APPLY
              </button>
            </div>

            {promoFeedback && (
              <p
                className={`mt-1.5 text-[11px] ${
                  discountRate > 0 ? 'text-emerald-600' : 'text-stride-red'
                }`}
              >
                {promoFeedback}
              </p>
            )}

            {/* Totals */}
            <div className="mt-5 space-y-2.5 border-t border-neutral-200/80 pt-4 text-xs">
              <div className="flex items-center justify-between text-neutral-500">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Archive Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-neutral-500">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-neutral-900 uppercase">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-500">
                <span>Estimated Tax</span>
                <span className="font-medium text-neutral-700">
                  Calculated at step
                </span>
              </div>

              <div className="flex items-baseline justify-between border-t border-neutral-200/80 pt-3.5">
                <span className="text-xs font-semibold text-neutral-900">
                  Total Due
                </span>
                <span className="font-editorial text-xl font-bold text-neutral-900">
                  ${totalDue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={items.length === 0}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-[#F04E2A] py-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#D94120] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Place Order — ${totalDue.toFixed(2)}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <p className="mt-4 text-center text-[10px] leading-relaxed text-neutral-500">
              By placing your order, you agree to STRIDE&apos;s{' '}
              <a href="#terms" className="underline hover:text-neutral-900">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline hover:text-neutral-900">
                Privacy Policy
              </a>
              . All archive sales are final.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
