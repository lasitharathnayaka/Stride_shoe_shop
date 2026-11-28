import { useState } from 'react';
import { Check, ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  BRAND_OPTIONS,
  COLLECTION_PRODUCTS,
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
  activeCount: number;
  onSelectSize: (size: number) => void;
  onToggleWidth: (width: string) => void;
  onSelectColorway: (colorId: string) => void;
  onChangeMaxPrice: (price: number) => void;
  onToggleBrand: (brand: string) => void;
  onToggleMaterial: (material: string) => void;
  onResetAll: () => void;
}

type SectionKey = 'size' | 'width' | 'colorway' | 'price' | 'brand' | 'material';

export default function FilterSidebar({
  filters,
  activeCount,
  onSelectSize,
  onToggleWidth,
  onSelectColorway,
  onChangeMaxPrice,
  onToggleBrand,
  onToggleMaterial,
  onResetAll,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    size: true,
    width: true,
    colorway: true,
    price: true,
    brand: true,
    material: true,
  });

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pricePercent = ((filters.maxPrice - 50) / (300 - 50)) * 100;

  return (
    <aside className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm lg:sticky lg:top-24">
      {/* Dark Obsidian Header matching site theme */}
      <div className="flex items-center justify-between bg-[#09090B] px-5 py-4 text-white">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#F04E2A]" />
          <h2 className="font-display text-xs font-bold tracking-[0.18em] uppercase">
            REFINE
          </h2>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F04E2A] px-1.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-neutral-400 uppercase transition-colors hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-neutral-100 px-5">
        {/* SIZE (US) */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('size')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              SIZE (US)
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                openSections.size ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.size && (
            <div className="mt-3.5 grid grid-cols-4 gap-1.5">
              {US_SIZES.map((size) => {
                const isSelected = filters.size === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onSelectSize(size)}
                    className={`rounded-lg border py-2 text-[11px] font-bold transition-all ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm ring-2 ring-[#F04E2A]/25'
                        : 'border-neutral-200/90 bg-[#FAFAFB] text-neutral-700 hover:border-neutral-900 hover:bg-white hover:text-neutral-950'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* WIDTH */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('width')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              WIDTH FIT
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                openSections.width ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.width && (
            <div className="mt-3 space-y-2">
              {WIDTH_OPTIONS.map((width) => {
                const checked = filters.widths.includes(width);
                return (
                  <button
                    key={width}
                    type="button"
                    onClick={() => onToggleWidth(width)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                      checked
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                        : 'border-neutral-200/90 bg-[#FAFAFB] text-neutral-700 hover:border-neutral-400 hover:bg-white'
                    }`}
                  >
                    <span>{width}</span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full ${
                        checked
                          ? 'bg-[#F04E2A] text-white'
                          : 'border border-neutral-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* COLORWAY */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('colorway')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              COLORWAY
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                openSections.colorway ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.colorway && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {COLORWAY_OPTIONS.map((swatch) => {
                const isSelected = filters.colorway === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => onSelectColorway(swatch.id)}
                    className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'border-[#F04E2A] bg-[#FEF4F2] text-neutral-950'
                        : 'border-neutral-200/90 bg-[#FAFAFB] text-neutral-700 hover:border-neutral-400 hover:bg-white'
                    }`}
                  >
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border border-neutral-300 shadow-2xs"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="truncate">{swatch.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* PRICE RANGE */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              PRICE RANGE
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                openSections.price ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.price && (
            <div className="mt-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">Max Budget</span>
                <span className="rounded-md bg-neutral-950 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
                  $50 – ${filters.maxPrice}
                </span>
              </div>

              {/* Custom Filled Track Slider */}
              <div className="relative mt-4 flex items-center">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className="h-full rounded-full bg-[#F04E2A]"
                    style={{ width: `${pricePercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={50}
                  max={300}
                  step={5}
                  value={filters.maxPrice}
                  onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
                  aria-label="Maximum price"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#F04E2A] shadow-md"
                  style={{ left: `${pricePercent}%` }}
                />
              </div>

              {/* Quick Price Presets */}
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {[180, 210, 300].map((preset) => {
                  const isActive = filters.maxPrice === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onChangeMaxPrice(preset)}
                      className={`rounded-md py-1 text-[10px] font-bold transition-colors ${
                        isActive
                          ? 'bg-neutral-950 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {preset === 300 ? 'All' : `≤ $${preset}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* BRAND */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('brand')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              BRAND
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                openSections.brand ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.brand && (
            <div className="mt-3 space-y-2">
              {BRAND_OPTIONS.map((brand) => {
                const checked = filters.brands.includes(brand);
                const count = COLLECTION_PRODUCTS.filter(
                  (p) => p.brand === brand
                ).length;

                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => onToggleBrand(brand)}
                    className="group flex w-full items-center justify-between rounded-lg px-1 py-1 text-xs transition-colors hover:bg-neutral-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded transition-colors ${
                          checked
                            ? 'bg-neutral-950 text-white'
                            : 'border border-neutral-300 bg-white group-hover:border-neutral-600'
                        }`}
                      >
                        {checked && (
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        )}
                      </span>
                      <span
                        className={
                          checked
                            ? 'font-bold text-neutral-950'
                            : 'font-medium text-neutral-600 group-hover:text-neutral-950'
                        }
                      >
                        {brand}
                      </span>
                    </span>
                    <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-500">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* MATERIAL */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('material')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              UPPER MATERIAL
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                openSections.material ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.material && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {MATERIAL_OPTIONS.map((material) => {
                const checked = filters.materials.includes(material);
                return (
                  <button
                    key={material}
                    type="button"
                    onClick={() => onToggleMaterial(material)}
                    className={`rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                      checked
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                        : 'border-neutral-200/90 bg-[#FAFAFB] text-neutral-700 hover:border-neutral-400 hover:bg-white'
                    }`}
                  >
                    {material}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
