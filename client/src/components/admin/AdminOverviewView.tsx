import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  Bell,
  Clock,
  Package,
  Plus,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';

export type AdminSectionId =
  | 'overview'
  | 'products'
  | 'size-matrix'
  | 'orders'
  | 'returns'
  | 'promotions'
  | 'analytics';

interface AdminOverviewViewProps {
  onNavigate: (section: AdminSectionId) => void;
}

const RECENT_ORDERS = [
  {
    id: '#SH-90412',
    customer: 'Marcus Vance',
    items: '2 Pairs • Express Next-Day',
    total: '$420.00',
    status: 'Ready to Pack',
    tone: 'orange' as const,
  },
  {
    id: '#SH-90411',
    customer: 'Nimal Perera',
    items: '1 Pair • Standard Archive',
    total: '$180.00',
    status: 'In Transit',
    tone: 'blue' as const,
  },
  {
    id: '#SH-90410',
    customer: 'Elena Rostova',
    items: '1 Pair • Standard Archive',
    total: '$195.00',
    status: 'Delivered',
    tone: 'green' as const,
  },
  {
    id: '#SH-90409',
    customer: 'David Kim',
    items: '2 Pairs • Express Next-Day',
    total: '$360.00',
    status: 'Ready to Pack',
    tone: 'orange' as const,
  },
];

export default function AdminOverviewView({
  onNavigate,
}: AdminOverviewViewProps) {
  return (
    <>
      {/* Header */}
      <div className="bg-[#F8F8F9] px-6 py-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              COMMAND CENTER <span className="text-emerald-600">• LIVE</span>
            </p>
            <h1 className="mt-1 font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
              Executive Store Overview
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('orders')}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-neutral-600" />
              <span>Open Fulfillment Queue</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 rounded-md bg-[#F04E2A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#D94120]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add New Footwear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 space-y-6 p-6 pt-2">
        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-[#D6361D] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                TODAY&apos;S REVENUE
              </p>
              <Banknote className="h-4 w-4 text-[#D6361D]" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              $12,480
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>+18.4% vs yesterday</span>
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-neutral-900 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                ORDERS TO PACK
              </p>
              <Package className="h-4 w-4 text-neutral-700" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              14{' '}
              <span className="text-sm font-normal text-neutral-500">
                Orders
              </span>
            </p>
            <p className="mt-1.5 text-[11px] font-medium text-neutral-500">
              3 Express Next-Day priority
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-amber-500 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                PENDING RMAs
              </p>
              <ArrowLeftRight
                className="h-4 w-4 text-amber-500"
                strokeWidth={1.8}
              />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              11{' '}
              <span className="text-sm font-normal text-neutral-500">
                Requests
              </span>
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-amber-600">
              8 pairs reserved for exchange
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-emerald-500 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                ACTIVE DROP SIGNUPS
              </p>
              <Bell className="h-4 w-4 text-emerald-600" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              420
            </p>
            <p className="mt-1.5 text-[11px] font-medium text-neutral-500">
              Velocity X Midnight • 02d left
            </p>
          </div>
        </div>

        {/* 2-Column Operations Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Recent Orders Table */}
          <section className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white xl:col-span-7">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div>
                <h2 className="font-editorial text-base font-bold text-neutral-900">
                  Recent Storefront Orders
                </h2>
                <p className="text-[11px] text-neutral-500">
                  Latest checkouts awaiting warehouse pick or courier handoff
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('orders')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#D6361D] hover:underline"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-neutral-100">
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between gap-3 px-6 py-4 transition-colors hover:bg-neutral-50/70 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-editorial text-xs font-bold text-neutral-900">
                        {order.id}
                      </span>
                      <span className="text-xs font-semibold text-neutral-800">
                        {order.customer}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      {order.items}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-neutral-900">
                      {order.total}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        order.tone === 'orange'
                          ? 'bg-[#FDECE7] text-[#C84323]'
                          : order.tone === 'blue'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {order.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => onNavigate('orders')}
                      className="rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      Fulfill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Operational Alerts & Quick Links */}
          <section className="rounded-xl border border-neutral-200/80 bg-white p-6 xl:col-span-5">
            <h2 className="font-editorial text-base font-bold text-neutral-900">
              Operational Alerts
            </h2>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              Priority stockout, fit telemetry, and drop notifications
            </p>

            <div className="mt-5 space-y-3.5">
              <div className="rounded-xl border border-rose-200/70 bg-rose-50/50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">
                        Critical Stockout — US 10 &amp; US 9.5
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-600">
                        Apex Runner V2 (US 10) has 84 active waitlist alerts.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('size-matrix')}
                  className="mt-3 text-[11px] font-bold text-[#D6361D] hover:underline"
                >
                  Open Size Matrix →
                </button>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-4">
                <div className="flex items-start gap-2.5">
                  <ArrowLeftRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">
                      11 RMA Requests Awaiting Approval
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-600">
                      Includes #RMA-402 (Nimal Perera — US 9.5 → US 10).
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('returns')}
                  className="mt-3 text-[11px] font-bold text-neutral-900 hover:underline"
                >
                  Review RMA Queue →
                </button>
              </div>

              <div className="rounded-xl border border-neutral-200/80 bg-[#F5F5F6] p-4">
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">
                      Upcoming Drop: Velocity X Midnight
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-600">
                      Launches in 02d : 14h : 30m • 1,500 pairs allocated.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('promotions')}
                  className="mt-3 text-[11px] font-bold text-neutral-900 hover:underline"
                >
                  Manage Drop Campaign →
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
