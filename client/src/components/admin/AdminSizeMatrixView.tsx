import { useMemo, useState } from 'react';
import { Check, Plus, RefreshCw } from 'lucide-react';

const MATRIX_SIZES = [
  'US 7',
  'US 8',
  'US 8.5',
  'US 9',
  'US 9.5',
  'US 10',
  'US 10.5',
  'US 11',
  'US 12',
];

interface MatrixProductRow {
  id: string;
  name: string;
  sku: string;
  category: 'Running' | 'Lifestyle' | 'Trail';
  image: string;
  stockBySize: Record<string, number>;
}

const INITIAL_MATRIX: MatrixProductRow[] = [
  {
    id: 'mx-1',
    name: 'AeroStride Velocity X',
    sku: 'AS-VX-BASE-001',
    category: 'Running',
    image: '/images/prod-vapor-x.jpg',
    stockBySize: {
      'US 7': 14,
      'US 8': 28,
      'US 8.5': 42,
      'US 9': 64,
      'US 9.5': 12,
      'US 10': 0,
      'US 10.5': 19,
      'US 11': 25,
      'US 12': 11,
    },
  },
  {
    id: 'mx-2',
    name: 'TrailBlazer GTX',
    sku: 'STR-TB-GTX-09',
    category: 'Trail',
    image: '/images/prod-terra-trail.jpg',
    stockBySize: {
      'US 7': 18,
      'US 8': 22,
      'US 8.5': 16,
      'US 9': 9,
      'US 9.5': 0,
      'US 10': 6,
      'US 10.5': 24,
      'US 11': 19,
      'US 12': 8,
    },
  },
  {
    id: 'mx-3',
    name: 'Apex Runner V2',
    sku: 'STR-APX-02',
    category: 'Running',
    image: '/images/cat-running.jpg',
    stockBySize: {
      'US 7': 20,
      'US 8': 31,
      'US 8.5': 26,
      'US 9': 15,
      'US 9.5': 4,
      'US 10': 0,
      'US 10.5': 18,
      'US 11': 14,
      'US 12': 10,
    },
  },
  {
    id: 'mx-4',
    name: 'Kinetics Runner Prime',
    sku: 'STR-KIN-PRM',
    category: 'Lifestyle',
    image: '/images/prod-kinetic.jpg',
    stockBySize: {
      'US 7': 15,
      'US 8': 24,
      'US 8.5': 19,
      'US 9': 32,
      'US 9.5': 28,
      'US 10': 22,
      'US 10.5': 17,
      'US 11': 6,
      'US 12': 12,
    },
  },
  {
    id: 'mx-5',
    name: 'Urban Court Low',
    sku: 'STR-CRT-LW',
    category: 'Lifestyle',
    image: '/images/cat-lifestyle.jpg',
    stockBySize: {
      'US 7': 25,
      'US 8': 29,
      'US 8.5': 0,
      'US 9': 36,
      'US 9.5': 41,
      'US 10': 33,
      'US 10.5': 21,
      'US 11': 18,
      'US 12': 14,
    },
  },
];

export default function AdminSizeMatrixView() {
  const [rows, setRows] = useState<MatrixProductRow[]>(INITIAL_MATRIX);
  const [categoryFilter, setCategoryFilter] = useState<
    'All' | 'Running' | 'Lifestyle' | 'Trail'
  >('All');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const filteredRows = useMemo(() => {
    if (categoryFilter === 'All') return rows;
    return rows.filter((r) => r.category === categoryFilter);
  }, [rows, categoryFilter]);

  const handleCellRestock = (rowId: string, size: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              stockBySize: {
                ...row.stockBySize,
                [size]: (row.stockBySize[size] ?? 0) + 10,
              },
            }
          : row
      )
    );
    showToast(`Added +10 pairs to ${size} warehouse allocation.`);
  };

  const handleAutoReplenish = () => {
    let replenishedCount = 0;
    setRows((prev) =>
      prev.map((row) => {
        const updated = { ...row.stockBySize };
        MATRIX_SIZES.forEach((size) => {
          if ((updated[size] ?? 0) < 15) {
            updated[size] = 25;
            replenishedCount += 1;
          }
        });
        return { ...row, stockBySize: updated };
      })
    );
    showToast(
      replenishedCount > 0
        ? `Auto-replenished ${replenishedCount} low/out-of-stock size cells to 25 pairs.`
        : 'All size cells are already above threshold.'
    );
  };

  const getCellStyle = (qty: number) => {
    if (qty === 0) {
      return 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100';
    }
    if (qty < 15) {
      return 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100';
    }
    return 'border-emerald-200/70 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100';
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#F8F8F9] px-6 py-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              INVENTORY TELEMETRY
            </p>
            <h1 className="mt-1 font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
              Global Footwear Size Matrix
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value as 'All' | 'Running' | 'Lifestyle' | 'Trail'
                )
              }
              aria-label="Filter matrix by category"
              className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 focus:border-neutral-400 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Running">Running</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Trail">Trail</option>
            </select>

            <button
              type="button"
              onClick={handleAutoReplenish}
              className="inline-flex items-center gap-2 rounded-md bg-[#F04E2A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#D94120]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Auto-Replenish Low Stock</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-5 text-[11px] text-neutral-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-emerald-300 bg-emerald-100" />
            Healthy (15+ pairs)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-amber-300 bg-amber-100" />
            Low Stock (1–14 pairs)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-rose-300 bg-rose-100" />
            Out of Stock (0)
          </span>
          <span className="text-neutral-400">
            • Click any cell to quick-add +10 pairs
          </span>
        </div>

        {toast && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      {/* Heatmap Table */}
      <main className="flex-1 p-6 pt-2">
        <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#F8F8F9] text-[10px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                  <th className="px-5 py-3.5">SILHOUETTE / SKU</th>
                  {MATRIX_SIZES.map((size) => (
                    <th key={size} className="px-2 py-3.5 text-center">
                      {size}
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-right">TOTAL</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredRows.map((row) => {
                  const rowTotal = MATRIX_SIZES.reduce(
                    (sum, size) => sum + (row.stockBySize[size] ?? 0),
                    0
                  );

                  return (
                    <tr key={row.id} className="hover:bg-neutral-50/50">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={row.image}
                            alt={row.name}
                            className="h-10 w-10 shrink-0 rounded-lg bg-[#F4F4F5] object-cover"
                          />
                          <div>
                            <p className="font-semibold text-neutral-900">
                              {row.name}
                            </p>
                            <p className="font-mono text-[10px] text-neutral-400">
                              {row.sku} • {row.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {MATRIX_SIZES.map((size) => {
                        const qty = row.stockBySize[size] ?? 0;
                        return (
                          <td key={size} className="px-1.5 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleCellRestock(row.id, size)}
                              title={`Click to add +10 pairs to ${row.name} (${size})`}
                              className={`group relative mx-auto flex h-9 w-12 items-center justify-center rounded-md border font-mono text-xs font-bold transition-colors ${getCellStyle(
                                qty
                              )}`}
                            >
                              <span className="group-hover:hidden">{qty}</span>
                              <span className="hidden items-center gap-0.5 text-[10px] group-hover:inline-flex">
                                <Plus className="h-2.5 w-2.5" />
                                10
                              </span>
                            </button>
                          </td>
                        );
                      })}

                      <td className="px-5 py-3.5 text-right font-mono text-xs font-bold text-neutral-900">
                        {rowTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
