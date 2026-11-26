import { useMemo, useState, type FormEvent } from 'react';
import { Bell, Check, Clock, ListFilter, Tag, Zap } from 'lucide-react';

interface PromoRow {
  id: string;
  code: string;
  rule: string;
  appliesTo: string;
  redemptionsText: string;
  progressPercent: number;
  expiryDate: string;
  active: boolean;
}

const INITIAL_PROMOS: PromoRow[] = [
  {
    id: 'promo-1',
    code: 'RUN20',
    rule: '20% Off Running Shoes',
    appliesTo: "Men's Running",
    redemptionsText: '214 / 500 used',
    progressPercent: 43,
    expiryDate: 'Oct 31, 2024',
    active: true,
  },
  {
    id: 'promo-2',
    code: 'PAIR2SAVE',
    rule: 'Buy 2 Pairs, Get $30 Off',
    appliesTo: 'All Footwear',
    redemptionsText: '89 used',
    progressPercent: 18,
    expiryDate: 'Nov 15, 2024',
    active: true,
  },
  {
    id: 'promo-3',
    code: 'FIRSTSTEP15',
    rule: '$15 Off First Order',
    appliesTo: 'New Customers',
    redemptionsText: '412 used',
    progressPercent: 82,
    expiryDate: 'Dec 31, 2024',
    active: true,
  },
];

