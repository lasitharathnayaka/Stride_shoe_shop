import { useState } from 'react';
import {
  ArrowLeft,
  Barcode,
  Box,
  Check,
  CheckCircle2,
  Printer,
  Truck,
  User,
} from 'lucide-react';

interface PickItem {
  id: string;
  name: string;
  sizeSpec: string;
  colorway: string;
  bin: string;
  qty: number;
  image: string;
  scanned: boolean;
}

interface TimelineEntry {
  id: string;
  title: string;
  time: string;
  description: string;
  solid?: boolean;
}

const INITIAL_PICK_ITEMS: PickItem[] = [
  {
    id: 'pick-1',
    name: 'Nike Air Max Scorpion FK',
    sizeSpec: 'US 9.5 • Standard D',
    colorway: 'Solar Coral',
    bin: 'Bin: Aisle 4 • Shelf B2',
    qty: 1,
    image: '/images/cat-running.jpg',
    scanned: true,
  },
  {
    id: 'pick-2',
    name: 'Salomon XT-6 Advanced',
    sizeSpec: 'US 10.0 • Wide',
    colorway: 'Solar Coral',
    bin: 'Bin: Aisle 2 • Shelf A8',
    qty: 1,
    image: '/images/prod-vapor-x.jpg',
    scanned: true,
  },
];

const INITIAL_TIMELINE: TimelineEntry[] = [
  {
    id: 'tl-1',
    title: 'Stock Reserved',
    time: '10:14 AM',
    description: 'Inventory allocated across 2 fulfillment zones automatically.',
  },
  {
    id: 'tl-2',
    title: 'Payment Captured',
    time: '10:14 AM',
    description: 'Auth successful via Visa ending in 4092 ($420.00 USD).',
  },
  {
    id: 'tl-3',
    title: 'Order Placed',
    time: '10:13 AM',
    description: 'Checkout completed from storefront (IP: 192.0.2.45).',
    solid: true,
  },
];

interface AdminOrderFulfillmentViewProps {
  onBackToProducts: () => void;
}

