import { ArrowUpRight, Globe, Instagram, ShieldCheck, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#09090B] text-neutral-400">
      {/* Subtle Top Vermilion Hairline Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F04E2A]/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-6 hidden font-display text-[140px] leading-none font-bold tracking-[0.12em] text-white/[0.02] select-none lg:block"
      >
        STRIDE
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-10">
        {/* Top Row: Brand & Socials */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-2.5 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F04E2A] text-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 17L10.5 7H15L11.5 12.5H20L13.5 20H9L12.5 14.5H4V17Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="font-display text-base font-bold tracking-[0.2em] uppercase">
                STRIDE
              </span>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Architectural performance footwear engineered with full-length
              carbon-plate propulsion and supercritical nitrogen cushioning.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold tracking-wider text-neutral-300 uppercase">
              <ShieldCheck className="h-3.5 w-3.5 text-[#F04E2A]" />
              <span>Zurich • Tokyo • New York • Colombo</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="#instagram"
              aria-label="STRIDE on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-[#F04E2A] hover:bg-[#F04E2A] hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#youtube"
              aria-label="STRIDE on YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-[#F04E2A] hover:bg-[#F04E2A] hover:text-white"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="#global"
              aria-label="STRIDE Global Flagships"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-[#F04E2A] hover:bg-[#F04E2A] hover:text-white"
            >
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Middle 4-Column Links Grid */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {/* Shop */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white uppercase">
              SHOP
            </p>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  to="/collections"
                  className="transition-colors hover:text-white"
                >
                  Men&apos;s Running
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="transition-colors hover:text-white"
                >
                  Streetwear Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="transition-colors hover:text-white"
                >
                  Court Basketball
                </Link>
              </li>
              <li>
                <Link
                  to="/product/aerostride-velocity-x"
                  className="transition-colors hover:text-white"
                >
                  Apex Pro Carbon
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="transition-colors hover:text-white"
                >
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Member Portal */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white uppercase">
              MEMBER PORTAL
            </p>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  to="/dashboard"
                  className="transition-colors hover:text-white"
                >
                  Orders &amp; Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/exchange"
                  className="transition-colors hover:text-white"
                >
                  Instant Size Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-white"
                >
                  Sign In / Guest Lookup
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="transition-colors hover:text-white"
                >
                  Join Insider Elite
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white uppercase">
              INNOVATION
            </p>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  to="/innovation"
                  className="transition-colors hover:text-white"
                >
                  Carbon Plate Lab
                </Link>
              </li>
              <li>
                <Link
                  to="/innovation"
                  className="transition-colors hover:text-white"
                >
                  Supercritical Foam
                </Link>
              </li>
              <li>
                <Link
                  to="/product/aerostride-velocity-x"
                  className="transition-colors hover:text-white"
                >
                  Size &amp; Fit Telemetry
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  className="transition-colors hover:text-white"
                >
                  Express Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Operations / Admin */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white uppercase">
              OPERATIONS
            </p>
            <p className="mt-4 text-xs leading-relaxed text-neutral-400">
              Manage SKU size matrices, barcode fulfillment, RMAs, and live drop
              campaigns.
            </p>
            <Link
              to="/admin"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#F04E2A] hover:bg-[#F04E2A]"
            >
              <span>Admin Console</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[11px] text-neutral-500 md:flex-row">
          <p>© 2026 STRIDE Editorial Footwear. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY', 'GOOGLE PAY'].map(
              (method) => (
                <span
                  key={method}
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-bold tracking-wider text-neutral-400"
                >
                  {method}
                </span>
              )
            )}
          </div>

          <div className="flex items-center gap-5">
            <a href="#privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#terms" className="transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
