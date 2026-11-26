import { Link, useLocation } from 'react-router-dom';
import { Check, Download, Truck } from 'lucide-react';
import type { CartEntry } from '@/context/CartContext';

export interface PlacedOrderState {
  orderNumber: string;
  email: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  cardLast4: string;
  items: CartEntry[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

const FALLBACK_ORDER: PlacedOrderState = {
  orderNumber: '#SH-90412',
  email: 'alexander.vance@studio.net',
  fullName: 'Alexander Vance',
  street: '452 Broome Street',
  city: 'New York, NY',
  postalCode: '10013',
  cardLast4: '4821',
  items: [
    {
      key: 'fallback-1',
      product: {
        id: 'apex-runner-v1',
        name: 'Apex Runner V1',
        price: 185.0,
        image: '/images/cat-running.jpg',
        size: 'US 9.5',
        color: 'Solar Coral',
      },
      quantity: 1,
    },
    {
      key: 'fallback-2',
      product: {
        id: 'knit-low-profile',
        name: 'Knit Low-Profile',
        price: 160.0,
        image: '/images/prod-kinetic.jpg',
        size: 'US 10.5',
        color: 'Obsidian',
      },
      quantity: 1,
    },
  ],
  subtotal: 345.0,
  shippingCost: 0,
  total: 345.0,
};

export default function OrderConfirmationPage() {
  const location = useLocation();
  const state = (location.state as PlacedOrderState | null) ?? FALLBACK_ORDER;
  const order = state.items && state.items.length > 0 ? state : FALLBACK_ORDER;

  return (
    <div className="bg-[#FAFAFA] py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Top Confirmation Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5F7EE]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
            </span>
          </div>

          <h1 className="mt-4 text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
            Order Confirmed — Thank You!
          </h1>

          <p className="mt-1 text-xs text-neutral-500">
            Order {order.orderNumber} • Confirmation sent to {order.email}
          </p>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-800 shadow-xs transition-colors hover:bg-neutral-50 print:hidden"
          >
            <Download className="h-3.5 w-3.5 text-neutral-600" strokeWidth={1.8} />
            <span>Download Invoice (PDF)</span>
          </button>
        </div>

        {/* 2-Column Details Grid */}
        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Left Column: Map + Progress + Shipping/Payment */}
          <div className="space-y-5 lg:col-span-7">
            {/* Map & Tracking Card */}
            <section className="rounded-xl bg-[#F3F3F5] p-5">
              {/* Stylized Vector Transit Map */}
              <div className="relative overflow-hidden rounded-lg border border-neutral-200/70 bg-[#E8F0F4]">
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-neutral-800 shadow-xs backdrop-blur-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Estimated Delivery: Tomorrow by 6:00 PM</span>
                </div>

                <svg
                  viewBox="0 0 600 260"
                  className="h-52 w-full object-cover sm:h-56"
                  role="img"
                  aria-label="Shipment route map from Secaucus Hub to New York Destination"
                >
                  {/* Land & Water Base */}
                  <rect width="600" height="260" fill="#EDF1F2" />
                  {/* Hudson River */}
                  <path
                    d="M365,0 C358,70 350,140 335,260 L388,260 C398,150 406,70 415,0 Z"
                    fill="#BFE0F5"
                  />
                  {/* Hackensack River */}
                  <path
                    d="M175,0 C165,90 155,175 130,260 L150,260 C172,175 182,90 192,0 Z"
                    fill="#C9E6F7"
                  />
                  {/* Central Park */}
                  <rect
                    x="470"
                    y="10"
                    width="58"
                    height="115"
                    rx="4"
                    fill="#CDE9C8"
                    transform="rotate(8 470 10)"
                  />
                  {/* Laurel Hill Park */}
                  <ellipse cx="148" cy="195" rx="42" ry="26" fill="#D5EDD0" />

                  {/* Road Grid Lines */}
                  <g stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9">
                    <path d="M0,75 L600,55" />
                    <path d="M0,135 L600,120" />
                    <path d="M0,198 L600,185" />
                    <path d="M95,0 L120,260" />
                    <path d="M245,0 L268,260" />
                    <path d="M435,0 L418,260" />
                    <path d="M510,0 L495,260" />
                  </g>

                  {/* Highway Accent */}
                  <path
                    d="M40,260 Q180,175 300,135 T560,70"
                    stroke="#F4D799"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.7"
                  />

                  {/* Curved Dashed Delivery Route */}
                  <path
                    d="M125,205 Q255,75 425,112"
                    stroke="#B91C0C"
                    strokeWidth="3"
                    strokeDasharray="7 6"
                    fill="none"
                  />

                  {/* Secaucus Hub Pin */}
                  <circle cx="152" cy="112" r="9" fill="#111111" opacity="0.14" />
                  <circle cx="152" cy="112" r="5.5" fill="#111111" />
                  <rect
                    x="102"
                    y="122"
                    width="98"
                    height="20"
                    rx="4"
                    fill="#FFFFFF"
                    opacity="0.92"
                  />
                  <text
                    x="151"
                    y="135"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill="#262626"
                  >
                    Secaucus Hub
                  </text>

                  {/* New York Destination Pin */}
                  <circle cx="425" cy="112" r="13" fill="#B91C0C" opacity="0.18" />
                  <circle cx="425" cy="112" r="6.5" fill="#B91C0C" />
                  <rect
                    x="362"
                    y="124"
                    width="126"
                    height="20"
                    rx="4"
                    fill="#FFFFFF"
                    opacity="0.95"
                  />
                  <text
                    x="425"
                    y="137"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill="#262626"
                  >
                    New York Destination
                  </text>

                  {/* Subtle Map Labels */}
                  <text
                    x="468"
                    y="196"
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="1.6"
                    fill="#737373"
                    opacity="0.75"
                  >
                    MANHATTAN
                  </text>
                  <text
                    x="255"
                    y="98"
                    fontSize="9"
                    fill="#737373"
                    opacity="0.8"
                  >
                    Secaucus
                  </text>
                </svg>
              </div>

              {/* Courier Meta Row */}
              <div className="mt-4 flex items-center justify-between border-b border-neutral-200/80 pb-4 text-xs">
                <div className="flex items-center gap-2 font-medium text-neutral-800">
                  <Truck className="h-4 w-4 text-neutral-700" strokeWidth={1.8} />
                  <span>
                    DHL Express •{' '}
                    <span className="font-bold">#DHL-9928104</span>
                  </span>
                </div>
                <span className="font-semibold text-emerald-600">In Transit</span>
              </div>

              {/* 4-Step Progress Bar */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                {/* Step 1: Order Placed */}
                <div className="relative">
                  <div className="flex items-center">
                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    <div className="ml-2 h-0.5 flex-1 bg-emerald-500" />
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-neutral-800">
                    Order Placed
                  </p>
                </div>

                {/* Step 2: Packed */}
                <div className="relative">
                  <div className="flex items-center">
                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F04E2A] text-[10px] font-bold text-white shadow-[0_0_10px_rgba(240,78,42,0.45)]">
                      2
                    </span>
                    <div className="ml-2 h-0.5 flex-1 bg-neutral-300" />
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-neutral-900">
                    Packed
                  </p>
                </div>

                {/* Step 3: Out for Delivery */}
                <div className="relative">
                  <div className="flex items-center">
                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-500">
                      3
                    </span>
                    <div className="ml-2 h-0.5 flex-1 bg-neutral-300" />
                  </div>
                  <p className="mt-2 text-[10px] font-medium text-neutral-400">
                    Out for Delivery
                  </p>
                </div>

                {/* Step 4: Delivered */}
                <div className="relative">
                  <div className="flex items-center">
                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-500">
                      4
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] font-medium text-neutral-400">
                    Delivered
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping Address & Payment Method Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F3F3F5] p-5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  SHIPPING ADDRESS
                </p>
                <p className="mt-2 text-xs font-bold text-neutral-900">
                  {order.fullName}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  {order.street}
                  <br />
                  {order.city} {order.postalCode}
                </p>
              </div>

