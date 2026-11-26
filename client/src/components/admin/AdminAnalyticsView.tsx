import { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeftRight,
  Banknote,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Download,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';

type DateRangeKey = '30d' | '7d' | '90d';
type FitFilter = 'all' | 'alert' | 'optimal';

interface SizeDemandPoint {
  size: string;
  pct: number;
  highVelocity?: boolean;
}

const SIZE_DEMAND: SizeDemandPoint[] = [
  { size: '6', pct: 2 },
  { size: '7', pct: 4 },
  { size: '7.5', pct: 5 },
  { size: '8', pct: 8 },
  { size: '8.5', pct: 10 },
  { size: '9', pct: 18, highVelocity: true },
  { size: '9.5', pct: 22, highVelocity: true },
  { size: '10', pct: 19, highVelocity: true },
  { size: '10.5', pct: 6 },
  { size: '11', pct: 3 },
  { size: '12', pct: 1.5 },
  { size: '13', pct: 1 },
  { size: '14', pct: 0.5 },
];

const SOLD_OUT_REQUESTS = [
  {
    rank: 1,
    label: 'US 10 — Apex Runner V2',
    requests: 84,
    pct: 100,
    urgent: true,
  },
  {
    rank: 2,
    label: 'US 9.5 — TrailBlazer GTX',
    requests: 67,
    pct: 80,
    urgent: true,
  },
  {
    rank: 3,
    label: 'US 11 — Metro Clog Pro',
    requests: 41,
    pct: 49,
    urgent: true,
  },
  {
    rank: 4,
    label: 'US 8.5 — Urban Court Low',
    requests: 29,
    pct: 35,
    urgent: false,
  },
];

interface FitMonitorRow {
  id: string;
  name: string;
  subtitle: string;
  sku: string;
  exchangeRate: string;
  reason: string;
  status: 'alert' | 'optimal';
  image: string;
}

const FIT_MONITOR_ROWS: FitMonitorRow[] = [
  {
    id: 'fit-1',
    name: 'TrailBlazer GTX',
    subtitle: 'All-Weather Runner',
    sku: 'STR-TB-GTX-09',
    exchangeRate: '14.8%',
    reason: '78% reason: Runs Small',
    status: 'alert',
    image: '/images/prod-terra-trail.jpg',
  },
  {
    id: 'fit-2',
    name: 'Apex Runner V2',
    subtitle: 'Road Running Edition',
    sku: 'STR-APX-02',
    exchangeRate: '11.2%',
    reason: '65% reason: Runs Large',
    status: 'alert',
    image: '/images/prod-vapor-x.jpg',
  },
  {
    id: 'fit-3',
    name: 'Metro Clog Pro',
    subtitle: 'Urban Recovery Footwear',
    sku: 'STR-MTR-CLG',
    exchangeRate: '2.1%',
    reason: 'Normal distribution',
    status: 'optimal',
    image: '/images/hero-apex-pro.jpg',
  },
  {
    id: 'fit-4',
    name: 'Urban Court Low',
    subtitle: 'Court Classic',
    sku: 'STR-CRT-LW',
    exchangeRate: '3.4%',
    reason: 'Normal distribution',
    status: 'optimal',
    image: '/images/cat-lifestyle.jpg',
  },
];

const KPI_BY_RANGE: Record<
  DateRangeKey,
  {
    revenue: string;
    revDelta: string;
    units: string;
    unitsDelta: string;
    exchangeRate: string;
    lostRev: string;
    waitlistTriggers: string;
  }
> = {
  '30d': {
    revenue: '$148,920',
    revDelta: '+14% vs previous period',
    units: '942',
    unitsDelta: '+8.2% velocity',
    exchangeRate: '4.1%',
    lostRev: '$6,450',
    waitlistTriggers: '184 waitlist triggers',
  },
  '7d': {
    revenue: '$38,410',
    revDelta: '+19% vs previous week',
    units: '248',
    unitsDelta: '+11.4% velocity',
    exchangeRate: '3.8%',
    lostRev: '$1,890',
    waitlistTriggers: '52 waitlist triggers',
  },
  '90d': {
    revenue: '$412,680',
    revDelta: '+22% vs previous quarter',
    units: '2,740',
    unitsDelta: '+15.1% velocity',
    exchangeRate: '4.3%',
    lostRev: '$18,120',
    waitlistTriggers: '519 waitlist triggers',
  },
};

interface AdminAnalyticsViewProps {
  onOpenSizeMatrix: () => void;
}

export default function AdminAnalyticsView({
  onOpenSizeMatrix,
}: AdminAnalyticsViewProps) {
  const [dateRange, setDateRange] = useState<DateRangeKey>('30d');
  const [fitFilter, setFitFilter] = useState<FitFilter>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);

  const kpi = KPI_BY_RANGE[dateRange];

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const filteredModels = useMemo(() => {
    if (fitFilter === 'all') return FIT_MONITOR_ROWS;
    return FIT_MONITOR_ROWS.filter((row) => row.status === fitFilter);
  }, [fitFilter]);

  const handleExportReport = () => {
    const csv = [
      'Model,SKU,Exchange Rate,Primary Return Reason,Fit Status',
      ...filteredModels.map(
        (m) =>
          `"${m.name}",${m.sku},${m.exchangeRate},"${m.reason}",${
            m.status === 'alert' ? 'Update Fit Guide Alert' : 'Fit Optimal'
          }`
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stride-analytics-${dateRange}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported stride-analytics-${dateRange}.csv.`);
  };

  return (
    <>
      {/* Header Row */}
      <div className="bg-[#F8F8F9] px-6 py-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              OPERATIONS &amp; METRICS{' '}
              <span className="text-[#D6361D]">• LIVE STREAM</span>
            </p>
            <h1 className="mt-1 font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
              Footwear Performance &amp; Size Analytics
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-700">
              <Calendar className="h-3.5 w-3.5 text-neutral-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRangeKey)}
                aria-label="Analytics date range"
                className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none"
              >
                <option value="30d">Last 30 Days</option>
                <option value="7d">Last 7 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleExportReport}
              className="inline-flex items-center gap-2 rounded-md bg-[#D6361D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B92A14]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV Report</span>
            </button>
          </div>
        </div>

        {toast && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 space-y-6 p-6 pt-2">
        {/* 4 KPI Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Net Revenue */}
          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-[#D6361D] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                NET FOOTWEAR REVENUE
              </p>
              <Banknote className="h-4 w-4 text-[#D6361D]" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              {kpi.revenue}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>{kpi.revDelta}</span>
            </p>
          </div>

          {/* Units Sold */}
          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-neutral-900 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                UNITS SOLD
              </p>
              <ShoppingBag className="h-4 w-4 text-neutral-700" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              {kpi.units}{' '}
              <span className="text-sm font-normal text-neutral-500">Pairs</span>
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>{kpi.unitsDelta}</span>
            </p>
          </div>

          {/* Avg Size-Exchange Rate */}
          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-amber-500 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                AVG SIZE-EXCHANGE RATE
              </p>
              <ArrowLeftRight className="h-4 w-4 text-amber-500" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              {kpi.exchangeRate}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600">
              <AlertTriangle className="h-3 w-3" />
              <span>Needs review on 2 models</span>
            </p>
          </div>

          {/* Lost Rev (Stockouts) */}
          <div className="rounded-xl border border-neutral-200/80 border-l-2 border-l-rose-600 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                LOST REV. (STOCKOUTS)
              </p>
              <AlertCircle className="h-4 w-4 text-rose-600" strokeWidth={1.8} />
            </div>
            <p className="mt-2 font-editorial text-2xl font-bold text-neutral-900">
              {kpi.lostRev}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600">
              <TrendingDown className="h-3 w-3" />
              <span>{kpi.waitlistTriggers}</span>
            </p>
          </div>
        </div>

        {/* Middle 2-Column Grid: Size Demand Curve + Most-Requested Sold-Out Sizes */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Size Demand Curve */}
          <section className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-6 xl:col-span-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-editorial text-base font-bold text-neutral-900">
                  Size Demand Curve
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Sales distribution across US 6 through US 14 size matrix
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDECE7] px-3 py-1.5 text-[10px] font-semibold text-[#C83B23]">
                <Zap className="h-3 w-3 shrink-0" />
                <span>Peak Demand: US 9.5 (22% of all sales)</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="relative mt-8">
              {/* Subtle horizontal gridlines */}
              <div className="pointer-events-none absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between">
                <div className="h-px bg-neutral-100" />
                <div className="h-px bg-neutral-100" />
                <div className="h-px bg-neutral-100" />
                <div className="h-px bg-neutral-200" />
              </div>

              <div className="relative z-10 grid h-48 grid-cols-13 items-end gap-1.5 pt-6">
                {SIZE_DEMAND.map((point) => {
                  const barHeightPct = Math.max(8, (point.pct / 24) * 100);
                  return (
                    <div
                      key={point.size}
                      className="group flex h-full flex-col items-center justify-end"
                    >
                      {point.highVelocity && (
                        <span className="mb-1.5 rounded bg-neutral-950 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {point.pct}%
                        </span>
                      )}

                      <div
                        className={`w-full max-w-[26px] rounded-t-md transition-all ${
                          point.highVelocity
                            ? 'bg-[#F04E2A] group-hover:bg-[#D6361D]'
                            : 'bg-neutral-200 group-hover:bg-neutral-400'
                        }`}
                        style={{ height: `${barHeightPct}%` }}
                        title={`US ${point.size}: ${point.pct}% of sales`}
                      />

                      <span
                        className={`mt-2 text-[10px] ${
                          point.highVelocity
                            ? 'font-bold text-neutral-900'
                            : 'text-neutral-400'
                        }`}
                      >
                        {point.size}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-4 text-[11px]">
              <span className="text-neutral-500">
                Total Analyzed Volume:{' '}
                <strong className="text-neutral-900">3,420 pairs</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-[#F04E2A]" />
                High Velocity Zone (US 9 – 10)
              </span>
            </div>
          </section>

          {/* Most-Requested Sold-Out Sizes */}
          <section className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-6 xl:col-span-5">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-editorial text-base font-bold text-neutral-900">
                    Most-Requested Sold-Out Sizes
                  </h2>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Active &ldquo;Notify Me&rdquo; waitlist counts across all
                    silhouettes
                  </p>
                </div>
                <Bell className="h-4 w-4 text-neutral-400" strokeWidth={1.8} />
              </div>

              <div className="mt-6 space-y-4">
                {SOLD_OUT_REQUESTS.map((item) => (
                  <div key={item.rank}>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded bg-[#F4F4F5] text-[10px] font-bold text-neutral-600">
                          {item.rank}
                        </span>
                        <span className="font-semibold text-neutral-900">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-bold ${
                          item.urgent ? 'text-[#D6361D]' : 'text-neutral-700'
                        }`}
                      >
                        {item.requests} requests
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className={`h-full rounded-full ${
                          item.urgent ? 'bg-[#D6361D]' : 'bg-neutral-950'
                        }`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-[11px]">
              <span className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                ACTIONABLE RESTOCK SIGNAL
              </span>
              <button
                type="button"
                onClick={() =>
                  showToast('Batch restock order queued for top 4 sold-out SKUs.')
                }
                className="font-bold text-neutral-900 transition-colors hover:text-[#D6361D]"
              >
                Batch Restock Order →
              </button>
            </div>
          </section>
        </div>

        {/* Bottom Full-Width Table: Model Fit & Return Defect Monitor */}
        <section className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
          <div className="flex flex-col justify-between gap-3 p-6 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-editorial text-base font-bold text-neutral-900">
                Model Fit &amp; Return Defect Monitor
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                Real-time telemetry tracking size discrepancy complaints and
                exchange ratios
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                FILTER:
              </span>
              <select
                value={fitFilter}
                onChange={(e) => setFitFilter(e.target.value as FitFilter)}
                aria-label="Filter footwear models"
                className="rounded-md border border-neutral-200 bg-[#F5F5F6] px-3 py-1.5 text-xs font-medium text-neutral-800 focus:border-neutral-400 focus:bg-white focus:outline-none"
              >
                <option value="all">All Silhouettes</option>
                <option value="alert">Needs Fit Review</option>
                <option value="optimal">Fit Optimal</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-y border-neutral-200 bg-[#F8F8F9] text-[10px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                  <th className="px-6 py-3.5">FOOTWEAR MODEL</th>
                  <th className="px-4 py-3.5">SKU ID</th>
                  <th className="px-4 py-3.5">EXCHANGE RATE</th>
                  <th className="px-4 py-3.5">PRIMARY RETURN REASON</th>
                  <th className="px-4 py-3.5">FIT STATUS ALERT</th>
                  <th className="px-6 py-3.5 text-right">ACTION</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredModels.map((model) => (
                  <tr key={model.id} className="hover:bg-neutral-50/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="h-10 w-10 shrink-0 rounded-lg bg-[#F4F4F5] object-cover"
                        />
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {model.name}
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            {model.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 font-mono text-[11px] text-neutral-500">
                      {model.sku}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`font-bold ${
                          model.status === 'alert'
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {model.exchangeRate}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-neutral-600">
                      {model.reason}
                    </td>

                    <td className="px-4 py-4">
                      {model.status === 'alert' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                          <AlertTriangle className="h-3 w-3" />
                          Update Fit Guide Alert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Fit Optimal
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {model.status === 'alert' ? (
                        <button
                          type="button"
                          onClick={onOpenSizeMatrix}
                          className="rounded-md bg-neutral-950 px-3.5 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          Adjust Sizing Matrix
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenSizeMatrix}
                          className="rounded-md bg-[#F4F4F5] px-3.5 py-2 text-[11px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
                        >
                          View Matrix
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 px-6 py-3.5 text-xs">
            <span className="text-[11px] text-neutral-500">
              Showing <strong className="text-neutral-900">{filteredModels.length}</strong> of{' '}
              <strong className="text-neutral-900">28</strong> tracked footwear
              models in current rotation.
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-40"
              >
                Previous
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-7 w-7 rounded text-[11px] font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-neutral-950 text-white'
                      : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === 3}
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                className="rounded border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