export default function AdminPromotionsView() {
  const [limitOnePerCustomer, setLimitOnePerCustomer] = useState(true);
  const [promos, setPromos] = useState<PromoRow[]>(INITIAL_PROMOS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>(
    'all'
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newAppliesTo, setNewAppliesTo] = useState('All Footwear');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  const visiblePromos = useMemo(() => {
    return promos.filter((p) => {
      if (statusFilter === 'active') return p.active;
      if (statusFilter === 'inactive') return !p.active;
      return true;
    });
  }, [promos, statusFilter]);

  const togglePromoStatus = (id: string) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const handleCreatePromo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = newCode.trim().toUpperCase();
    if (!cleaned || !newRule.trim()) return;

    const created: PromoRow = {
      id: `promo-${Date.now()}`,
      code: cleaned,
      rule: newRule.trim(),
      appliesTo: newAppliesTo,
      redemptionsText: '0 used',
      progressPercent: 2,
      expiryDate: 'Jan 31, 2025',
      active: true,
    };

    setPromos((prev) => [created, ...prev]);
    setNewCode('');
    setNewRule('');
    setShowCreateForm(false);
    showToast(`Promo code ${cleaned} created and activated.`);
  };

  return (
    <>
      {/* Header Row */}
      <div className="bg-[#F8F8F9] px-6 py-5">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <h1 className="font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
              Promotions &amp; Drop Campaigns
            </h1>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-neutral-500">
              Manage limited-edition sneaker releases, global countdowns, and
              high-conversion discount codes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() =>
                showToast('Sneaker Drop scheduler opened for Q4 releases.')
              }
              className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>+ Schedule Sneaker Drop</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-md bg-[#F04E2A] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#D94120]"
            >
              <Tag className="h-3.5 w-3.5" />
              <span>+ Create Promo Code</span>
            </button>
          </div>
        </div>

        {toast && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}

        {/* Inline Quick-Create Promo Form */}
        {showCreateForm && (
          <form
            onSubmit={handleCreatePromo}
            className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-neutral-200 bg-white p-4 sm:grid-cols-4"
          >
            <input
              type="text"
              required
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Code (e.g. STRIDE25)"
              aria-label="Promo code"
              className="rounded-md border border-neutral-200 bg-[#F4F4F5] px-3 py-2 text-xs font-semibold uppercase focus:border-neutral-400 focus:bg-white focus:outline-none"
            />
            <input
              type="text"
              required
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="Discount rule (e.g. 25% Off Carbon)"
              aria-label="Discount rule"
              className="rounded-md border border-neutral-200 bg-[#F4F4F5] px-3 py-2 text-xs focus:border-neutral-400 focus:bg-white focus:outline-none"
            />
            <select
              value={newAppliesTo}
              onChange={(e) => setNewAppliesTo(e.target.value)}
              aria-label="Applies to"
              className="rounded-md border border-neutral-200 bg-[#F4F4F5] px-3 py-2 text-xs focus:border-neutral-400 focus:bg-white focus:outline-none"
            >
              <option>All Footwear</option>
              <option>Men&apos;s Running</option>
              <option>New Customers</option>
            </select>
            <button
              type="submit"
              className="rounded-md bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Save Promo Code
            </button>
          </form>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 space-y-6 p-6 pt-2">
        {/* Featured Upcoming Drop Card */}
        <section className="rounded-xl border border-neutral-200/80 bg-white p-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            {/* Left Sneaker Visual */}
            <div className="relative overflow-hidden rounded-xl bg-[#EAEAEF] lg:col-span-4">
              <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-neutral-950/90 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F04E2A]" />
                FEATURED DROP
              </span>

              <img
                src="/images/prod-kinetic.jpg"
                alt="Velocity X Carbon Midnight Edition"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* Right Drop Details */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#D6361D] uppercase">
                  UPCOMING RELEASE
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F4F4F5] px-3 py-1.5 text-[11px] text-neutral-600">
                  <Clock className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Drops in</span>
                  <strong className="font-mono font-bold text-neutral-900">
                    02d : 14h : 30m
                  </strong>
                </span>
              </div>

              <h2 className="mt-2 font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
                Velocity X Carbon — Midnight Edition
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-500">
                Engineered with a full-length carbon fiber plate and
                nitrogen-infused foam. Strictly limited to 1,500 pairs
                worldwide.
              </p>

              {/* Security Control & Demand Metric */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl bg-[#F5F5F6] px-4 py-3.5">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                      SECURITY CONTROL
                    </p>
                    <p className="mt-1 text-xs font-bold text-neutral-900">
                      Limit 1 Pair Per Customer
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={limitOnePerCustomer}
                    aria-label="Limit 1 Pair Per Customer"
                    onClick={() => setLimitOnePerCustomer((prev) => !prev)}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                      limitOnePerCustomer ? 'bg-[#F04E2A]' : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                        limitOnePerCustomer ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#F5F5F6] px-4 py-3.5">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                      DEMAND METRIC
                    </p>
                    <p className="mt-1 font-editorial text-base font-bold text-neutral-900">
                      420 Signups
                    </p>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDECE7] text-[#F04E2A]">
                    <Bell className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Discount & Coupon Table */}
        <section className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white">
          <div className="flex flex-col justify-between gap-3 p-6 pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-editorial text-base font-bold text-neutral-900 sm:text-lg">
                Active Discount &amp; Coupon Table
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                Manage automated discount rules and promotional coupon codes.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 sm:self-auto">
              <ListFilter className="h-3.5 w-3.5 text-neutral-500" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as 'all' | 'active' | 'inactive'
                  )
                }
                aria-label="Filter coupon status"
                className="bg-transparent text-xs font-medium text-neutral-800 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[740px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-y border-neutral-200 bg-[#F8F8F9] text-[10px] font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                  <th className="px-6 py-3.5">PROMO CODE</th>
                  <th className="px-4 py-3.5">DISCOUNT RULE</th>
                  <th className="px-4 py-3.5">APPLIES TO</th>
                  <th className="px-4 py-3.5">REDEMPTIONS</th>
                  <th className="px-4 py-3.5">EXPIRY DATE</th>
                  <th className="px-6 py-3.5 text-right">STATUS TOGGLE</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {visiblePromos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-neutral-50/70">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-neutral-900">
                      {promo.code}
                    </td>

                    <td className="px-4 py-4 font-medium text-neutral-700">
                      {promo.rule}
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-block rounded-md bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-semibold text-neutral-700">
                        {promo.appliesTo}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="min-w-[82px] text-[11px] font-medium text-neutral-700">
                          {promo.redemptionsText}
                        </span>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-200">
                          <div
                            className="h-full rounded-full bg-[#F04E2A]"
                            style={{ width: `${promo.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-neutral-600">
                      {promo.expiryDate}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={promo.active}
                        aria-label={`Toggle ${promo.code}`}
                        onClick={() => togglePromoStatus(promo.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          promo.active ? 'bg-[#F04E2A]' : 'bg-neutral-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                            promo.active ? 'translate-x-4.5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
