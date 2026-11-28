import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  QrCode,
  ShieldCheck,
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
      <div className="bg-[#F5F5F7]">
        <section className="relative overflow-hidden bg-[#09090B] py-16 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
          />
          <div className="relative mx-auto max-w-lg px-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-neutral-950">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
            </div>

            <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
              EXCHANGE CONFIRMED • ORDER #SH-8942
            </p>
            <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
              SIZE EXCHANGE RESERVED
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-neutral-300 sm:text-sm">
              Your replacement{' '}
              <span className="font-bold text-white">
                AeroStride Velocity X ({selectedSize})
              </span>{' '}
              is now reserved.{' '}
              {dropOff === 'courier'
                ? 'Our courier will pick up your US 9.5 pair tomorrow between 9 AM – 1 PM.'
                : 'Your instant digital drop-off QR code has been sent to alex.mercer@studio.net.'}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-xl bg-[#F04E2A] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-colors hover:bg-[#D94120]"
              >
                Back to My Orders
              </Link>
              <Link
                to="/collections"
                className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white hover:text-neutral-950"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F7]">
      {/* Dark Obsidian Exchange Portal Header */}
      <section className="relative overflow-hidden bg-[#09090B] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#F04E2A]/60 to-transparent"
        />

        <div className="mx-auto max-w-4xl px-6 py-9 lg:px-10 lg:py-11">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to My Orders</span>
          </Link>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#F04E2A] uppercase">
                ORDER #SH-8942 • INSTANT EXCHANGE PORTAL
              </p>
              <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
                EXCHANGE OR RETURN ITEMS
              </h1>
            </div>

            <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[11px] backdrop-blur-md">
              <span className="inline-flex items-center gap-1.5 font-bold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F04E2A] text-[10px] font-bold text-white">
                  1
                </span>
                Reason
              </span>
              <span className="text-white/25">/</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-white">
                  2
                </span>
                Size
              </span>
              <span className="text-white/25">/</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-white">
                  3
                </span>
                Drop-Off
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl space-y-6 px-6 py-10 lg:px-10 lg:py-12">
        {/* Original Item Summary Card */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/images/prod-vapor-x.jpg"
              alt="AeroStride Velocity X"
              className="h-18 w-18 shrink-0 rounded-xl bg-[#ECECEF] object-cover"
            />
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] text-[#F04E2A] uppercase">
                ORIGINAL SIZE: US 9.5
              </p>
              <h2 className="mt-0.5 font-display text-base font-bold text-neutral-950">
                AeroStride Velocity X
              </h2>
              <p className="mt-0.5 font-display text-xs font-bold text-neutral-600">
                $180.00
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3.5 py-1.5 text-[11px] font-bold text-emerald-700 sm:self-center">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Eligible for Free Exchange</span>
          </span>
        </section>

        {/* Step 01: Reason Selector */}
        <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 font-mono text-xs font-bold text-white">
              01
            </span>
            <h2 className="font-display text-sm font-bold tracking-wide text-neutral-950 uppercase sm:text-base">
              Why are you exchanging this item?
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((option) => {
              const isSelected = reason === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setReason(option)}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-neutral-950 bg-[#FAFAFB] ring-2 ring-[#F04E2A]/20'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected ? 'border-[#F04E2A]' : 'border-neutral-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[#F04E2A]" />
                      )}
                    </span>
                    {isSelected && (
                      <span className="rounded bg-neutral-950 px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="mt-3.5 text-xs font-bold text-neutral-900">
                    {option}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dark Obsidian Instant Exchange Perk Banner */}
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#09090B] px-4 py-3.5 text-xs text-neutral-300">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F04E2A] text-white">
              <Zap className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            <p>
              <strong className="text-white">Free Instant Exchange</strong> —
              We&apos;ll lock in and reserve your replacement size immediately
              upon drop-off.
            </p>
          </div>
        </section>

        {/* Step 02: Choose Replacement Size */}
        <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 font-mono text-xs font-bold text-white">
              02
            </span>
            <h2 className="font-display text-sm font-bold tracking-wide text-neutral-950 uppercase sm:text-base">
              Choose Replacement Size
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {REPLACEMENT_SIZES.map((option) => {
              const isSelected = selectedSize === option.label;

              if (!option.available) {
                return (
                  <div
                    key={option.label}
                    className="flex min-h-[118px] cursor-not-allowed flex-col justify-between rounded-xl border border-neutral-200/70 bg-neutral-50 p-4 opacity-65"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-neutral-400">
                        {option.label}
                      </span>
                      <span className="h-4 w-4 rounded border border-neutral-200" />
                    </div>
                    <p className="text-[10px] font-bold text-rose-400 uppercase">
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
                  className={`flex min-h-[118px] flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-neutral-950 bg-[#09090B] text-white shadow-lg ring-2 ring-[#F04E2A]/40'
                      : 'border-neutral-200 bg-white text-neutral-950 hover:border-neutral-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold">
                        {option.label}
                      </span>
                      {isSelected ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F04E2A] text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-neutral-300" />
                      )}
                    </div>

                    {option.recommended && (
                      <p className="mt-1 text-[9px] font-bold tracking-[0.14em] text-[#FF6B4A] uppercase">
                        RECOMMENDED
                      </p>
                    )}
                  </div>

                  {isSelected ? (
                    <span className="mt-3 block rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-neutral-200">
                      {option.statusText}
                    </span>
                  ) : (
                    <p className="mt-3 text-[10px] font-semibold text-neutral-500">
                      {option.statusText}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 03: Select Return Drop-Off Method */}
        <section className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950 font-mono text-xs font-bold text-white">
              03
            </span>
            <h2 className="font-display text-sm font-bold tracking-wide text-neutral-950 uppercase sm:text-base">
              Select Return Drop-Off Method
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setDropOff('courier')}
              className={`rounded-xl border p-5 text-left transition-all ${
                dropOff === 'courier'
                  ? 'border-neutral-950 bg-[#FAFAFB] ring-2 ring-[#F04E2A]/20'
                  : 'border-neutral-200 bg-white hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white">
                    <Truck className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="font-display text-xs font-bold text-neutral-950 uppercase">
                      Free Courier Doorstep Pickup
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold text-[#F04E2A] uppercase">
                      No printer required
                    </p>
                  </div>
                </div>

                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    dropOff === 'courier'
                      ? 'border-[#F04E2A]'
                      : 'border-neutral-300'
                  }`}
                >
                  {dropOff === 'courier' && (
                    <span className="h-2 w-2 rounded-full bg-[#F04E2A]" />
                  )}
                </span>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-neutral-500">
                Our courier will pick up the package directly from your address
                tomorrow between 9 AM – 1 PM.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setDropOff('partner')}
              className={`rounded-xl border p-5 text-left transition-all ${
                dropOff === 'partner'
                  ? 'border-neutral-950 bg-[#FAFAFB] ring-2 ring-[#F04E2A]/20'
                  : 'border-neutral-200 bg-white hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                    <QrCode className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="font-display text-xs font-bold text-neutral-950 uppercase">
                      Drop Off at Local Partner Point
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold text-neutral-500 uppercase">
                      Instant digital QR code
                    </p>
                  </div>
                </div>

                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    dropOff === 'partner'
                      ? 'border-[#F04E2A]'
                      : 'border-neutral-300'
                  }`}
                >
                  {dropOff === 'partner' && (
                    <span className="h-2 w-2 rounded-full bg-[#F04E2A]" />
                  )}
                </span>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-neutral-500">
                Drop off at any of our 1,200+ partner retail locations anytime.
                Show your phone QR code.
              </p>
            </button>
          </div>
        </section>

        {/* Bottom Action Bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white px-6 py-5 shadow-xs sm:flex-row">
          <Link
            to="/dashboard"
            className="text-xs font-bold tracking-wider text-neutral-500 uppercase transition-colors hover:text-neutral-950"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-colors hover:bg-[#D94120] sm:w-auto"
          >
            <span>Confirm Size Exchange (US 9.5 → {selectedSize})</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
