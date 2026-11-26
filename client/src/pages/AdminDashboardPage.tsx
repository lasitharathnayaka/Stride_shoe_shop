import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowLeftRight,
  Bell,
  Check,
  Eye,
  FileBarChart,
  Grid2X2,
  GripVertical,
  ImagePlus,
  LayoutGrid,
  Package,
  Save,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  User,
  Zap,
} from 'lucide-react';
import AdminOrderFulfillmentView from '@/components/admin/AdminOrderFulfillmentView';
import AdminReturnsExchangesView from '@/components/admin/AdminReturnsExchangesView';
import AdminPromotionsView from '@/components/admin/AdminPromotionsView';
import AdminAnalyticsView from '@/components/admin/AdminAnalyticsView';
import AdminOverviewView from '@/components/admin/AdminOverviewView';
import AdminSizeMatrixView from '@/components/admin/AdminSizeMatrixView';

type AdminNavId =
  | 'overview'
  | 'products'
  | 'size-matrix'
  | 'orders'
  | 'returns'
  | 'promotions'
  | 'analytics';

type FitScale = 'small' | 'true' | 'large';

interface ColorwayDef {
  id: string;
  name: string;
  code: string;
  hex: string;
}

interface VariantRow {
  sku: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: string;
  stock: number;
  alertThreshold: number;
  active: boolean;
}

const ADMIN_NAV: { id: AdminNavId; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'products', label: 'Products & Variants', icon: Package },
  { id: 'size-matrix', label: 'Size Matrix', icon: Grid2X2 },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'returns', label: 'Returns/Exchanges', icon: ArrowLeftRight },
  { id: 'promotions', label: 'Promotions & Drops', icon: Tag },
  { id: 'analytics', label: 'Analytics', icon: FileBarChart },
];

const COLORWAYS: ColorwayDef[] = [
  { id: 'coral', name: 'Solar Coral', code: 'COR', hex: '#F04E2A' },
  { id: 'black', name: 'Obsidian Black', code: 'BLK', hex: '#111111' },
  { id: 'white', name: 'Triple White', code: 'WHT', hex: '#E5E7EB' },
];

const ALL_SIZES = ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'];

const INITIAL_MEDIA = [
  {
    id: 'side',
    label: 'Side Profile',
    file: 'velocity_side_profile_v2.png',
    image: '/images/cat-running.jpg',
  },
  {
    id: 'top',
    label: 'Top View',
    file: 'top_aerial_shot.png',
    image: '/images/hero-apex-pro.jpg',
  },
  {
    id: 'outsole',
    label: 'Outsole',
    file: 'outsole_grip_macro.png',
    image: '/images/innovation-carbon.jpg',
  },
  {
    id: 'onfoot',
    label: 'On-Foot',
    file: 'lifestyle_on_foot.png',
    image: '/images/cat-lifestyle.jpg',
  },
];

