import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  Award,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Heart,
  LogOut,
  MapPin,
  Plus,
  Send,
  Trash2,
  Truck,
  User,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

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
    slug: 'stride-apex-court',
    name: 'Chromic Court High',
    orderNumber: '#SH-6102',
    deliveredDate: 'Aug 04, 2024',
    price: 280.0,
    image: '/images/prod-kinetic.jpg',
    size: 'US 9.5',
  },
];

interface SavedAddress {
  id: string;
  label: string;
  fullName: string;
  street: string;
  cityStateZip: string;
  phone: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    fullName: 'Alex Mercer',
    street: '452 Broome Street, 3rd Floor',
    cityStateZip: 'New York, NY 10013',
    phone: '+1 (212) 555-8392',
    isDefault: true,
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
  const { items: wishlistItems, totalCount: wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<DashboardTab>('orders');
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);

  // Saved Addresses state
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addrLabel, setAddrLabel] = useState('Office');
  const [addrName, setAddrName] = useState('Alex Mercer');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCityZip, setAddrCityZip] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrDefault, setAddrDefault] = useState(false);

  const handleAddAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!addrName.trim() || !addrStreet.trim() || !addrCityZip.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      label: addrLabel.trim() || 'Other',
      fullName: addrName.trim(),
      street: addrStreet.trim(),
      cityStateZip: addrCityZip.trim(),
      phone: addrPhone.trim() || '+1 (212) 555-0100',
      isDefault: addrDefault || addresses.length === 0,
    };

    setAddresses((prev) => {
      const base = newAddr.isDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : prev;
      return [...base, newAddr];
    });

    setAddrStreet('');
    setAddrCityZip('');
    setAddrPhone('');
    setAddrDefault(false);
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

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
    <div className="bg-[#F5F5F7]">
      {/* Dark Obsidian Member Portal Hero Banner */}
      <section className="relative overflow-hidden bg-[#09090B] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-64 w-80 rounded-full bg-[#F04E2A]/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#F04E2A]/60 to-transparent"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#F04E2A]/40 bg-[#F04E2A]/15 font-display text-lg font-bold text-[#FF6B4A]">
                AM
              </span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#F04E2A] uppercase">
                  DASHBOARD // MEMBER PORTAL
                </p>
                <h1 className="mt-0.5 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
                  Alex Mercer
                </h1>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-0.5 text-[10px] font-semibold text-neutral-200">
                  <Award className="h-3 w-3 text-[#F04E2A]" />
                  <span>Tier: Insider Elite • 2,450 Points</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden items-center gap-2.5 sm:flex">
                <div className="rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-center backdrop-blur-md">
                  <p className="font-display text-sm font-bold text-white">1</p>
                  <p className="text-[9px] font-semibold tracking-wider text-neutral-400 uppercase">
                    In Transit
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-center backdrop-blur-md">
                  <p className="font-display text-sm font-bold text-white">
                    {wishlistCount}
                  </p>
                  <p className="text-[9px] font-semibold tracking-wider text-neutral-400 uppercase">
                    Saved
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-center backdrop-blur-md">
                  <p className="font-display text-sm font-bold text-white">
                    US 9.5
                  </p>
                  <p className="text-[9px] font-semibold tracking-wider text-neutral-400 uppercase">
                    Fit Profile
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-[#F04E2A] hover:bg-[#F04E2A]"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Dashboard Layout */}
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          {/* Left Sidebar Menu */}
          <aside className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-3 shadow-xs lg:sticky lg:top-24 lg:col-span-4 xl:col-span-3">
            <nav className="space-y-1" aria-label="Member portal navigation">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-xs transition-all ${
                      isActive
                        ? 'bg-neutral-950 font-bold text-white shadow-xs'
                        : 'font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? 'text-[#F04E2A]' : 'text-neutral-400'
                        }`}
                        strokeWidth={1.9}
                      />
                      <span>{item.label}</span>
                    </span>

                    {item.id === 'wishlist' && wishlistCount > 0 ? (
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#F04E2A] text-white'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {wishlistCount}
                      </span>
                    ) : (
                      <ChevronRight
                        className={`h-3.5 w-3.5 ${
                          isActive ? 'text-white/60' : 'text-neutral-400'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {activeTab === 'orders' && (
              <div className="space-y-8">
                {/* Active Shipment Card */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xs">
                  {/* Dark Obsidian Card Header */}
                  <div className="flex flex-col justify-between gap-2 bg-[#09090B] px-6 py-4 text-white sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#F04E2A]" />
                      <p className="text-[11px] font-bold tracking-[0.14em] text-[#FF6B4A] uppercase">
                        ACTIVE SHIPMENT
                      </p>
                      <span className="text-xs font-medium text-neutral-400">
                        Order #SH-8942
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowTrackingDetails((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                    >
                      <span>DHL-9928104</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Product Box */}
                    <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200/70 bg-[#FAFAFB] p-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/hero-apex-pro.jpg"
                          alt="AeroStride Velocity X"
                          className="h-16 w-16 shrink-0 rounded-xl bg-[#ECECEF] object-cover"
                        />
                        <div>
                          <Link
                            to="/product/aerostride-velocity-x"
                            className="font-display text-sm font-bold text-neutral-950 transition-colors hover:text-[#F04E2A]"
                          >
                            AeroStride Velocity X
                          </Link>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            Size: US 9.5 / EU 43
                          </p>
                          <p className="mt-1 font-display text-sm font-bold text-neutral-950">
                            $240.00
                          </p>
                        </div>
                      </div>

                      <span className="self-start rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase sm:self-center">
                        1x Item
                      </span>
                    </div>

                    {/* 4-Step Progress Tracker */}
                    <div className="mt-8 px-2 sm:px-6">
                      <div className="grid grid-cols-4 items-center">
                        <div className="relative flex flex-col items-center">
                          <div className="absolute top-3.5 left-1/2 h-0.5 w-full bg-[#F04E2A]" />
                          <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 text-white">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          <span className="mt-2.5 text-[11px] font-semibold text-neutral-800">
                            Ordered
                          </span>
                        </div>

                        <div className="relative flex flex-col items-center">
                          <div className="absolute top-3.5 left-1/2 h-0.5 w-full bg-[#F04E2A]" />
                          <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 text-white">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          <span className="mt-2.5 text-[11px] font-semibold text-neutral-800">
                            Packed
                          </span>
                        </div>

                        <div className="relative flex flex-col items-center">
                          <div className="absolute top-3.5 left-1/2 h-0.5 w-full bg-neutral-200">
                            <div className="h-full w-2/5 bg-[#F04E2A]" />
                          </div>
                          <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-[#F04E2A] text-white shadow-[0_0_18px_rgba(240,78,42,0.55)]">
                            <Truck className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                          <span className="mt-2.5 text-[11px] font-bold text-[#F04E2A]">
                            In Transit
                          </span>
                        </div>

                        <div className="relative flex flex-col items-center">
                          <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400">
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
                        onClick={() => setShowTrackingDetails((prev) => !prev)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/20 transition-colors hover:bg-[#D94120]"
                      >
                        <Send className="h-3.5 w-3.5" strokeWidth={2} />
                        <span>Track Package</span>
                      </button>

                      <Link
                        to="/exchange"
                        className="flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-3 text-xs font-bold tracking-wider text-neutral-900 uppercase transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                      >
                        <ArrowLeftRight className="h-3.5 w-3.5" strokeWidth={2} />
                        <span>Exchange Size / Return</span>
                      </Link>
                    </div>

                    {showTrackingDetails && (
                      <div className="mt-4 rounded-xl border border-neutral-200/80 bg-[#FAFAFB] p-4 text-xs">
                        <p className="font-bold text-neutral-950">
                          DHL Express — #DHL-9928104
                        </p>
                        <p className="mt-1 text-neutral-500">
                          Arrived at New York Distribution Hub • Estimated
                          delivery tomorrow by 6:00 PM.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Past Orders */}
                <section>
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-sm font-bold tracking-wider text-neutral-950 uppercase">
                      Past Orders
                    </h2>
                    <span className="text-[11px] font-medium text-neutral-400">
                      Showing last 3 orders
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-3.5">
                    {PAST_ORDERS.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="h-16 w-16 shrink-0 rounded-xl bg-[#ECECEF] object-cover"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                to={`/product/${order.slug}`}
                                className="font-display text-sm font-bold text-neutral-950 transition-colors hover:text-[#F04E2A]"
                              >
                                {order.name}
                              </Link>
                              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                                Delivered
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-neutral-500">
                              Order {order.orderNumber} • Delivered{' '}
                              {order.deliveredDate}
                            </p>
                            <p className="mt-1 font-display text-xs font-bold text-neutral-950">
                              ${order.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleBuyAgain(order)}
                          className="self-start rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A] sm:self-center"
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
              <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <h2 className="font-display text-base font-bold text-neutral-950 uppercase">
                    Saved Sizes &amp; Wishlist
                  </h2>
                  <Link
                    to="/wishlist"
                    className="text-xs font-bold text-[#F04E2A] hover:underline"
                  >
                    Open Full Wishlist →
                  </Link>
                </div>

                <div className="mt-5 rounded-xl border border-neutral-200/80 bg-[#FAFAFB] p-4 text-xs">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
                    PRIMARY FIT PROFILE
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-neutral-950">
                    US 9.5 / EU 43 • Standard (D) Width
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {wishlistItems.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.slug}`}
                      className="flex items-center gap-3.5 rounded-xl border border-neutral-200/70 bg-[#FAFAFB] p-3.5 transition-all hover:border-neutral-400 hover:bg-white hover:shadow-xs"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-display text-xs font-bold text-neutral-950">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          {item.savedSize} • {item.colorway}
                        </p>
                        <p className="mt-0.5 font-display text-xs font-bold text-neutral-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'addresses' && (
              <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="font-display text-base font-bold text-neutral-950 uppercase">
                      Saved Addresses
                    </h2>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      Manage shipping destinations for express checkout and
                      courier pickups.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddAddress((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#F04E2A] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-xs transition-colors hover:bg-[#D94120]"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    <span>{showAddAddress ? 'Cancel' : 'Add Address'}</span>
                  </button>
                </div>

                {/* Add New Address Form */}
                {showAddAddress && (
                  <form
                    onSubmit={handleAddAddress}
                    className="mt-5 space-y-4 rounded-xl border border-neutral-200/80 bg-[#FAFAFB] p-5"
                  >
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#F04E2A] uppercase">
                      NEW SHIPPING ADDRESS
                    </p>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="addr-label"
                          className="block text-[11px] font-bold text-neutral-700"
                        >
                          Address Label
                        </label>
                        <input
                          id="addr-label"
                          type="text"
                          value={addrLabel}
                          onChange={(e) => setAddrLabel(e.target.value)}
                          placeholder="Home / Office / Studio"
                          className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-950 focus:border-neutral-950 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="addr-name"
                          className="block text-[11px] font-bold text-neutral-700"
                        >
                          Full Name
                        </label>
                        <input
                          id="addr-name"
                          type="text"
                          required
                          value={addrName}
                          onChange={(e) => setAddrName(e.target.value)}
                          placeholder="Alex Mercer"
                          className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-950 focus:border-neutral-950 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="addr-street"
                        className="block text-[11px] font-bold text-neutral-700"
                      >
                        Street Address
                      </label>
                      <input
                        id="addr-street"
                        type="text"
                        required
                        value={addrStreet}
                        onChange={(e) => setAddrStreet(e.target.value)}
                        placeholder="120 Crosby Street, Suite 4A"
                        className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-950 focus:border-neutral-950 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="addr-city"
                          className="block text-[11px] font-bold text-neutral-700"
                        >
                          City, State &amp; Postal Code
                        </label>
                        <input
                          id="addr-city"
                          type="text"
                          required
                          value={addrCityZip}
                          onChange={(e) => setAddrCityZip(e.target.value)}
                          placeholder="New York, NY 10012"
                          className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-950 focus:border-neutral-950 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="addr-phone"
                          className="block text-[11px] font-bold text-neutral-700"
                        >
                          Phone Number
                        </label>
                        <input
                          id="addr-phone"
                          type="tel"
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value)}
                          placeholder="+1 (212) 555-8392"
                          className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-950 focus:border-neutral-950 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-neutral-700">
                        <input
                          type="checkbox"
                          checked={addrDefault}
                          onChange={(e) => setAddrDefault(e.target.checked)}
                          className="h-4 w-4 rounded border-neutral-300 accent-neutral-950"
                        />
                        <span>Set as default shipping address</span>
                      </label>

                      <button
                        type="submit"
                        className="rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Saved Address Cards */}
                {addresses.length === 0 ? (
                  <div className="mt-5 rounded-xl border border-dashed border-neutral-300 bg-[#FAFAFB] py-10 text-center">
                    <p className="font-display text-sm font-bold text-neutral-900 uppercase">
                      No saved addresses yet
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Add a shipping address for faster checkout.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-3.5">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="rounded-xl border border-neutral-200/80 bg-[#FAFAFB] p-5 text-xs transition-colors hover:border-neutral-300"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <p className="font-display text-sm font-bold text-neutral-950">
                              {addr.fullName}
                            </p>
                            <span className="rounded bg-neutral-200/80 px-2 py-0.5 text-[10px] font-bold text-neutral-700 uppercase">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="rounded-full bg-neutral-950 px-2.5 py-0.5 text-[10px] font-bold text-white">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {!addr.isDefault && (
                              <button
                                type="button"
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-bold text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950"
                              >
                                Set Default
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600 transition-colors hover:bg-rose-600 hover:text-white"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        <p className="mt-2 leading-relaxed text-neutral-500">
                          {addr.street}
                          <br />
                          {addr.cityStateZip}
                          <br />
                          {addr.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'profile' && (
              <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
                <h2 className="font-display text-base font-bold text-neutral-950 uppercase">
                  Member Profile
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: 'FULL NAME', value: 'Alex Mercer' },
                    { label: 'EMAIL', value: 'alex.mercer@studio.net' },
                    { label: 'MEMBERSHIP TIER', value: 'Insider Elite' },
                    { label: 'MEMBER SINCE', value: 'March 2024' },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="rounded-xl border border-neutral-200/80 bg-[#FAFAFB] p-4 text-xs"
                    >
                      <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
                        {field.label}
                      </p>
                      <p className="mt-1 font-display text-sm font-bold text-neutral-950">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
