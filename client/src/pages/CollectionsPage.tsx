import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { COLLECTION_PRODUCTS } from '@/data/collectionData';
import FilterSidebar, {
  type CollectionFilters,
} from '@/components/collections/FilterSidebar';
import CollectionProductCard from '@/components/collections/CollectionProductCard';

type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';

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
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(() => {
    const result = COLLECTION_PRODUCTS.filter((product) => {
      if (filters.size !== null && !product.sizes.includes(filters.size)) {
        return false;
      }
      if (
        filters.widths.length > 0 &&
        !filters.widths.some((width) =>
          product.widths.includes(
            width as (typeof product.widths)[number]
          )
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
  }, [filters, sortBy]);

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
    filters.maxPrice === 300;

  return (
    <div className="bg-[#F6F6F6] py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] text-neutral-400"
        >
          <Link to="/" className="transition-colors hover:text-neutral-900">
            Home
          </Link>
          <span>/</span>
          <span className="transition-colors hover:text-neutral-900">Men</span>
          <span>/</span>
          <span className="font-semibold text-neutral-900">Running Shoes</span>
        </nav>

        {/* Page Header + Sort */}
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-editorial text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Men&apos;s Running Collection
            </h1>
            <p className="mt-1 text-xs text-neutral-500">
              {isDefaultState
                ? '148 Results curated for high-performance movement'
                : `${filteredProducts.length} Result${
                    filteredProducts.length === 1 ? '' : 's'
                  } matching your active filters`}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <label
              htmlFor="sort-select"
              className="text-[10px] font-semibold tracking-[0.14em] text-neutral-500 uppercase"
            >
              SORT BY:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none rounded-md border border-neutral-200 bg-white py-1.5 pr-8 pl-3 text-xs font-medium text-neutral-800 focus:border-neutral-400 focus:outline-none"
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

        {/* Active Filters Bar */}
        {activeChips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
              ACTIVE FILTERS:
            </span>

            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-200/80 px-3 py-1 text-[11px] font-medium text-neutral-800"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Remove ${chip.label} filter`}
                  className="text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}

            <button
              type="button"
              onClick={handleClearAll}
              className="ml-1 text-[11px] font-semibold text-stride-red underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content: Sidebar + 3-Column Product Grid */}
        <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <FilterSidebar
              filters={filters}
              onSelectSize={handleSelectSize}
              onToggleWidth={handleToggleWidth}
              onSelectColorway={handleSelectColorway}
              onChangeMaxPrice={(maxPrice) =>
                setFilters((prev) => ({ ...prev, maxPrice }))
              }
              onToggleBrand={handleToggleBrand}
              onToggleMaterial={handleToggleMaterial}
            />
          </div>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border border-neutral-200/70 bg-white px-6 py-16 text-center">
                <p className="font-editorial text-lg font-semibold text-neutral-900">
                  No shoes match your current filters
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Try widening your price range or clearing a few filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-5 rounded-md bg-neutral-900 px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <CollectionProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="mr-2 text-[11px] text-neutral-400">
                Page {currentPage} of {TOTAL_PAGES}
              </span>

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-[11px] font-medium text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className={`h-8 w-8 rounded-md text-[11px] font-semibold transition-colors ${
                        isActive
                          ? 'bg-neutral-900 text-white'
                          : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100'
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
                className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
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
