import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LayoutGrid, Rows2, X } from 'lucide-react';
import { COLLECTION_PRODUCTS } from '@/data/collectionData';
import FilterSidebar, {
  type CollectionFilters,
} from '@/components/collections/FilterSidebar';
import CollectionProductCard from '@/components/collections/CollectionProductCard';
import { useWishlist } from '@/context/WishlistContext';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';
type GridDensity = '3' | '2';

const DISCIPLINE_PILLS = [
  'All Running',
  'Marathon Carbon',
  'Daily Trainers',
  'All-Terrain Trail',
];

const INITIAL_FILTERS: CollectionFilters = {
  size: 10,
  widths: ['Standard (D)'],
  colorway: null,
  maxPrice: 300,
  brands: [],
  materials: [],
  category: 'Running',
};

const TOTAL_PAGES = 5;

export default function CollectionsPage() {
  const [filters, setFilters] = useState<CollectionFilters>(INITIAL_FILTERS);
  const [activeDiscipline, setActiveDiscipline] = useState<string>('All Running');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridDensity, setGridDensity] = useState<GridDensity>('3');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleSelectSize = (size: number) => {
    setFilters((prev) => ({
      ...prev,
      size: prev.size === size ? null : size,
    }));
  };

  const handleToggleWidth = (width: string) => {
    setFilters((prev) => ({
      ...prev,
      widths: prev.widths.includes(width)
        ? prev.widths.filter((item) => item !== width)
        : [...prev.widths, width],
    }));
  };

  const handleSelectColorway = (colorId: string) => {
    setFilters((prev) => ({
      ...prev,
      colorway: prev.colorway === colorId ? null : colorId,
    }));
  };

  const handleToggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((item) => item !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleToggleMaterial = (material: string) => {
    setFilters((prev) => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter((item) => item !== material)
        : [...prev.materials, material],
    }));
  };

  const handleClearAll = () => {
    setFilters({
      size: null,
      widths: [],
      colorway: null,
      maxPrice: 300,
      brands: [],
      materials: [],
      category: null,
    });
    setActiveDiscipline('All Running');
  };

  const handleToggleWishlist = (id: string) => {
    const product = COLLECTION_PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    toggleWishlist({
      id: product.id,
      slug: product.slug,
      brand: product.brandLabel,
      name: product.name,
      colorway: product.subtitle,
      savedSize: filters.size ? `US ${filters.size}` : 'US 10',
      price: product.price,
      image: product.image,
    });
  };

  const filteredProducts = useMemo(() => {
    const result = COLLECTION_PRODUCTS.filter((product) => {
      if (filters.size !== null && !product.sizes.includes(filters.size)) {
        return false;
      }
      if (
        filters.widths.length > 0 &&
        !filters.widths.some((width) =>
          product.widths.includes(width as (typeof product.widths)[number])
        )
      ) {
        return false;
      }
      if (
        filters.colorway !== null &&
        !product.colorNames.includes(filters.colorway)
      ) {
        return false;
      }
      if (product.price > filters.maxPrice) {
        return false;
      }
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }
      if (
        filters.materials.length > 0 &&
        !filters.materials.includes(product.material)
      ) {
        return false;
      }
      if (
        activeDiscipline === 'Marathon Carbon' &&
        !product.name.toLowerCase().includes('carbon') &&
        !product.subtitle.toLowerCase().includes('marathon') &&
        !product.subtitle.toLowerCase().includes('racing')
      ) {
        return false;
      }
      if (
        activeDiscipline === 'All-Terrain Trail' &&
        !product.name.toLowerCase().includes('trail') &&
        !product.subtitle.toLowerCase().includes('trail')
      ) {
        return false;
      }
      if (
        activeDiscipline === 'Daily Trainers' &&
        !product.subtitle.toLowerCase().includes('trainer') &&
        !product.subtitle.toLowerCase().includes('road') &&
        !product.subtitle.toLowerCase().includes('endurance')
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...result].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...result].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating-desc') {
      return [...result].sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [filters, sortBy, activeDiscipline]);

  const activeChips: { key: string; label: string; onRemove: () => void }[] =
    [];

  if (filters.size !== null) {
    activeChips.push({
      key: 'size',
      label: `Size: US ${filters.size}`,
      onRemove: () => setFilters((prev) => ({ ...prev, size: null })),
    });
  }
  if (filters.category) {
    activeChips.push({
      key: 'category',
      label: filters.category,
      onRemove: () => setFilters((prev) => ({ ...prev, category: null })),
    });
  }
  if (filters.colorway) {
    activeChips.push({
      key: 'colorway',
      label: `Color: ${filters.colorway}`,
      onRemove: () => setFilters((prev) => ({ ...prev, colorway: null })),
    });
  }
  filters.brands.forEach((brand) => {
    activeChips.push({
      key: `brand-${brand}`,
      label: brand,
      onRemove: () => handleToggleBrand(brand),
    });
  });
  filters.materials.forEach((material) => {
    activeChips.push({
      key: `mat-${material}`,
      label: material,
      onRemove: () => handleToggleMaterial(material),
    });
  });

  const isDefaultState =
    filters.brands.length === 0 &&
    filters.materials.length === 0 &&
    filters.colorway === null &&
    filters.maxPrice === 300 &&
    activeDiscipline === 'All Running';

  return (
    <div className="bg-[#F5F5F7]">
      {/* Dark Obsidian Editorial Collection Banner */}
      <section className="relative overflow-hidden bg-[#09090B] text-white">
        <img
          src="/images/bg-running.jpg?v=2"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#09090B]/95 via-[#09090B]/80 to-[#09090B]/55" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] font-medium text-neutral-400"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Men</span>
            <span>/</span>
            <span className="font-semibold text-white">Running Shoes</span>
          </nav>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#F04E2A] uppercase">
                PERFORMANCE ARCHIVE • SS26
              </p>
              <h1 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
                Men&apos;s Running Collection
              </h1>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-neutral-300 sm:text-sm">
                {isDefaultState
                  ? '148 high-performance silhouettes engineered with carbon-plate propulsion and supercritical foam.'
                  : `${filteredProducts.length} Result${
                      filteredProducts.length === 1 ? '' : 's'
                    } matching your active filters.`}
              </p>
            </div>

            {/* Discipline Quick Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {DISCIPLINE_PILLS.map((pill) => {
                const isSelected = activeDiscipline === pill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setActiveDiscipline(pill)}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-all ${
                      isSelected
                        ? 'bg-[#F04E2A] text-white shadow-md shadow-[#F04E2A]/25'
                        : 'border border-white/15 bg-white/[0.06] text-neutral-300 backdrop-blur-md hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Sticky Controls & Active Filters Bar */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-3.5 sm:flex-row sm:items-center lg:px-10">
          {/* Left: Active Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
              ACTIVE FILTERS:
            </span>

            {activeChips.length === 0 ? (
              <span className="text-xs text-neutral-400">None</span>
            ) : (
              <>
                {activeChips.map((chip) => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-800"
                  >
                    {chip.label}
                    <button
                      type="button"
                      onClick={chip.onRemove}
                      aria-label={`Remove ${chip.label} filter`}
                      className="text-neutral-400 transition-colors hover:text-neutral-950"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="ml-1 text-[11px] font-bold text-[#F04E2A] underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  Clear All
                </button>
              </>
            )}
          </div>

          {/* Right: Density Toggle + Sort */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="hidden items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 xl:flex">
              <button
                type="button"
                onClick={() => setGridDensity('3')}
                aria-label="3-column grid"
                className={`rounded-md p-1.5 transition-colors ${
                  gridDensity === '3'
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGridDensity('2')}
                aria-label="2-column grid"
                className={`rounded-md p-1.5 transition-colors ${
                  gridDensity === '2'
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Rows2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase"
              >
                SORT BY:
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none rounded-lg border border-neutral-200 bg-neutral-50 py-1.5 pr-8 pl-3 text-xs font-semibold text-neutral-900 focus:border-neutral-900 focus:bg-white focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Top Rated</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Sticky Sidebar + Product Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <FilterSidebar
              filters={filters}
              activeCount={activeChips.length}
              onSelectSize={handleSelectSize}
              onToggleWidth={handleToggleWidth}
              onSelectColorway={handleSelectColorway}
              onChangeMaxPrice={(maxPrice) =>
                setFilters((prev) => ({ ...prev, maxPrice }))
              }
              onToggleBrand={handleToggleBrand}
              onToggleMaterial={handleToggleMaterial}
              onResetAll={handleClearAll}
            />
          </div>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200/80 bg-white px-6 py-20 text-center">
                <p className="font-display text-lg font-bold text-neutral-950 uppercase">
                  No shoes match your current filters
                </p>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Try widening your price range or clearing a few active filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-6 rounded-lg bg-neutral-950 px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#F04E2A]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                  gridDensity === '3' ? 'xl:grid-cols-3' : 'xl:grid-cols-2'
                }`}
              >
                {filteredProducts.map((product) => (
                  <CollectionProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isWishlisted(product.slug)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="mr-2 text-[11px] font-medium text-neutral-500">
                Page {currentPage} of {TOTAL_PAGES}
              </span>

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Previous
              </button>

              {Array.from({ length: TOTAL_PAGES }, (_, idx) => idx + 1).map(
                (page) => {
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-[11px] font-bold transition-colors ${
                        isActive
                          ? 'bg-neutral-950 text-white shadow-xs'
                          : 'border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              <button
                type="button"
                disabled={currentPage === TOTAL_PAGES}
                onClick={() =>
                  setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))
                }
                className="rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
