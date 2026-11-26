import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowUpFromLine,
  Check,
  CheckCircle2,
  Heart,
  Rotate3d,
  ShoppingBag,
  Star,
  Timer,
  Wind,
  X,
  Zap,
  ZoomIn,
} from 'lucide-react';
import {
  getProductDetailBySlug,
  PRODUCT_REVIEWS,
  TECH_SPECS,
} from '@/data/productDetailData';
import { useCart } from '@/context/CartContext';
import SizeGuideModal from '@/components/product/SizeGuideModal';

type DetailTab = 'specs' | 'sizing' | 'reviews';
type ReviewFilter =
  | 'All Reviews'
  | 'With Photos'
  | 'Marathon Runners'
  | 'True to Size';

const REVIEW_FILTERS: { id: ReviewFilter; label: string }[] = [
  { id: 'All Reviews', label: 'All Reviews' },
  { id: 'With Photos', label: 'With Photos (84)' },
  { id: 'Marathon Runners', label: 'Marathon Runners' },
  { id: 'True to Size', label: 'True to Size' },
];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug?: string }>();
  const product = getProductDetailBySlug(slug);
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product.gallery[0]);
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product.colors[0].id
  );
  const [selectedSize, setSelectedSize] = useState<string>('US 9.5');
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<DetailTab>('specs');
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('All Reviews');
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  useEffect(() => {
    setActiveImage(product.gallery[0]);
    setSelectedColorId(product.colors[0].id);
    setSelectedSize('US 9.5');
  }, [product.id]);

  const selectedColor =
    product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];

  const handleSelectColor = (colorId: string, colorImage: string) => {
    setSelectedColorId(colorId);
    setActiveImage(colorImage);
  };

  const handleAddToBag = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: activeImage,
      size: selectedSize,
      color: selectedColor.name,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  const filteredReviews =
    reviewFilter === 'All Reviews'
      ? PRODUCT_REVIEWS
      : PRODUCT_REVIEWS.filter((review) => review.tags.includes(reviewFilter));

  const renderSpecIcon = (icon: (typeof TECH_SPECS)[number]['icon']) => {
    switch (icon) {
      case 'zap':
        return <Zap className="h-4 w-4 text-neutral-900" strokeWidth={1.8} />;
      case 'wind':
        return <Wind className="h-4 w-4 text-neutral-900" strokeWidth={1.8} />;
      case 'weight':
        return <Timer className="h-4 w-4 text-neutral-900" strokeWidth={1.8} />;
      case 'drop':
        return (
          <ArrowUpFromLine
            className="h-4 w-4 text-neutral-900"
            strokeWidth={1.8}
          />
        );
    }
  };

  return (
    <div className="bg-white">
      {/* Top Product Hero */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Vertical Thumbnail Rail + Main Image */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row lg:col-span-7">
            {/* Thumbnails */}
            <div className="flex flex-row gap-2.5 sm:w-16 sm:flex-col">
              {product.gallery.map((img, index) => {
                const isSelected = activeImage === img;
                return (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    aria-label={`View angle ${index + 1}`}
                    className={`aspect-square w-14 shrink-0 overflow-hidden rounded-lg border bg-[#F4F4F5] transition-all sm:w-16 ${
                      isSelected
                        ? 'border-neutral-900 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setActiveImage(product.gallery[2] ?? product.gallery[0])}
                aria-label="360 degree view"
                className="flex aspect-square w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-[#F4F4F5] text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 sm:w-16"
              >
                <Rotate3d className="h-4 w-4" strokeWidth={1.7} />
                <span className="text-[9px] font-semibold">360°</span>
              </button>
            </div>

            {/* Main Showcase */}
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#F4F4F5]">
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                aria-label="Zoom product image"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-xs transition-transform hover:scale-105"
              >
                <ZoomIn className="h-4 w-4" strokeWidth={1.8} />
              </button>

              <div className="flex aspect-[4/3] items-center justify-center p-6 sm:aspect-[5/4] sm:p-10">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full rounded-xl object-cover shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Right: Purchase Panel */}
          <div className="lg:col-span-5">
            {/* Brand + Rating */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
                {product.brandLabel}
              </span>

              <div className="inline-flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
                <span className="font-semibold text-neutral-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-neutral-400">
                  ({product.reviewCount} Reviews)
                </span>
              </div>
            </div>

            {/* Title & Price */}
            <h1 className="mt-2 font-editorial text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[28px]">
              {product.name}
            </h1>

            <p className="mt-1.5 font-editorial text-xl font-medium text-neutral-800">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500 sm:text-[13px]">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mt-6">
              <p className="text-xs text-neutral-500">
                <span className="font-semibold text-neutral-900">Color:</span>{' '}
                {selectedColor.name}
              </p>

              <div className="mt-2.5 flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = color.id === selectedColorId;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => handleSelectColor(color.id, color.image)}
                      aria-label={color.name}
                      title={color.name}
                      className={`h-11 w-11 overflow-hidden rounded-lg border bg-[#F4F4F5] p-0.5 transition-all ${
                        isSelected
                          ? 'border-neutral-900 ring-1 ring-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <img
                        src={color.image}
                        alt={color.name}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-900">
                  Select Size{' '}
                  <span className="font-normal text-neutral-400">
                    (US / UK / EU)
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] font-medium text-neutral-600 underline underline-offset-2 transition-colors hover:text-neutral-900"
                >
                  Size &amp; Fit Guide
                </button>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size.label;
                  return (
                    <button
                      key={size.label}
                      type="button"
                      disabled={!size.available}
                      onClick={() => setSelectedSize(size.label)}
                      className={`relative overflow-hidden rounded-md border py-2.5 text-xs font-medium transition-colors ${
                        !size.available
                          ? 'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-300'
                          : isSelected
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <span>{size.label}</span>
                      {!size.available && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent_calc(50%-0.5px),#d4d4d8_50%,transparent_calc(50%+0.5px))]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fit Meter */}
            <div className="mt-5 rounded-lg bg-[#F5F5F5] px-4 py-3.5">
              <div className="flex items-center justify-between text-[9px] font-semibold tracking-[0.12em] uppercase">
                <span className="text-neutral-400">RUNS SMALL</span>
                <span className="text-neutral-900">
                  TRUE TO SIZE (88% AGREE)
                </span>
                <span className="text-neutral-400">RUNS LARGE</span>
              </div>

              <div className="relative mt-2.5 h-1 w-full rounded-full bg-neutral-300/80">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-[68%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900"
                />
              </div>

              <p className="mt-2 text-right text-[10px] text-neutral-400">
                Based on 278 responses
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={handleAddToBag}
                className={`flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-xs font-semibold text-white transition-colors ${
                  justAdded
                    ? 'bg-emerald-600'
                    : 'bg-[#F04E2A] hover:bg-[#D94120]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.2} />
                    <span>Added to Bag ({selectedSize})</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.9} />
                    <span>Add to Bag — ${product.price.toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setWishlisted((prev) => !prev)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
              >
                <Heart
                  className={`h-4 w-4 ${
                    wishlisted ? 'fill-stride-red text-stride-red' : ''
                  }`}
                  strokeWidth={1.8}
                />
                <span>{wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Details, Tech Specs & Reviews Band */}
      <section className="bg-[#F5F5F5] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Tabs Bar */}
          <div className="flex items-center gap-8 border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`border-b-2 pb-3 text-xs font-semibold transition-colors sm:text-sm ${
                activeTab === 'specs'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Details &amp; Tech Specs
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sizing')}
              className={`border-b-2 pb-3 text-xs font-semibold transition-colors sm:text-sm ${
                activeTab === 'sizing'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Sizing &amp; Fit
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`border-b-2 pb-3 text-xs font-semibold transition-colors sm:text-sm ${
                activeTab === 'reviews'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Verified Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tech Spec Cards (shown on Specs tab) */}
          {activeTab === 'specs' && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TECH_SPECS.map((spec) => (
                <div
                  key={spec.id}
                  className="rounded-xl border border-neutral-200/70 bg-white p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                    {renderSpecIcon(spec.icon)}
                  </div>
                  <h3 className="mt-4 font-editorial text-sm font-semibold text-neutral-900">
                    {spec.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Sizing & Fit Panel */}
          {activeTab === 'sizing' && (
            <div className="mt-8 rounded-xl border border-neutral-200/70 bg-white p-6">
              <h3 className="font-editorial text-base font-semibold text-neutral-900">
                Sizing &amp; Fit Guidance
              </h3>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-500">
                88% of runners report that the {product.name} fits true to size
                with a secure racing lockdown through the midfoot and slightly
                tapered forefoot. If you prefer extra toe room for marathons or
                wear thicker socks, consider sizing up half a size.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
                <div className="rounded-lg bg-[#F5F5F5] p-3">
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase">
                    US 8
                  </p>
                  <p className="mt-0.5 font-semibold text-neutral-900">
                    UK 7 / EU 41
                  </p>
                </div>
                <div className="rounded-lg bg-[#F5F5F5] p-3">
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase">
                    US 9
                  </p>
                  <p className="mt-0.5 font-semibold text-neutral-900">
                    UK 8 / EU 42.5
                  </p>
                </div>
                <div className="rounded-lg bg-[#F5F5F5] p-3">
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase">
                    US 10
                  </p>
                  <p className="mt-0.5 font-semibold text-neutral-900">
                    UK 9 / EU 44
                  </p>
                </div>
                <div className="rounded-lg bg-[#F5F5F5] p-3">
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase">
                    US 11
                  </p>
                  <p className="mt-0.5 font-semibold text-neutral-900">
                    UK 10 / EU 45
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Customer Reviews & Buyer Photos */}
          <div className="mt-12">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="font-editorial text-lg font-semibold text-neutral-900 sm:text-xl">
                  Customer Reviews &amp; Buyer Photos
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Real feedback from verified runners and sneaker enthusiasts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {REVIEW_FILTERS.map((filter) => {
                  const isActive = reviewFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setReviewFilter(filter.id)}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors ${
                        isActive
                          ? 'bg-neutral-900 text-white'
                          : 'border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {filteredReviews.map((review) => (
                <article
                  key={review.id}
                  className="flex flex-col justify-between rounded-xl border border-neutral-200/70 bg-white p-5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-neutral-900">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={`${review.id}-star-${i}`}
                            className="h-3 w-3 fill-neutral-900 text-neutral-900"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-400">
                        {review.dateLabel}
                      </span>
                    </div>

                    <h3 className="mt-3 font-editorial text-sm font-semibold text-neutral-900">
                      {review.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                      {review.body}
                    </p>

                    <div className="mt-4 overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={review.photo}
                        alt={`Review photo by ${review.author}`}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5 border-t border-neutral-100 pt-3.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-700">
                      {review.initials}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        {review.author}
                      </p>
                      {review.verified && (
                        <p className="inline-flex items-center gap-1 text-[10px] text-neutral-400">
                          <CheckCircle2 className="h-2.5 w-2.5 text-neutral-500" />
                          Verified Buyer
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Size & Fit Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        currentSize={selectedSize}
        onApplySize={(sizeLabel) => {
          const match = product.sizes.find(
            (s) => s.label === sizeLabel && s.available
          );
          if (match) {
            setSelectedSize(match.label);
          }
        }}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl bg-white p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close zoom preview"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={activeImage}
              alt={product.name}
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
