import { SlidersHorizontal } from 'lucide-react';
import {
  BRAND_OPTIONS,
  COLORWAY_OPTIONS,
  MATERIAL_OPTIONS,
  US_SIZES,
  WIDTH_OPTIONS,
} from '@/data/collectionData';

export interface CollectionFilters {
  size: number | null;
  widths: string[];
  colorway: string | null;
  maxPrice: number;
  brands: string[];
  materials: string[];
  category: string | null;
}

interface FilterSidebarProps {
  filters: CollectionFilters;
  onSelectSize: (size: number) => void;
  onToggleWidth: (width: string) => void;
  onSelectColorway: (colorId: string) => void;
  onChangeMaxPrice: (price: number) => void;
  onToggleBrand: (brand: string) => void;
  onToggleMaterial: (material: string) => void;
}

export default function FilterSidebar({
  filters,
  onSelectSize,
  onToggleWidth,
  onSelectColorway,
  onChangeMaxPrice,
  onToggleBrand,
  onToggleMaterial,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-xl border border-neutral-200/70 bg-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <h2 className="text-[11px] font-bold tracking-[0.14em] text-neutral-900 uppercase">
          FILTERS
        </h2>
        <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-500" />
      </div>

      {/* Size (US) */}
      <div className="border-b border-neutral-100 py-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-700 uppercase">
          SIZE (US)
        </p>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {US_SIZES.map((size) => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`rounded-md border py-1.5 text-[11px] font-medium transition-colors ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:border-neutral-400 hover:bg-white'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Width */}
      <div className="border-b border-neutral-100 py-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-700 uppercase">
          WIDTH
        </p>
        <div className="mt-3 space-y-2.5">
          {WIDTH_OPTIONS.map((width) => {
            const checked = filters.widths.includes(width);
            return (
              <label
                key={width}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleWidth(width)}
                  className="h-3.5 w-3.5 rounded border-neutral-300 accent-neutral-900"
                />
                <span>{width}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Colorway */}
      <div className="border-b border-neutral-100 py-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-700 uppercase">
          COLORWAY
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {COLORWAY_OPTIONS.map((swatch) => {
            const isSelected = filters.colorway === swatch.id;
            return (
              <button
                key={swatch.id}
                type="button"
                aria-label={swatch.label}
                title={swatch.label}
                onClick={() => onSelectColorway(swatch.id)}
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                  isSelected
                    ? 'ring-2 ring-neutral-900 ring-offset-2'
                    : 'hover:scale-110'
                }`}
              >
                <span
                  className="h-5 w-5 rounded-full border border-neutral-200"
                  style={{ backgroundColor: swatch.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b border-neutral-100 py-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-700 uppercase">
            PRICE RANGE
          </p>
          <span className="text-[11px] font-semibold text-neutral-900">
            $50 – ${filters.maxPrice}
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={300}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="mt-3.5 h-1 w-full cursor-pointer appearance-none rounded-lg bg-neutral-900 accent-neutral-900"
        />

        <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-400">
          <span>$50</span>
          <span>$300</span>
        </div>
      </div>

      {/* Brand */}
      <div className="border-b border-neutral-100 py-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-700 uppercase">
          BRAND
        </p>
        <div className="mt-3 space-y-2.5">
          {BRAND_OPTIONS.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleBrand(brand)}
                  className="h-3.5 w-3.5 rounded border-neutral-300 accent-neutral-900"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Material */}
      <div className="pt-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-neutral-700 uppercase">
          MATERIAL
        </p>
        <div className="mt-3 space-y-2.5">
          {MATERIAL_OPTIONS.map((material) => {
            const checked = filters.materials.includes(material);
            return (
              <label
                key={material}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleMaterial(material)}
                  className="h-3.5 w-3.5 rounded border-neutral-300 accent-neutral-900"
                />
                <span>{material}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