              <div className="rounded-xl bg-[#F3F3F5] p-5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  PAYMENT METHOD
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">
                    VISA
                  </span>
                  <span className="text-xs font-bold text-neutral-900">
                    Ending in {order.cardLast4}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Billing address same as shipping
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="rounded-xl border border-neutral-200/80 bg-white p-6 lg:col-span-5">
            <h2 className="text-sm font-bold text-neutral-900 sm:text-base">
              Order Summary
            </h2>

            <div className="mt-4 divide-y divide-neutral-100">
              {order.items.map((entry) => (
                <div
                  key={entry.key}
                  className="flex items-center justify-between gap-3 py-3.5"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={entry.product.image}
                      alt={entry.product.name}
                      className="h-14 w-14 shrink-0 rounded-lg bg-[#F4F4F5] object-cover"
                    />
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                        STRIDE STUDIO
                      </p>
                      <h3 className="mt-0.5 text-xs font-bold text-neutral-900">
                        {entry.product.name}
                      </h3>
                      <p className="mt-0.5 text-[10px] text-neutral-500">
                        {entry.product.size} • {entry.product.color}
                      </p>
                      <p className="mt-1 text-[10px] font-medium text-neutral-600">
                        Qty: {entry.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="self-end text-xs font-bold text-neutral-900">
                    ${(entry.product.price * entry.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-3 space-y-2 border-t border-neutral-100 pt-4 text-xs">
              <div className="flex items-center justify-between text-neutral-500">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-500">
                <span>Express Shipping</span>
                <span className="font-semibold text-emerald-600 uppercase">
                  {order.shippingCost === 0
                    ? 'FREE'
                    : `$${order.shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-500">
                <span>Estimated Tax</span>
                <span className="font-semibold text-neutral-900">$0.00</span>
              </div>

              <div className="flex items-baseline justify-between border-t border-neutral-100 pt-4">
                <span className="text-sm font-bold text-neutral-900">Total</span>
                <span className="text-xl font-bold text-neutral-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/collections"
              className="mt-6 flex w-full items-center justify-center rounded-md bg-[#F04E2A] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#D94120] print:hidden"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
