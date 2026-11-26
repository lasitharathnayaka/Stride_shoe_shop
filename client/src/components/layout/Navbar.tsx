import { useState } from 'react';
import { Heart, Search, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import SearchOverlay from '@/components/layout/SearchOverlay';

export default function Navbar() {
  const { totalCount, openCart } = useCart();
  const { pathname } = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isHome = pathname === '/';
  const isCollections = pathname === '/collections';

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-[#F5F5F5]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Left: Brand + Nav links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-neutral-900">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="text-neutral-900"
            >
              <path
                d="M4 17L10.5 7H15L11.5 12.5H20L13.5 20H9L12.5 14.5H4V17Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-display text-sm font-bold tracking-[0.12em] uppercase">
              STRIDE
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            <Link
              to="/"
              className={`rounded-md px-3.5 py-1.5 text-xs transition-colors ${
                isHome
                  ? 'bg-neutral-200/80 font-semibold text-neutral-900 hover:bg-neutral-200'
                  : 'font-medium text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className={`rounded-md px-3.5 py-1.5 text-xs transition-colors ${
                isCollections
                  ? 'bg-neutral-200/80 font-semibold text-neutral-900 hover:bg-neutral-200'
                  : 'font-medium text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900'
              }`}
            >
              Collections
            </Link>
            <a
              href="/#innovation"
              className="rounded-md px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900"
            >
              Innovation
            </a>
          </nav>
        </div>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900"
          >
            <Search className="h-4 w-4" strokeWidth={1.8} />
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900"
          >
            <Heart className="h-4 w-4" strokeWidth={1.8} />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label="Shopping Bag"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
            {totalCount > 0 && (
              <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-stride-red px-1 text-[10px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>

          <Link
            to="/login"
            className="hidden rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 sm:inline-flex"
          >
            Sign In
          </Link>

          <Link
            to="/dashboard"
            aria-label="Account"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-stride-dark text-white transition-opacity hover:opacity-85"
          >
            <User className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
