import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  QrCode,
  Truck,
  Zap,
} from 'lucide-react';

type ExchangeReason =
  | 'Too Small / Tight'
  | 'Too Large / Loose'
  | 'Changed Mind'
  | 'Defective Item';

type DropOffMethod = 'courier' | 'partner';

interface ReplacementSizeOption {
  label: string;
  available: boolean;
  recommended?: boolean;
  statusText: string;
}

const REASONS: ExchangeReason[] = [
  'Too Small / Tight',
  'Too Large / Loose',
  'Changed Mind',
  'Defective Item',
];

const REPLACEMENT_SIZES: ReplacementSizeOption[] = [
  { label: 'US 9', available: false, statusText: 'Out of Stock' },
  {
    label: 'US 10',
    available: true,
    recommended: true,
    statusText: 'In Stock — Reserved for You',
  },
  { label: 'US 10.5', available: true, statusText: 'In Stock' },
  { label: 'US 11', available: true, statusText: 'Low Stock' },
];

export default function ExchangeReturnPage() {
  const [reason, setReason] = useState<ExchangeReason>('Too Small / Tight');
  const [selectedSize, setSelectedSize] = useState<string>('US 10');
  const [dropOff, setDropOff] = useState<DropOffMethod>('courier');
  const [confirmed, setConfirmed] = useState<boolean>(false);

  if (confirmed) {
    return (
      <div className="bg-[#FAFAFA] py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200/80 bg-white p-8 text-center shadow-xs sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
            EXCHANGE CONFIRMED • ORDER #SH-8942
          </p>
          <h1 className="mt-1.5 font-editorial text-2xl font-semibold text-neutral-900">
            Size Exchange Reserved
          </h1>
          <p className="mt-2.5 text-xs leading-relaxed text-neutral-500">
            Your replacement <span className="font-semibold text-neutral-900">AeroStride Velocity X ({selectedSize})</span> is reserved.{' '}
            {dropOff === 'courier'
              ? 'Our courier will pick up your US 9.5 pair tomorrow between 9 AM – 1 PM.'
              : 'Your instant digital drop-off QR code has been emailed to alex.mercer@studio.net.'}
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              to="/dashboard"
              className="rounded-md bg-neutral-900 px-6 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Back to My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] py-10 lg:py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to My Orders</span>
        </Link>

        {/* Header + 3-Step Indicator */}
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              ORDER #SH-8942
            </p>
            <h1 className="mt-1 font-editorial text-xl font-semibold text-neutral-900 sm:text-2xl">
              Exchange or Return Items
            </h1>
          </div>

          <div className="flex items-center gap-2.5 text-[11px]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                1
              </span>
              Item &amp; Reason
            </span>
            <span className="text-neutral-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-500">
                2
              </span>
              Replacement
            </span>
            <span className="text-neutral-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-500">
                3
              </span>
              Method
            </span>
          </div>
        </div>

        {/* Original Item Summary Card */}
        <section className="mt-7 flex flex-col justify-between gap-4 rounded-xl bg-[#F3F3F5] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/images/prod-vapor-x.jpg"
              alt="AeroStride Velocity X"
              className="h-16 w-16 shrink-0 rounded-lg bg-white object-cover"
            />
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] text-[#D94120] uppercase">
                ORIGINAL SIZE: US 9.5
              </p>
              <h2 className="mt-0.5 font-editorial text-sm font-semibold text-neutral-900">
                AeroStride Velocity X
              </h2>
              <p className="mt-0.5 text-xs font-medium text-neutral-600">
                $180.00
              </p>
            </div>
          </div>

          <span className="self-start rounded-full bg-neutral-200/80 px-3.5 py-1.5 text-center text-[10px] leading-tight font-medium text-neutral-600 sm:self-center">
            Eligible for
            <br className="hidden sm:inline" /> exchange
          </span>
        </section>

        {/* Reason Selector */}
        <section className="mt-8">
          <h2 className="font-editorial text-sm font-semibold text-neutral-900">
            Why are you exchanging this item?
          </h2>

          <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((option) => {
              const isSelected = reason === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setReason(option)}
                  className={`flex flex-col justify-between rounded-xl border bg-white p-4 text-left transition-all ${
                    isSelected
                      ? 'border-neutral-900 ring-1 ring-neutral-900'
                      : 'border-neutral-200/80 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected ? 'border-neutral-900' : 'border-neutral-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-neutral-900" />
                      )}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-semibold text-neutral-900">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs font-medium text-neutral-800">
                    {option}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Instant Exchange Info Banner */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-neutral-200/80 bg-white px-4 py-3.5 text-xs text-neutral-600">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
            <Zap className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <p>
            <span className="font-semibold text-neutral-900">
              Free Instant Exchange
            </span>{' '}
            — We&apos;ll reserve your new size immediately upon drop-off.
          </p>
        </div>

        {/* Choose Replacement Size */}
        <section className="mt-8">
          <h2 className="font-editorial text-sm font-semibold text-neutral-900">
            Choose Replacement Size
          </h2>

          <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REPLACEMENT_SIZES.map((option) => {
              const isSelected = selectedSize === option.label;

              if (!option.available) {
                return (
                  <div
                    key={option.label}
                    className="flex min-h-[112px] cursor-not-allowed flex-col justify-between rounded-xl border border-neutral-200/70 bg-white/70 p-4 opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-400">
                        {option.label}
                      </span>
                      <span className="h-4 w-4 rounded border border-neutral-200" />
                    </div>
                    <p className="text-[10px] font-medium text-red-400">
                      {option.statusText}
                    </p>
                  </div>
                );
              }

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSelectedSize(option.label)}
                  className={`flex min-h-[112px] flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                      : 'border-neutral-200/80 bg-white text-neutral-900 hover:border-neutral-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{option.label}</span>
                      {isSelected ? (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-neutral-950">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-neutral-300" />
                      )}
                    </div>

                    {option.recommended && (
                      <p className="mt-1 text-[9px] font-bold tracking-[0.12em] text-[#F04E2A] uppercase">
                        RECOMMENDED
                      </p>
                    )}
                  </div>

                  {isSelected ? (
                    <span className="mt-3 block rounded-md bg-white/10 px-2.5 py-1.5 text-[10px] leading-snug text-neutral-200">
                      {option.statusText}
                    </span>
                  ) : (
                    <p className="mt-3 text-[10px] text-neutral-500">
                      {option.statusText}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Select Return Drop-Off Method */}
        <section className="mt-8">
          <h2 className="font-editorial text-sm font-semibold text-neutral-900">
            Select Return Drop-Off Method
          </h2>

          <div className="mt-3.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Free Courier Doorstep Pickup */}
            <button
              type="button"
              onClick={() => setDropOff('courier')}
              className={`rounded-xl border bg-white p-5 text-left transition-all ${
                dropOff === 'courier'
                  ? 'border-neutral-900 ring-1 ring-neutral-900'
                  : 'border-neutral-200/80 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-neutral-800">
                    <Truck className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-editorial text-xs font-semibold text-neutral-900">
                      Free Courier Doorstep Pickup
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold text-[#D94120]">
                      No printer required
                    </p>
                  </div>
                </div>

                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    dropOff === 'courier'
                      ? 'border-neutral-900'
                      : 'border-neutral-300'
                  }`}
                >
                  {dropOff === 'courier' && (
                    <span className="h-2 w-2 rounded-full bg-neutral-900" />
                  )}
                </span>
              </div>

              <p className="mt-3.5 text-[11px] leading-relaxed text-neutral-500">
                Our courier will pick up the package directly from your address
                tomorrow between 9 AM - 1 PM.
              </p>
            </button>

            {/* Drop Off at Local Partner Point */}
            <button
              type="button"
              onClick={() => setDropOff('partner')}
              className={`rounded-xl border bg-white p-5 text-left transition-all ${
                dropOff === 'partner'
                  ? 'border-neutral-900 ring-1 ring-neutral-900'
                  : 'border-neutral-200/80 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-neutral-800">
                    <QrCode className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-editorial text-xs font-semibold text-neutral-900">
                      Drop Off at Local Partner Point
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-neutral-500">
                      Instant digital QR code
                    </p>
                  </div>
                </div>

                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    dropOff === 'partner'
                      ? 'border-neutral-900'
                      : 'border-neutral-300'
                  }`}
                >
                  {dropOff === 'partner' && (
                    <span className="h-2 w-2 rounded-full bg-neutral-900" />
                  )}
                </span>
              </div>

              <p className="mt-3.5 text-[11px] leading-relaxed text-neutral-500">
                Drop off at any of our 1,200+ partner retail locations anytime.
                Show your phone QR code.
              </p>
            </button>
          </div>
        </section>

        {/* Bottom Action Row */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-neutral-200/80 pt-6 sm:flex-row">
          <Link
            to="/dashboard"
            className="text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#F04E2A] px-6 py-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#D94120] sm:w-auto"
          >
            <span>Confirm Size Exchange (US 9.5 → {selectedSize})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
