import { useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ListFilter,
} from 'lucide-react';

type RmaTab = 'all' | 'exchanges' | 'refunds';

interface RmaRow {
  id: string;
  orderNumber: string;
  customer: string;
  location: string;
  itemName: string;
  originalSize: string;
  type: 'exchange' | 'refund';
  targetLabel: string;
  reason: string;
  stockStatus: string;
  stockTone: 'green' | 'blue' | 'amber';
  actionLabel: 'Approve & Ship' | 'Issue Refund' | 'Process Claim';
  actionStyle: 'primary' | 'outline';
  completedLabel?: string;
}

const INITIAL_RMA_ROWS: RmaRow[] = [
  {
    id: '#RMA-402',
    orderNumber: '#SH-8942',
    customer: 'Nimal Perera',
    location: 'Colombo, LK',
    itemName: 'AeroStride Velocity X',
    originalSize: 'US 9.5',
    type: 'exchange',
    targetLabel: 'US 10 →',
    reason: 'Too Small / Tight',
    stockStatus: '14 in stock (Res.)',
    stockTone: 'green',
    actionLabel: 'Approve & Ship',
    actionStyle: 'primary',
  },
  {
    id: '#RMA-401',
    orderNumber: '#SH-8910',
    customer: 'Sarah Jenkins',
    location: 'Austin, TX',
    itemName: 'Court Classic Low',
    originalSize: 'US 7',
    type: 'refund',
    targetLabel: 'REFUND ($120)',
    reason: 'Changed Mind',
    stockStatus: 'Inspected — Restockable',
    stockTone: 'blue',
    actionLabel: 'Issue Refund',
    actionStyle: 'outline',
  },
  {
    id: '#RMA-400',
    orderNumber: '#SH-8905',
    customer: 'Marcus Vance',
    location: 'Brooklyn, NY',
    itemName: 'Kinetics Runner Prime',
    originalSize: 'US 11',
    type: 'exchange',
    targetLabel: 'US 11.5 →',
    reason: 'Too Small / Tight',
    stockStatus: '6 in stock (Res.)',
    stockTone: 'green',
    actionLabel: 'Approve & Ship',
    actionStyle: 'primary',
  },
  {
    id: '#RMA-399',
    orderNumber: '#SH-8890',
    customer: 'Elena Rostova',
    location: 'Berlin, DE',
    itemName: 'AeroStride Velocity X',
    originalSize: 'US 8.5',
    type: 'refund',
    targetLabel: 'REFUND ($180)',
    reason: 'Defective Item',
    stockStatus: 'Quarantined',
    stockTone: 'amber',
    actionLabel: 'Process Claim',
    actionStyle: 'primary',
  },
  {
    id: '#RMA-398',
    orderNumber: '#SH-8874',
    customer: 'David Kim',
    location: 'Seoul, KR',
    itemName: 'Salomon XT-6',
    originalSize: 'US 10',
    type: 'exchange',
    targetLabel: 'US 10.5 →',
    reason: 'Too Large / Loose',
    stockStatus: '22 in stock (Res.)',
    stockTone: 'green',
    actionLabel: 'Approve & Ship',
    actionStyle: 'primary',
  },
];