export default function AdminOrderFulfillmentView({
  onBackToProducts,
}: AdminOrderFulfillmentViewProps) {
  const [verifyScan, setVerifyScan] = useState(true);
  const [pickItems, setPickItems] = useState<PickItem[]>(INITIAL_PICK_ITEMS);
  const [carrier, setCarrier] = useState('DHL Express Worldwide');
  const [trackingNumber, setTrackingNumber] = useState('TRK-88492011');
  const [orderStatus, setOrderStatus] = useState<'Ready to Pack' | 'Shipped'>(
    'Ready to Pack'
  );
  const [timeline, setTimeline] = useState<TimelineEntry[]>(INITIAL_TIMELINE);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  const toggleItemScanned = (id: string) => {
    setPickItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, scanned: !item.scanned } : item
      )
    );
  };

  const handleMarkShipped = () => {
    if (orderStatus === 'Shipped') return;
    setOrderStatus('Shipped');
    setTimeline((prev) => [
      {
        id: `tl-${Date.now()}`,
        title: 'Dispatched & Customer Notified',
        time: 'Just now',
        description: `Handed off to ${carrier} (${trackingNumber}). Tracking email sent to marcus.v@example.com.`,
      },
      ...prev,
    ]);
    showToast('Order #SH-90412 marked as shipped and customer notified.');
  };

  return (
    <>
      {/* Page Header Bar */}
      <div className="border-b border-neutral-200/80 bg-[#F8F8F9] px-6 py-5">
        <button
          type="button"
          onClick={onBackToProducts}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>All Orders</span>
        </button>

        <div className="mt-1.5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-editorial text-xl font-bold text-neutral-900 sm:text-2xl">
              Order #SH-90412
            </h1>

            <span className="rounded-full bg-[#E8F4FA] px-2.5 py-0.5 text-[10px] font-semibold text-[#1D6B8F]">
              Paid • Visa
            </span>

            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                orderStatus === 'Shipped'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-[#FDECE7] text-[#C84323]'
              }`}
            >
              {orderStatus}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 shadow-2xs transition-colors hover:bg-neutral-50"
            >
              <Printer className="h-3.5 w-3.5 text-neutral-600" />
              <span>Print Packing Slip</span>
            </button>

            <button
              type="button"
              onClick={() =>
                showToast(`Shipping label generated for ${trackingNumber}.`)
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#F04E2A] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#D94120]"
            >
              <Truck className="h-3.5 w-3.5" />
              <span>Generate Shipping Label</span>
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

      {/* Main 2-Column Fulfillment Workspace */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
          {/* Left Column: Items to Pick + Fulfillment Timeline Log */}
          <div className="space-y-6 xl:col-span-8">
            {/* Items to Pick */}
            <section className="rounded-xl border border-neutral-200/80 bg-white p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-editorial text-base font-bold text-neutral-900">
                    Items to Pick ({pickItems.length} Pairs)
                  </h2>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Verify each item via barcode scanning before boxing.
                  </p>
                </div>

                <div className="inline-flex items-center gap-3 self-start rounded-lg bg-[#F4F4F5] px-3.5 py-2 sm:self-auto">
                  <span className="text-[11px] font-semibold text-neutral-800">
                    Verify Barcode Scan
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={verifyScan}
                    aria-label="Verify Barcode Scan"
                    onClick={() => setVerifyScan((prev) => !prev)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      verifyScan ? 'bg-[#F04E2A]' : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                        verifyScan ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Pick List Rows */}
              <div className="mt-5 space-y-3.5">
                {pickItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-4 rounded-xl bg-[#F4F4F5] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => toggleItemScanned(item.id)}
                        aria-label={`Toggle scanned status for ${item.name}`}
                        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-xs transition-colors ${
                          item.scanned
                            ? 'bg-[#F04E2A] text-white'
                            : 'border border-neutral-300 bg-white'
                        }`}
                      >
                        {item.scanned && (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        )}
                      </button>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 shrink-0 rounded-lg bg-white object-cover"
                      />

                      <div>
                        <h3 className="font-editorial text-sm font-bold text-neutral-900">
                          {item.name}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="rounded bg-white px-2 py-0.5 font-semibold text-neutral-800 shadow-2xs">
                            {item.sizeSpec}
                          </span>
                          <span className="text-neutral-500">
                            {item.colorway}
                          </span>
                        </div>
                        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-medium text-neutral-500">
                          <Box className="h-3 w-3 text-neutral-400" />
                          <span>{item.bin}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <span className="text-xs font-bold text-neutral-900">
                        Qty: {item.qty}
                      </span>
                      <span
                        className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                          item.scanned
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {item.scanned ? 'Scanned ✓' : 'Pending Scan'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fulfillment Timeline Log */}
            <section className="rounded-xl border border-neutral-200/80 bg-white p-6">
              <h2 className="font-editorial text-base font-bold text-neutral-900">
                Fulfillment Timeline Log
              </h2>

              <ol className="mt-5 space-y-5 border-l border-neutral-200 pl-5">
                {timeline.map((entry) => (
                  <li key={entry.id} className="relative">
                    <span
                      className={`absolute top-1 -left-[25px] h-2.5 w-2.5 rounded-full border-2 ${
                        entry.solid
                          ? 'border-neutral-900 bg-neutral-900'
                          : 'border-neutral-900 bg-white'
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="text-xs font-bold text-neutral-900">
                        {entry.title}
                      </p>
                      <span className="text-[10px] font-medium text-neutral-400">
                        {entry.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {entry.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right Column: Customer & Shipping + Courier Dispatch */}
          <div className="space-y-6 xl:col-span-4">
            {/* Customer & Shipping */}
            <section className="rounded-xl border border-neutral-200/80 bg-white p-6">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-editorial text-base font-bold leading-snug text-neutral-900">
                  Customer &amp;
                  <br />
                  Shipping
                </h2>
                <span className="rounded-md bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-semibold text-neutral-700">
                  Express Next-Day
                </span>
              </div>

              <div className="mt-5 flex items-start gap-3 border-t border-neutral-100 pt-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-neutral-600">
                  <User className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div className="text-xs">
                  <p className="font-bold text-neutral-900">Marcus Vance</p>
                  <p className="mt-0.5 text-neutral-500">+1 (555) 382-9910</p>
                  <p className="text-neutral-500">marcus.v@example.com</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  SHIPPING ADDRESS
                </p>
                <p className="mt-1.5 text-xs font-bold text-neutral-900">
                  742 Evergreen Terrace, Suite 4B
                </p>
                <p className="text-xs text-neutral-600">Springfield, OR 97477</p>

                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Address Verified by USPS CASS</span>
                </div>
              </div>
            </section>

            {/* Courier Dispatch */}
            <section className="rounded-xl border border-neutral-200/80 bg-white p-6">
              <h2 className="font-editorial text-base font-bold text-neutral-900">
                Courier Dispatch
              </h2>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="admin-carrier"
                    className="block text-[11px] font-medium text-neutral-500"
                  >
                    Carrier Service
                  </label>
                  <select
                    id="admin-carrier"
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-neutral-200 bg-[#F4F4F5] px-3.5 py-2.5 text-xs font-medium text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                  >
                    <option>DHL Express Worldwide</option>
                    <option>FedEx Priority Overnight</option>
                    <option>UPS Next Day Air</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="admin-tracking"
                    className="block text-[11px] font-medium text-neutral-500"
                  >
                    Tracking Number
                  </label>
                  <div className="relative mt-1.5">
                    <Barcode className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                    <input
                      id="admin-tracking"
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full rounded-lg border border-neutral-200 bg-[#F4F4F5] py-2.5 pr-3 pl-9 font-mono text-xs font-semibold text-neutral-900 focus:border-neutral-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleMarkShipped}
                  disabled={orderStatus === 'Shipped'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:bg-emerald-700 disabled:opacity-100"
                >
                  <Truck className="h-4 w-4 shrink-0" />
                  <span>
                    {orderStatus === 'Shipped'
                      ? 'Shipped & Customer Notified ✓'
                      : 'Mark as Shipped & Notify Customer'}
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
