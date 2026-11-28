import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CreditCard,
  Download,
  MapPin,
  Package,
  Truck,
} from 'lucide-react';
import type { CartEntry } from '@/context/CartContext';
import { downloadOrderInvoicePdf } from '@/utils/generateInvoicePdf';

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

  const totalItems = order.items.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="bg-[#F5F5F7]">
      {/* Dark Obsidian Confirmation Hero */}
      <section className="relative overflow-hidden bg-[#09090B] py-12 text-white lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#F04E2A]/60 to-transparent"
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center lg:px-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-neutral-950">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
          </div>

          <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
            ORDER CONFIRMED • {order.orderNumber}
          </p>

          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-4xl">
            THANK YOU FOR YOUR ORDER
          </h1>

          <p className="mt-2 max-w-md text-xs text-neutral-400 sm:text-sm">
            A digital receipt and live courier tracking updates have been sent
            to <span className="font-semibold text-white">{order.email}</span>.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <button
              type="button"
              onClick={() => downloadOrderInvoicePdf(order)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-neutral-950"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              <span>Download Invoice (PDF)</span>
            </button>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F04E2A] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-colors hover:bg-[#D94120]"
            >
              <Package className="h-3.5 w-3.5" />
              <span>Track in Member Portal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main 2-Column Confirmation Content */}
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          {/* Left Column: Map + Progress + Shipping/Payment */}
          <div className="space-y-6 lg:col-span-7">
            {/* Map & Tracking Card */}
            <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs sm:p-6">
              {/* Stylized Vector Transit Map */}
              <div className="relative overflow-hidden rounded-xl border border-neutral-200/80 bg-[#E8F0F4]">
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/95 px-3.5 py-1.5 text-[11px] font-bold text-neutral-900 shadow-sm backdrop-blur-xs">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span>Estimated Delivery: Tomorrow by 6:00 PM</span>
                </div>

                <svg
                  viewBox="0 0 600 260"
                  className="h-52 w-full object-cover sm:h-56"
                  role="img"
                  aria-label="Shipment route map from Secaucus Hub to New York Destination"
                >
                  <rect width="600" height="260" fill="#EDF1F2" />
                  <path
                    d="M365,0 C358,70 350,140 335,260 L388,260 C398,150 406,70 415,0 Z"
                    fill="#BFE0F5"
                  />
                  <path
                    d="M175,0 C165,90 155,175 130,260 L150,260 C172,175 182,90 192,0 Z"
                    fill="#C9E6F7"
                  />
                  <rect
                    x="470"
                    y="10"
                    width="58"
                    height="115"
                    rx="4"
                    fill="#CDE9C8"
                    transform="rotate(8 470 10)"
                  />
                  <ellipse cx="148" cy="195" rx="42" ry="26" fill="#D5EDD0" />

                  <g stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9">
                    <path d="M0,75 L600,55" />
                    <path d="M0,135 L600,120" />
                    <path d="M0,198 L600,185" />
                    <path d="M95,0 L120,260" />
                    <path d="M245,0 L268,260" />
                    <path d="M435,0 L418,260" />
                    <path d="M510,0 L495,260" />
                  </g>

                  <path
                    d="M40,260 Q180,175 300,135 T560,70"
                    stroke="#F4D799"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.7"
                  />

                  <path
                    d="M125,205 Q255,75 425,112"
                    stroke="#F04E2A"
                    strokeWidth="3.2"
                    strokeDasharray="7 6"
                    fill="none"
                  />

                  <circle cx="152" cy="112" r="9" fill="#111111" opacity="0.14" />
                  <circle cx="152" cy="112" r="5.5" fill="#111111" />
                  <rect
                    x="102"
                    y="122"
                    width="98"
                    height="20"
                    rx="4"
                    fill="#FFFFFF"
                    opacity="0.95"
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

                  <circle cx="425" cy="112" r="14" fill="#F04E2A" opacity="0.2" />
                  <circle cx="425" cy="112" r="6.5" fill="#F04E2A" />
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
                </svg>
              </div>

              {/* Courier Meta Row */}
              <div className="mt-5 flex items-center justify-between border-b border-neutral-100 pb-4 text-xs">
                <div className="flex items-center gap-2.5 font-medium text-neutral-800">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-white">
                    <Truck className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-bold text-neutral-950">DHL Express</p>
                    <p className="font-mono text-[10px] text-neutral-400">
                      #DHL-9928104
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                  In Transit
                </span>
              </div>

              {/* 4-Step Progress Bar */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                <div>
                  <div className="flex items-center">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    <div className="ml-2 h-0.5 flex-1 bg-emerald-500" />
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-neutral-900">
                    Order Placed
                  </p>
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F04E2A] text-[10px] font-bold text-white shadow-[0_0_12px_rgba(240,78,42,0.5)]">
                      2
                    </span>
                    <div className="ml-2 h-0.5 flex-1 bg-neutral-200" />
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-[#F04E2A]">
                    Packed
                  </p>
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-400">
                      3
                    </span>
                    <div className="ml-2 h-0.5 flex-1 bg-neutral-200" />
                  </div>
                  <p className="mt-2 text-[10px] font-medium text-neutral-400">
                    Out for Delivery
                  </p>
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-400">
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
              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className="h-3.5 w-3.5 text-[#F04E2A]" />
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase">
                    SHIPPING ADDRESS
                  </p>
                </div>
                <p className="mt-3 font-display text-sm font-bold text-neutral-950">
                  {order.fullName}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  {order.street}
                  <br />
                  {order.city} {order.postalCode}
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-2 text-neutral-400">
                  <CreditCard className="h-3.5 w-3.5 text-[#F04E2A]" />
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase">
                    PAYMENT METHOD
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded bg-neutral-950 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white">
                    VISA
                  </span>
                  <span className="font-display text-sm font-bold text-neutral-950">
                    Ending in {order.cardLast4}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Billing address same as shipping
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Obsidian-Capped Order Summary */}
          <aside className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm lg:col-span-5">
            <div className="flex items-center justify-between bg-[#09090B] px-6 py-4 text-white">
              <h2 className="font-display text-xs font-bold tracking-[0.18em] uppercase">
                ORDER SUMMARY
              </h2>
              <span className="rounded-full bg-[#F04E2A] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            <div className="p-6">
              <div className="max-h-[300px] divide-y divide-neutral-100 overflow-y-auto pr-1">
                {order.items.map((entry) => (
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
                          STRIDE STUDIO
                        </p>
                        <h3 className="mt-0.5 font-display text-xs font-bold text-neutral-950">
                          {entry.product.name}
                        </h3>
                        <p className="mt-0.5 text-[10px] text-neutral-500">
                          {entry.product.size} • {entry.product.color}
                        </p>
                        <p className="mt-0.5 text-[10px] font-semibold text-neutral-600">
                          Qty: {entry.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="self-end font-display text-xs font-bold text-neutral-950">
                      ${(entry.product.price * entry.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-xs">
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-500">
                  <span>Express Shipping</span>
                  <span className="font-bold text-emerald-600 uppercase">
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
                  <span className="font-display text-xs font-bold text-neutral-950 uppercase">
                    Total Paid
                  </span>
                  <span className="font-display text-2xl font-bold text-neutral-950">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/collections"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-colors hover:bg-[#D94120] print:hidden"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