export default function AdminReturnsExchangesView() {
  const [activeTab, setActiveTab] = useState<RmaTab>('exchanges');
  const [rows, setRows] = useState<RmaRow[]>(INITIAL_RMA_ROWS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pendingCount, setPendingCount] = useState<number>(11);
  const [onlyPending, setOnlyPending] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const visibleRows = useMemo(() => {
    return rows.filter((row) => {
      if (onlyPending && row.completedLabel) return false;
      if (activeTab === 'refunds') return row.type === 'refund';
      return true;
    });
  }, [rows, activeTab, onlyPending]);

  const handleRowAction = (row: RmaRow) => {
    const doneText =
      row.actionLabel === 'Approve & Ship'
        ? 'Approved & Shipped'
        : row.actionLabel === 'Issue Refund'
          ? 'Refund Issued'
          : 'Claim Processed';

    setRows((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, completedLabel: doneText } : item
      )
    );
    setPendingCount((c) => Math.max(0, c - 1));
    showToast(`${row.id} (${row.customer}) — ${doneText}.`);
  };

  const handleExportCsv = () => {
    const header = [
      'RMA ID',
      'Order',
      'Customer',
      'Location',
      'Item',
      'Original Size',
      'Target',
      'Reason',
      'Stock Status',
    ];
    const csvRows = [
      header.join(','),
      ...visibleRows.map((r) =>
        [
          r.id,
          r.orderNumber,
          `"${r.customer}"`,
          `"${r.location}"`,
          `"${r.itemName}"`,
          r.originalSize,
          `"${r.targetLabel}"`,
          `"${r.reason}"`,
          `"${r.stockStatus}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stride-rma-requests.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported RMA table to stride-rma-requests.csv.');
  };

  return (
    <>
      {/* Header + KPI Pills */}
      <div className="bg-[#F8F8F9] px-6 pt-6 pb-4">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
          <div>
            <h1 className="font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
              Returns &amp; Size Exchanges (RMA)
            </h1>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-neutral-500">
              Manage customer return requests, inventory reservations, and
              automated size-exchanges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2.5 rounded-lg border border-neutral-200/80 bg-white px-3.5 py-2 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#D6361D]" />
              <span className="text-[10px] font-semibold tracking-[0.1em] text-neutral-500 uppercase">
                PENDING APPROVAL
              </span>
              <span className="font-editorial text-sm font-bold text-neutral-900">
                {pendingCount}
              </span>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-lg border border-neutral-200/80 bg-white px-3.5 py-2 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
              <span className="text-[10px] font-semibold tracking-[0.1em] text-neutral-500 uppercase">
                IN-TRANSIT RETURNS
              </span>
              <span className="font-editorial text-sm font-bold text-neutral-900">
                19
              </span>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-lg border border-neutral-200/80 bg-white px-3.5 py-2 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold tracking-[0.1em] text-neutral-500 uppercase">
                RESERVED PAIRS
              </span>
              <span className="font-editorial text-sm font-bold text-neutral-900">
                8
              </span>
            </div>
          </div>
        </div>

        {/* Tabs & Filter/Export Bar */}
        <div className="mt-6 flex flex-col justify-between gap-3 border-b border-neutral-200/90 sm:flex-row sm:items-end">
          <div className="flex items-center gap-6 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`border-b-2 pb-3 transition-colors ${
                activeTab === 'all'
                  ? 'border-neutral-900 font-semibold text-neutral-900'
                  : 'border-transparent font-medium text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All Requests (38)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('exchanges')}
              className={`border-b-2 pb-3 transition-colors ${
                activeTab === 'exchanges'
                  ? 'border-neutral-900 font-semibold text-neutral-900'
                  : 'border-transparent font-medium text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Size Exchanges (24)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('refunds')}
              className={`border-b-2 pb-3 transition-colors ${
                activeTab === 'refunds'
                  ? 'border-neutral-900 font-semibold text-neutral-900'
                  : 'border-transparent font-medium text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Refund Requests (14)
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              type="button"
              onClick={() => setOnlyPending((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                onlyPending
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>{onlyPending ? 'Pending Only' : 'Filter'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
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

      {/* RMA Table */}
      <main className="flex-1 p-6 pt-4">
        <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#F8F8F9] text-[10px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                  <th className="px-4 py-3.5">RMA ID &amp; ORDER</th>
                  <th className="px-4 py-3.5">CUSTOMER</th>
                  <th className="px-4 py-3.5">RETURNED ITEM &amp; SIZE</th>
                  <th className="px-4 py-3.5">EXCHANGE TARGET</th>
                  <th className="px-4 py-3.5">REASON</th>
                  <th className="px-4 py-3.5">STOCK STATUS</th>
                  <th className="px-4 py-3.5 text-right">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {visibleRows.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-50/70">
                    {/* RMA ID & Order */}
                    <td className="px-4 py-4">
                      <p className="font-editorial text-xs font-bold text-neutral-900">
                        {row.id}
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-400">
                        {row.orderNumber}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-neutral-900">
                        {row.customer}
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-400">
                        {row.location}
                      </p>
                    </td>

                    {/* Returned Item & Size */}
                    <td className="px-4 py-4">
                      <p className="font-semibold text-neutral-900">
                        {row.itemName}
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-400">
                        {row.originalSize}
                      </p>
                    </td>

                    {/* Exchange Target */}
                    <td className="px-4 py-4">
                      {row.type === 'exchange' ? (
                        <span className="inline-flex items-center rounded-full bg-neutral-950 px-3 py-1 text-[11px] font-bold text-white">
                          {row.targetLabel}
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold tracking-wide text-[#C83B23]">
                          {row.targetLabel}
                        </span>
                      )}
                    </td>

                    {/* Reason */}
                    <td className="px-4 py-4">
                      <span className="inline-block rounded bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-medium text-neutral-600">
                        {row.reason}
                      </span>
                    </td>

                    {/* Stock Status */}
                    <td className="px-4 py-4">
                      {row.stockTone === 'green' && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {row.stockStatus}
                        </span>
                      )}
                      {row.stockTone === 'blue' && (
                        <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                          {row.stockStatus}
                        </span>
                      )}
                      {row.stockTone === 'amber' && (
                        <span className="inline-block rounded-md bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                          {row.stockStatus}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      {row.completedLabel ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
                          <Check className="h-3.5 w-3.5" />
                          {row.completedLabel}
                        </span>
                      ) : row.actionStyle === 'outline' ? (
                        <button
                          type="button"
                          onClick={() => handleRowAction(row)}
                          className="rounded-md border border-neutral-300 bg-white px-3.5 py-2 text-[11px] font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                        >
                          {row.actionLabel}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRowAction(row)}
                          className="rounded-md bg-[#F04E2A] px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#D94120]"
                        >
                          {row.actionLabel}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 px-5 py-3.5 text-xs">
            <span className="text-[11px] text-neutral-400">
              Showing 1-{visibleRows.length} of 24 size exchange requests
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                className="flex h-7 w-7 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
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
                disabled={currentPage === 5}
                onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                aria-label="Next page"
                className="flex h-7 w-7 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-40"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
