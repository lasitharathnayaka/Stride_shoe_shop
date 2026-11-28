import { useEffect, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SearchOverlay from '@/components/layout/SearchOverlay';

export default function Navbar() {
  const { totalCount, openCart } = useCart();
  const { totalCount: wishlistCount } = useWishlist();
  const { pathname } = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isCollections = pathname === '/collections';
  const isInnovation = pathname === '/innovation';
  const isWishlist = pathname === '/wishlist';

  // Keyboard shortcut: Ctrl+K or Cmd+K opens Predictive Search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinkClass = (active: boolean) =>
    `relative py-5 text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${
      active ? 'text-white' : 'text-neutral-400 hover:text-white'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#09090B]/92 text-white backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Left: Minimalist Editorial Brand Mark */}
          <Link to="/" className="group flex items-center gap-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="text-[#F04E2A] transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M4 17L10.5 7H15L11.5 12.5H20L13.5 20H9L12.5 14.5H4V17Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-display text-[15px] font-bold tracking-[0.26em] text-white uppercase">
              STRIDE
            </span>
          </Link>

          {/* Center: Clean Editorial Links with Vermilion Active Underline */}
          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            <Link to="/" className={navLinkClass(isHome)}>
              Shop
              {isHome && (
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#F04E2A] shadow-[0_0_10px_rgba(240,78,42,0.8)]" />
              )}
            </Link>

            <Link to="/collections" className={navLinkClass(isCollections)}>
              Collections
              {isCollections && (
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#F04E2A] shadow-[0_0_10px_rgba(240,78,42,0.8)]" />
              )}
            </Link>

            <Link to="/innovation" className={navLinkClass(isInnovation)}>
              Innovation
              {isInnovation && (
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#F04E2A] shadow-[0_0_10px_rgba(240,78,42,0.8)]" />
              )}
            </Link>
          </nav>

          {/* Right: Clean Uncluttered Utility Icons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search (Ctrl+K)"
              title="Search (Ctrl+K)"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                isWishlist
                  ? 'bg-white/10 text-[#F04E2A]'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Heart
                className={`h-[18px] w-[18px] ${
                  isWishlist ? 'fill-[#F04E2A]' : ''
                }`}
                strokeWidth={1.75}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-neutral-950 shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Shopping Bag"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {totalCount > 0 && (
                <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F04E2A] px-1 text-[9px] font-bold text-white shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            <span
              aria-hidden="true"
              className="mx-2 hidden h-4 w-px bg-white/15 sm:block"
            />

            <Link
              to="/login"
              className="hidden px-2 py-1.5 text-[11px] font-bold tracking-[0.14em] text-neutral-300 uppercase transition-colors hover:text-white sm:inline-flex"
            >
              Sign In
            </Link>

            <Link
              to="/dashboard"
              aria-label="Member Portal"
              className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:border-[#F04E2A] hover:bg-[#F04E2A]"
            >
              <User className="h-4 w-4" strokeWidth={1.85} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#09090B] px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1 text-xs font-bold tracking-[0.14em] uppercase">
              <Link
                to="/"
                className="rounded-lg px-3 py-2.5 text-white hover:bg-white/10"
              >
                Shop
              </Link>
              <Link
                to="/collections"
                className="rounded-lg px-3 py-2.5 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                Collections
              </Link>
              <Link
                to="/innovation"
                className="rounded-lg px-3 py-2.5 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                Innovation
              </Link>
              <Link
                to="/wishlist"
                className="rounded-lg px-3 py-2.5 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                Wishlist
              </Link>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2.5 text-[#F04E2A] hover:bg-white/10"
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
