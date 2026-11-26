import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Heart,
  MapPin,
  Send,
  Truck,
  User,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

type DashboardTab = 'orders' | 'wishlist' | 'addresses' | 'profile';

interface PastOrder {
  id: string;
  productId: string;
  slug: string;
  name: string;
  orderNumber: string;
  deliveredDate: string;
  price: number;
  image: string;
  size: string;
}

const PAST_ORDERS: PastOrder[] = [
  {
    id: 'past-1',
    productId: 'kinetics-runner-prime',
    slug: 'kinetics-speed-2',
    name: 'Kinetics Runner Prime',
    orderNumber: '#SH-7412',
    deliveredDate: 'Oct 12, 2024',
    price: 210.0,
    image: '/images/prod-vapor-x.jpg',
    size: 'US 9.5',
  },
  {
    id: 'past-2',
    productId: 'chromic-court-high',
    slug: 'prod-apex-court',
    name: 'Chromic Court High',
    orderNumber: '#SH-6102',
    deliveredDate: 'Aug 04, 2024',
    price: 280.0,
    image: '/images/prod-kinetic.jpg',
    size: 'US 9.5',
  },
];

const SIDEBAR_ITEMS: { id: DashboardTab; label: string; icon: typeof Truck }[] =
  [
    { id: 'orders', label: 'Orders & Returns', icon: Truck },
    { id: 'wishlist', label: 'Saved Sizes & Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<DashboardTab>('orders');
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);

  const handleBuyAgain = (order: PastOrder) => {
    addToCart({
      id: order.productId,
      name: order.name,
      price: order.price,
      image: order.image,
      size: order.size,
      color: 'Standard',
    });
    openCart();
  };

  return (
    <div className="bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Top Member Portal Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-500 uppercase">
              DASHBOARD // MEMBER PORTAL
            </p>
            <h1 className="mt-1 font-editorial text-sm font-semibold text-neutral-900 sm:text-base">
              Alex Mercer
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs text-neutral-500">
              Tier:{' '}
              <span className="font-semibold text-neutral-900">
                Insider Elite
              </span>
            </p>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-md bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main 2-Column Dashboard Layout */}
        <div className="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          {/* Left Sidebar Menu */}
          <aside className="rounded-xl bg-[#F4F4F5] p-3 lg:col-span-4 xl:col-span-3">
            <nav className="space-y-1" aria-label="Member portal navigation">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-xs transition-colors ${
                      isActive
                        ? 'bg-neutral-200/80 font-semibold text-neutral-900'
                        : 'font-medium text-neutral-600 hover:bg-neutral-200/40 hover:text-neutral-900'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      <span>{item.label}</span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {activeTab === 'orders' && (
              <div>
                {/* Active Shipment Card */}
                <section className="rounded-xl bg-[#F4F4F5] p-6">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.12em] text-[#F04E2A] uppercase">
                        ACTIVE SHIPMENT
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-600">
                        Order #SH-8942
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowTrackingDetails((prev) => !prev)
                      }
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 underline underline-offset-2 transition-colors hover:text-neutral-900"
                    >
                      <span>Courier Tracking: DHL-9928104</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Inner White Product Box */}
                  <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl bg-white p-4 shadow-xs sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/hero-apex-pro.jpg"
                        alt="AeroStride Velocity X"
                        className="h-16 w-16 shrink-0 rounded-lg bg-[#E5E5E7] object-cover"
                      />
                      <div>
                        <Link
                          to="/product/aerostride-velocity-x"
                          className="font-editorial text-sm font-semibold text-neutral-900 transition-colors hover:text-stride-red"
                        >
                          AeroStride Velocity X
                        </Link>
                        <p className="mt-0.5 text-[11px] text-neutral-500">
                          Size: US 9.5 / EU 43
                        </p>
                        <p className="mt-1 text-xs font-bold text-neutral-900">
                          $240.00
                        </p>
                      </div>
                    </div>

                    <span className="self-start rounded-md bg-[#F4F4F5] px-3 py-1.5 text-[11px] font-medium text-neutral-600 sm:self-center">
                      1x Item
                    </span>
                  </div>

                  {/* 4-Step Progress Tracker */}
                  <div className="mt-8 px-2 sm:px-6">
                    <div className="grid grid-cols-4 items-center">
                      {/* Step 1: Ordered */}
                      <div className="relative flex flex-col items-center">
                        <div className="absolute top-3.5 left-1/2 h-0.5 w-full bg-[#F04E2A]" />
                        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </span>
                        <span className="mt-2.5 text-[11px] font-medium text-neutral-700">
                          Ordered
                        </span>
                      </div>

                      {/* Step 2: Packed */}
                      <div className="relative flex flex-col items-center">
                        <div className="absolute top-3.5 left-1/2 h-0.5 w-full bg-[#F04E2A]" />
                        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </span>
                        <span className="mt-2.5 text-[11px] font-medium text-neutral-700">
                          Packed
                        </span>
                      </div>

                      {/* Step 3: In Transit */}
                      <div className="relative flex flex-col items-center">
                        <div className="absolute top-3.5 left-1/2 h-0.5 w-full bg-neutral-300">
                          <div className="h-full w-2/5 bg-[#F04E2A]" />
                        </div>
                        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-[#F04E2A] text-white shadow-[0_0_16px_rgba(240,78,42,0.55)]">
                          <Truck className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="mt-2.5 text-[11px] font-semibold text-[#F04E2A]">
                          In Transit
                        </span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="relative flex flex-col items-center">
                        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-200 text-neutral-500">
                          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="mt-2.5 text-[11px] font-medium text-neutral-400">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Action Buttons */}
                  <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowTrackingDetails((prev) => !prev)
                      }
                      className="flex items-center justify-center gap-2 rounded-md bg-[#F04E2A] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#D94120]"
                    >
                      <Send className="h-3.5 w-3.5" strokeWidth={2} />
                      <span>Track Package</span>
                    </button>

                    <Link
                      to="/exchange"
                      className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-transparent py-3 text-xs font-semibold text-neutral-800 transition-colors hover:bg-white"
                    >
                      <ArrowLeftRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                      <span>Exchange Size / Return</span>
                    </Link>
                  </div>

                  {showTrackingDetails && (
                    <div className="mt-4 rounded-lg border border-neutral-200/80 bg-white p-4 text-xs">
                      <p className="font-semibold text-neutral-900">
                        DHL Express — #DHL-9928104
                      </p>
                      <p className="mt-1 text-neutral-500">
                        Arrived at New York Distribution Hub • Estimated
                        delivery tomorrow by 6:00 PM.
                      </p>
                    </div>
                  )}
                </section>

                {/* Past Orders */}
                <section className="mt-9">
                  <div className="flex items-center justify-between">
                    <h2 className="font-editorial text-sm font-semibold text-neutral-900">
                      Past Orders
                    </h2>
                    <span className="text-[11px] text-neutral-400">
                      Showing last 3 orders
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-3.5">
                    {PAST_ORDERS.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col justify-between gap-4 rounded-xl bg-[#F4F4F5] p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="h-14 w-14 shrink-0 rounded-lg bg-[#E5E5E7] object-cover"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                to={`/product/${order.slug}`}
                                className="font-editorial text-xs font-semibold text-neutral-900 transition-colors hover:text-stride-red sm:text-sm"
                              >
                                {order.name}
                              </Link>
                              <span className="rounded bg-neutral-200/80 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                                Delivered
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-neutral-500">
                              Order {order.orderNumber} • Delivered{' '}
                              {order.deliveredDate}
                            </p>
                            <p className="mt-1 text-xs font-bold text-neutral-900">
                              ${order.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleBuyAgain(order)}
                          className="self-start rounded-md bg-neutral-900 px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:self-center"
                        >
                          Buy Again
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <section className="rounded-xl bg-[#F4F4F5] p-6">
                <h2 className="font-editorial text-base font-semibold text-neutral-900">
                  Saved Sizes &amp; Wishlist
                </h2>
                <div className="mt-4 rounded-lg bg-white p-4 text-xs">
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                    PRIMARY FIT PROFILE
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    US 9.5 / EU 43 • Standard (D) Width
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link
                    to="/product/aerostride-velocity-x"
                    className="flex items-center gap-3.5 rounded-lg bg-white p-3.5 transition-shadow hover:shadow-xs"
                  >
                    <img
                      src="/images/prod-vapor-x.jpg"
                      alt="AeroStride Velocity X"
                      className="h-14 w-14 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-editorial text-xs font-semibold text-neutral-900">
                        AeroStride Velocity X
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-neutral-700">
                        $180.00
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/product/stride-terra-trail"
                    className="flex items-center gap-3.5 rounded-lg bg-white p-3.5 transition-shadow hover:shadow-xs"
                  >
                    <img
                      src="/images/prod-terra-trail.jpg"
                      alt="STRIDE Terra Trail"
                      className="h-14 w-14 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-editorial text-xs font-semibold text-neutral-900">
                        STRIDE Terra Trail
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-neutral-700">
                        $210.00
                      </p>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {activeTab === 'addresses' && (
              <section className="rounded-xl bg-[#F4F4F5] p-6">
                <h2 className="font-editorial text-base font-semibold text-neutral-900">
                  Saved Addresses
                </h2>
                <div className="mt-4 rounded-lg bg-white p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-neutral-900">
                      Alex Mercer
                    </p>
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                      Default
                    </span>
                  </div>
                  <p className="mt-1.5 text-neutral-500">
                    452 Broome Street, 3rd Floor
                    <br />
                    New York, NY 10013
                    <br />
                    +1 (212) 555-8392
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'profile' && (
              <section className="rounded-xl bg-[#F4F4F5] p-6">
                <h2 className="font-editorial text-base font-semibold text-neutral-900">
                  Member Profile
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-white p-4 text-xs">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                      FULL NAME
                    </p>
                    <p className="mt-1 font-semibold text-neutral-900">
                      Alex Mercer
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-4 text-xs">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                      EMAIL
                    </p>
                    <p className="mt-1 font-semibold text-neutral-900">
                      alex.mercer@studio.net
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-4 text-xs">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                      MEMBERSHIP TIER
                    </p>
                    <p className="mt-1 font-semibold text-neutral-900">
                      Insider Elite
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-4 text-xs">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                      MEMBER SINCE
                    </p>
                    <p className="mt-1 font-semibold text-neutral-900">
                      March 2024
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