function buildInitialVariants(
  selectedColors: string[],
  selectedSizes: string[],
  basePrice: string
): VariantRow[] {
  const presetStocks: Record<string, { stock: number; alert: number; active: boolean }> = {
    'coral-US 8': { stock: 28, alert: 5, active: true },
    'coral-US 8.5': { stock: 42, alert: 5, active: true },
    'coral-US 9': { stock: 64, alert: 5, active: true },
    'coral-US 9.5': { stock: 12, alert: 15, active: true },
    'black-US 8': { stock: 0, alert: 5, active: false },
  };

  const rows: VariantRow[] = [];
  COLORWAYS.filter((c) => selectedColors.includes(c.id)).forEach((color) => {
    ALL_SIZES.filter((s) => selectedSizes.includes(s)).forEach((size) => {
      const numericSize = size.replace('US ', '').replace('.', '');
      const sizeCode = numericSize.padStart(3, '0');
      const preset = presetStocks[`${color.id}-${size}`];
      rows.push({
        sku: `AS-VX-${color.code}-${sizeCode}`,
        colorId: color.id,
        colorName: color.name,
        colorHex: color.hex,
        size,
        price: basePrice,
        stock: preset ? preset.stock : 35,
        alertThreshold: preset ? preset.alert : 5,
        active: preset ? preset.active : true,
      });
    });
  });

  // Sort so the 5 showcase rows appear at the top (Solar Coral US 8–9.5 + Obsidian Black US 8)
  const priorityOrder = [
    'AS-VX-COR-008',
    'AS-VX-COR-085',
    'AS-VX-COR-009',
    'AS-VX-COR-095',
    'AS-VX-BLK-008',
  ];
  return rows.sort((a, b) => {
    const ia = priorityOrder.indexOf(a.sku);
    const ib = priorityOrder.indexOf(b.sku);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return 0;
  });
}

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState<AdminNavId>('products');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // General Info & Fit
  const [productTitle, setProductTitle] = useState('AeroStride Velocity X');
  const [brand, setBrand] = useState('STRIDE LABS');
  const [category, setCategory] = useState("Men's Running");
  const [basePrice, setBasePrice] = useState('180.00');
  const [costPerItem, setCostPerItem] = useState('64.50');
  const [fitScale, setFitScale] = useState<FitScale>('true');

  // Media slots
  const [mediaSlots, setMediaSlots] = useState(INITIAL_MEDIA);

  // Matrix Builder
  const [activeColorways, setActiveColorways] = useState<string[]>([
    'coral',
    'black',
    'white',
  ]);
  const [activeSizes, setActiveSizes] = useState<string[]>(ALL_SIZES);
  const [variants, setVariants] = useState<VariantRow[]>(() =>
    buildInitialVariants(['coral', 'black', 'white'], ALL_SIZES, '180.00')
  );
  const [bulkPrice, setBulkPrice] = useState('180.00');
  const [bulkStock, setBulkStock] = useState('45');
  const [bulkAlert, setBulkAlert] = useState('5');
  const [showAllVariants, setShowAllVariants] = useState(false);

  const visibleVariants = useMemo(
    () => (showAllVariants ? variants : variants.slice(0, 5)),
    [variants, showAllVariants]
  );

  const triggerToast = (message: string) => {
    setSaveToast(message);
    window.setTimeout(() => setSaveToast(null), 2200);
  };

  const handleToggleColorway = (id: string) => {
    setActiveColorways((prev) => {
      const next = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      setVariants(buildInitialVariants(next, activeSizes, basePrice));
      return next;
    });
  };

  const handleToggleSize = (size: string) => {
    setActiveSizes((prev) => {
      const next = prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size];
      setVariants(buildInitialVariants(activeColorways, next, basePrice));
      return next;
    });
  };

  const handleRegenerateMatrix = () => {
    setVariants(buildInitialVariants(activeColorways, activeSizes, basePrice));
    triggerToast('Variant matrix regenerated.');
  };

  const handleApplyBulk = () => {
    setVariants((prev) =>
      prev.map((row) => ({
        ...row,
        price: bulkPrice,
        stock: Number(bulkStock) || 0,
        alertThreshold: Number(bulkAlert) || 0,
      }))
    );
    triggerToast(`Applied bulk values to ${variants.length} SKUs.`);
  };

  const updateVariantField = <K extends keyof VariantRow>(
    sku: string,
    field: K,
    value: VariantRow[K]
  ) => {
    setVariants((prev) =>
      prev.map((row) => (row.sku === sku ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F6] text-neutral-900">
      {/* Left Dark Admin Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col justify-between bg-[#0F0F10] text-neutral-400 lg:flex">
        <div>
          <div className="flex h-14 items-center px-6">
            <Link
              to="/"
              className="font-editorial text-sm font-bold tracking-[0.16em] text-white uppercase"
            >
              STRIDE
            </Link>
          </div>

          <nav className="mt-4 space-y-1 px-3" aria-label="Admin navigation">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F04E2A] font-semibold text-white'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 p-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Admin Search & Profile Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200/80 bg-white px-6">
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
              strokeWidth={1.8}
            />
            <input
              type="text"
              placeholder="Search products, orders, inventory..."
              aria-label="Search admin"
              className="w-full rounded-md border border-neutral-200/80 bg-[#F5F5F6] py-1.5 pr-3 pl-9 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Bell className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
              <User className="h-4 w-4" strokeWidth={1.8} />
            </span>
          </div>
        </header>

        {/* Active Admin View */}
        {activeNav === 'overview' ? (
          <AdminOverviewView onNavigate={setActiveNav} />
        ) : activeNav === 'size-matrix' ? (
          <AdminSizeMatrixView />
        ) : activeNav === 'orders' ? (
          <AdminOrderFulfillmentView
            onBackToProducts={() => setActiveNav('products')}
          />
        ) : activeNav === 'returns' ? (
          <AdminReturnsExchangesView />
        ) : activeNav === 'promotions' ? (
          <AdminPromotionsView />
        ) : activeNav === 'analytics' ? (
          <AdminAnalyticsView
            onOpenSizeMatrix={() => setActiveNav('size-matrix')}
          />
        ) : (
          <>
            {/* Page Header + Action Buttons */}
            <div className="border-b border-neutral-200/80 bg-[#F8F8F9] px-6 py-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                PRODUCTS &gt; ADD NEW FOOTWEAR
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <h1 className="font-editorial text-xl font-semibold text-neutral-900 sm:text-2xl">
                  {productTitle || 'Untitled Footwear'}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    status === 'Published'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === 'Published' ? 'bg-emerald-500' : 'bg-neutral-500'
                    }`}
                  />
                  {status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setStatus('Draft');
                  triggerToast('Saved as draft.');
                }}
                className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatus('Published');
                  triggerToast('Product published with all variants.');
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[#D6361D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B92A14]"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save &amp; Publish Product</span>
              </button>
            </div>
          </div>

          {saveToast && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>{saveToast}</span>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <main className="flex-1 space-y-6 p-6">
          {/* Top 2-Column Section: General Info + Angle Media Slots */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* General Information & Fit */}
            <section className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-6 xl:col-span-7">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-base font-semibold text-neutral-900">
                    General Information &amp; Fit
                  </h2>
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                    CORE SPECS
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="admin-title"
                      className="block text-[11px] font-semibold text-neutral-700"
                    >
                      Product Title
                    </label>
                    <input
                      id="admin-title"
                      type="text"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-neutral-200 bg-[#F4F4F5] px-3.5 py-2 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="admin-brand"
                        className="block text-[11px] font-semibold text-neutral-700"
                      >
                        Brand
                      </label>
                      <input
                        id="admin-brand"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-neutral-200 bg-[#F4F4F5] px-3.5 py-2 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-category"
                        className="block text-[11px] font-semibold text-neutral-700"
                      >
                        Category
                      </label>
                      <select
                        id="admin-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-neutral-200 bg-[#F4F4F5] px-3.5 py-2 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                      >
                        <option>Men&apos;s Running</option>
                        <option>Women&apos;s Running</option>
                        <option>Streetwear Lifestyle</option>
                        <option>Court Basketball</option>
                        <option>Outdoor Boots</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="admin-base-price"
                        className="block text-[11px] font-semibold text-neutral-700"
                      >
                        Base Price ($)
                      </label>
                      <div className="relative mt-1.5">
                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-neutral-400">
                          $
                        </span>
                        <input
                          id="admin-base-price"
                          type="text"
                          value={basePrice}
                          onChange={(e) => setBasePrice(e.target.value)}
                          className="w-full rounded-md border border-neutral-200 bg-[#F4F4F5] py-2 pr-3 pl-7 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-cost"
                        className="block text-[11px] font-semibold text-neutral-700"
                      >
                        Cost per Item ($)
                      </label>
                      <div className="relative mt-1.5">
                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-neutral-400">
                          $
                        </span>
                        <input
                          id="admin-cost"
                          type="text"
                          value={costPerItem}
                          onChange={(e) => setCostPerItem(e.target.value)}
                          className="w-full rounded-md border border-neutral-200 bg-[#F4F4F5] py-2 pr-3 pl-7 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Default Fit Scale */}
                  <div>
                    <p className="text-[11px] font-semibold text-neutral-700">
                      Default Fit Scale
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2.5">
                      {(
                        [
                          { id: 'small', top: 'Runs Small', bottom: '0.5 Size Up' },
                          { id: 'true', top: 'True to Size', bottom: 'Standard Fit' },
                          { id: 'large', top: 'Runs Large', bottom: '0.5 Size Down' },
                        ] as const
                      ).map((opt) => {
                        const isSelected = fitScale === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFitScale(opt.id)}
                            className={`rounded-lg border px-3 py-2.5 text-center transition-colors ${
                              isSelected
                                ? 'border-neutral-950 bg-neutral-950 text-white'
                                : 'border-neutral-200 bg-[#F4F4F5] text-neutral-700 hover:border-neutral-400'
                            }`}
                          >
                            <p
                              className={`text-[10px] ${
                                isSelected ? 'text-neutral-300' : 'text-neutral-500'
                              }`}
                            >
                              {opt.top}
                            </p>
                            <p className="mt-0.5 text-xs font-bold">{opt.bottom}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-[10px] text-neutral-400">
                <span>SKU: AS-VX-BASE-001</span>
                <span>Last updated: 4 mins ago by Admin</span>
              </div>
            </section>

            {/* Angle Media Slots */}
            <section className="rounded-xl border border-neutral-200/80 bg-white p-6 xl:col-span-5">
              <div className="flex items-center justify-between">
                <h2 className="font-editorial text-base font-semibold text-neutral-900">
                  Angle Media Slots
                </h2>
                <span className="text-[10px] font-bold tracking-[0.12em] text-[#D6361D] uppercase">
                  5 ANGLES REQUIRED
                </span>
              </div>

              <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500">
                Drag and drop or replace high-res sneaker shots across 5 dynamic
                viewing angles.
              </p>

              <div className="mt-4 space-y-2.5">
                {mediaSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#F5F5F6] px-3 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-3.5 w-3.5 text-neutral-400" />
                      <img
                        src={slot.image}
                        alt={slot.label}
                        className="h-9 w-9 rounded-md bg-white object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900">
                          {slot.label}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {slot.file}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-400">
                      <button
                        type="button"
                        aria-label={`Preview ${slot.label}`}
                        className="p-1 transition-colors hover:text-neutral-900"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setMediaSlots((prev) =>
                            prev.filter((m) => m.id !== slot.id)
                          )
                        }
                        aria-label={`Delete ${slot.label}`}
                        className="p-1 transition-colors hover:text-stride-red"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* 5th Slot: 360° Spin Asset Dropzone */}
                <button
                  type="button"
                  onClick={() =>
                    triggerToast('360° sequence upload dialog ready.')
                  }
                  className="flex w-full items-center justify-between rounded-lg border border-dashed border-neutral-300 bg-white px-4 py-3.5 text-left transition-colors hover:border-neutral-500 hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-3">
                    <ImagePlus className="h-4 w-4 text-neutral-500" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        360° Spin Asset
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        Drop folder or click to upload sequence
                      </p>
                    </div>
                  </div>
                  <Upload className="h-3.5 w-3.5 text-neutral-400" />
                </button>
              </div>
            </section>
          </div>

          {/* Bottom Full-Width Card: Automated Variant Matrix Builder */}
          <section className="rounded-xl border border-neutral-200/80 bg-white p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-editorial text-base font-semibold text-neutral-900 sm:text-lg">
                    Automated Variant Matrix Builder
                  </h2>
                  <span className="rounded bg-[#D6361D] px-2 py-0.5 text-[10px] font-bold text-white">
                    {variants.length} SKUs Generated
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  Select active colorways and size ranges to instantly generate
                  inventory rows, auto-SKUs, and bulk pricing tiers.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRegenerateMatrix}
                className="inline-flex items-center gap-1.5 self-start rounded-md border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 sm:self-auto"
              >
                <Sparkles className="h-3.5 w-3.5 text-neutral-600" />
                <span>Regenerate Matrix</span>
              </button>
            </div>

            {/* Colorway + Size + Bulk Quick-Fill Controls */}
            <div className="mt-5 space-y-4 rounded-xl bg-[#F5F5F6] p-4">
              {/* Active Colorways */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  ACTIVE COLORWAYS
                </p>
                <div className="mt-2 flex flex-wrap gap-2.5">
                  {COLORWAYS.map((c) => {
                    const checked = activeColorways.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleToggleColorway(c.id)}
                        className={`inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-xs font-medium transition-colors ${
                          checked
                            ? 'border-[#D6361D]/70 text-neutral-900'
                            : 'border-neutral-200 text-neutral-500 hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className={`flex h-3.5 w-3.5 items-center justify-center rounded-xs text-[9px] text-white ${
                            checked ? 'bg-[#D6361D]' : 'border border-neutral-300'
                          }`}
                        >
                          {checked && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                        </span>
                        <span
                          className="h-2.5 w-2.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Range */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  SIZE RANGE (US)
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ALL_SIZES.map((size) => {
                    const active = activeSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleSize(size)}
                        className={`rounded-md border px-3 py-1 text-[11px] font-semibold transition-colors ${
                          active
                            ? 'border-neutral-200 bg-white text-[#D6361D]'
                            : 'border-transparent bg-neutral-200/70 text-neutral-500 hover:text-neutral-800'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bulk Quick-Fill Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/80 pt-3.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                  <Zap className="h-3.5 w-3.5 text-[#D6361D]" />
                  <span>Bulk Quick-Fill:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <label className="flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1">
                    <span className="text-[10px] text-neutral-400">Price:</span>
                    <input
                      type="text"
                      value={bulkPrice}
                      onChange={(e) => setBulkPrice(e.target.value)}
                      className="w-14 bg-transparent text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </label>

                  <label className="flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1">
                    <span className="text-[10px] text-neutral-400">Stock:</span>
                    <input
                      type="number"
                      value={bulkStock}
                      onChange={(e) => setBulkStock(e.target.value)}
                      className="w-12 bg-transparent text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </label>

                  <label className="flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1">
                    <span className="text-[10px] text-neutral-400">
                      Alert Threshold:
                    </span>
                    <input
                      type="number"
                      value={bulkAlert}
                      onChange={(e) => setBulkAlert(e.target.value)}
                      className="w-10 bg-transparent text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleApplyBulk}
                    className="rounded-md bg-neutral-900 px-3.5 py-1.5 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Apply to All
                  </button>
                </div>
              </div>
            </div>

            {/* Variants Table */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-[#F8F8F9] text-[10px] font-semibold tracking-[0.1em] text-neutral-500 uppercase">
                    <th className="px-4 py-3">VARIANT (COLOR / SIZE)</th>
                    <th className="px-4 py-3">AUTO-SKU</th>
                    <th className="px-4 py-3">PRICE ($)</th>
                    <th className="px-4 py-3">WAREHOUSE STOCK</th>
                    <th className="px-4 py-3">LOW-STOCK ALERT</th>
                    <th className="px-4 py-3 text-right">ACTIVE STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {visibleVariants.map((row) => {
                    const isOutOfStock = row.stock === 0;
                    const isLowStock =
                      !isOutOfStock && row.stock <= row.alertThreshold;

                    return (
                      <tr key={row.sku} className="hover:bg-neutral-50/70">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full border border-neutral-300"
                              style={{ backgroundColor: row.colorHex }}
                            />
                            <div>
                              <p className="font-semibold text-neutral-900">
                                {row.colorName}
                              </p>
                              <p className="text-[10px] text-neutral-400">
                                {row.size}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 font-mono text-[11px] text-neutral-500">
                          {row.sku}
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.price}
                            onChange={(e) =>
                              updateVariantField(row.sku, 'price', e.target.value)
                            }
                            aria-label={`Price for ${row.sku}`}
                            className="w-20 rounded border border-neutral-200 bg-[#F4F4F5] px-2.5 py-1 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={row.stock}
                            onChange={(e) =>
                              updateVariantField(
                                row.sku,
                                'stock',
                                Math.max(0, Number(e.target.value) || 0)
                              )
                            }
                            aria-label={`Stock for ${row.sku}`}
                            className={`w-16 rounded border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                              isOutOfStock
                                ? 'border-red-200 bg-red-50/60 text-red-600'
                                : isLowStock
                                  ? 'border-amber-200 bg-amber-50/70 text-amber-700'
                                  : 'border-neutral-200 bg-[#F4F4F5] text-neutral-900'
                            }`}
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={row.alertThreshold}
                            onChange={(e) =>
                              updateVariantField(
                                row.sku,
                                'alertThreshold',
                                Math.max(0, Number(e.target.value) || 0)
                              )
                            }
                            aria-label={`Low-stock alert for ${row.sku}`}
                            className="w-16 rounded border border-neutral-200 bg-[#F4F4F5] px-2.5 py-1 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                          />
                        </td>

                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={row.active}
                            aria-label={`Toggle active status for ${row.sku}`}
                            onClick={() =>
                              updateVariantField(row.sku, 'active', !row.active)
                            }
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              row.active ? 'bg-[#B91C0C]' : 'bg-neutral-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                                row.active ? 'translate-x-4.5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-4 text-[11px]">
              <span className="text-neutral-400">
                Showing {visibleVariants.length} of {variants.length} generated
                SKU variants
              </span>

              {variants.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllVariants((prev) => !prev)}
                  className="font-semibold text-[#D6361D] hover:underline"
                >
                  {showAllVariants
                    ? 'Show Compact View (5 Rows)'
                    : `View All ${variants.length} Variants in Full Table`}
                </button>
              )}
            </div>
          </section>
        </main>
          </>
        )}
      </div>
    </div>
  );
}
