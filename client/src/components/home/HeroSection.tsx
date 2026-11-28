import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSlide {
  id: string;
  indexLabel: string;
  shortTitle: string;
  badge: string;
  headlineTop: string;
  headlineAccent: string;
  description: string;
  wallpaper: string;
  product: {
    name: string;
    edition: string;
    specs: string;
    price: string;
    tag: string;
    image: string;
    slug: string;
  };
  metrics: {
    value: string;
    label: string;
  }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'running',
    indexLabel: '01',
    shortTitle: 'Running',
    badge: 'SPRING / SUMMER COLLECTION',
    headlineTop: 'ENGINEERED FOR',
    headlineAccent: 'EVERY STRIDE',
    description:
      'Push the boundaries of speed and comfort with next-gen carbon architecture and supercritical nitrogen cushioning designed for relentless momentum.',
    wallpaper: '/images/bg-running.jpg?v=2',
    product: {
      name: 'APEX PRO CARBON',
      edition: 'STRIDE LAB • EDITION 04',
      specs: 'Weight: 195g • 8mm Drop • Full Carbon Plate',
      price: '$180.00',
      tag: 'CARBON PLATE',
      image: '/images/hero-apex-pro.jpg',
      slug: 'aerostride-velocity-x',
    },
    metrics: [
      { value: '195g', label: 'Featherlight Build' },
      { value: '89%', label: 'Energy Return' },
      { value: '4.9★', label: '1,200+ Runners' },
    ],
  },
  {
    id: 'court',
    indexLabel: '02',
    shortTitle: 'Court',
    badge: 'PRO COURT SERIES',
    headlineTop: 'DOMINATE',
    headlineAccent: 'EVERY COURT',
    description:
      'Explosive lateral lockdown meets dual-density responsive foam for split-second cuts, high-impact landings, and fourth-quarter stamina.',
    wallpaper: '/images/bg-court.jpg?v=2',
    product: {
      name: 'STRIDE APEX COURT',
      edition: 'COURT ARCHIVE • LIMITED',
      specs: 'Weight: 310g • Carbon Shank • Ankle Lock',
      price: '$195.00',
      tag: 'LIMITED DROP',
      image: '/images/prod-apex-court.jpg',
      slug: 'stride-apex-court',
    },
    metrics: [
      { value: '360°', label: 'Lateral Traction' },
      { value: 'Dual', label: 'Zoom Cushioning' },
      { value: '4.9★', label: 'Pro Verified' },
    ],
  },
  {
    id: 'trail',
    indexLabel: '03',
    shortTitle: 'All-Terrain',
    badge: 'OUTDOOR ARCHIVE',
    headlineTop: 'CONQUER',
    headlineAccent: 'EVERY TERRAIN',
    description:
      'Built for wet volcanic rock and alpine ridgelines with waterproof storm membranes, reinforced toe armor, and deep multi-directional lugs.',
    wallpaper: '/images/bg-trail.jpg?v=2',
    product: {
      name: 'STRIDE TERRA TRAIL',
      edition: 'ALL-TERRAIN • GTX',
      specs: 'Waterproof Shield • 5mm Lugs • Rock Plate',
      price: '$210.00',
      tag: 'ALL-WEATHER',
      image: '/images/prod-terra-trail.jpg',
      slug: 'stride-terra-trail',
    },
    metrics: [
      { value: '100%', label: 'Waterproof GTX' },
      { value: '5mm', label: 'Deep Grip Lugs' },
      { value: '4.8★', label: 'Trail Tested' },
    ],
  },
  {
    id: 'lifestyle',
    indexLabel: '04',
    shortTitle: 'Streetwear',
    badge: 'URBAN STUDIO',
    headlineTop: 'CRAFTED FOR',
    headlineAccent: 'THE CITY',
    description:
      'Architectural minimalism fused with all-day marathon midsole technology—designed to transition effortlessly from morning miles to studio nights.',
    wallpaper: '/images/bg-streetwear.jpg?v=2',
    product: {
      name: 'STRIDE KINETIC',
      edition: 'URBAN UTILITY • NEW',
      specs: 'Weight: 225g • Knit Mesh • Cloud Midsole',
      price: '$160.00',
      tag: 'NEW RELEASE',
      image: '/images/prod-kinetic.jpg',
      slug: 'stride-kinetic',
    },
    metrics: [
      { value: '225g', label: 'All-Day Light' },
      { value: 'Knit', label: 'Breathable Upper' },
      { value: '4.9★', label: 'Daily Favorite' },
    ],
  },
];

const SLIDE_DURATION_MS = 4500;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Live-Changing 16:9 Luxury Shoe Store Wallpapers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                key={isCurrent ? `${slide.id}-live` : slide.id}
                src={slide.wallpaper}
                alt=""
                aria-hidden="true"
                className={`h-full w-full object-cover object-center ${
                  isCurrent ? 'animate-kenburns' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Balanced Directional Scrim — keeps flagship sneaker store interior vivid & clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-14 pb-10 lg:px-10 lg:pt-20 lg:pb-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F04E2A] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F04E2A]" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.18em] text-white uppercase">
                {activeSlide.badge}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-white uppercase drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[62px] lg:leading-[1.0]">
              {activeSlide.headlineTop}
              <br />
              <span className="bg-gradient-to-r from-[#FF6B4A] via-[#F04E2A] to-[#FFA057] bg-clip-text text-transparent">
                {activeSlide.headlineAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-100/90 drop-shadow-xs sm:text-[15px]">
              {activeSlide.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/collections"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#F04E2A] px-6 py-3.5 text-xs font-bold tracking-wide text-white uppercase shadow-lg shadow-[#F04E2A]/30 transition-all hover:-translate-y-0.5 hover:bg-[#D94120]"
              >
                <span>Shop The Drop</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="#innovation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-bold tracking-wide text-white uppercase backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-neutral-950"
              >
                <span>Explore Tech</span>
              </a>
            </div>

            {/* Frosted Dark-Glass Telemetry Pills */}
            <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
              {activeSlide.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-xl"
                >
                  <p className="font-display text-lg font-bold text-white sm:text-xl">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-neutral-300">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Frosted-Glass Floating Product Card */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Link
              to={`/product/${activeSlide.product.slug}`}
              className="group block rounded-[28px] border border-white/20 bg-white/10 p-4 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/35 hover:bg-white/15 sm:p-5"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#EAEAEF] to-[#DEDEE4]">
                <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-neutral-950/85 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
                  <Flame className="h-3 w-3 text-[#F04E2A]" />
                  <span>Flagship Drop</span>
                </div>

                <div className="absolute top-3.5 right-3.5 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-neutral-950 shadow-xs">
                  {activeSlide.product.price}
                </div>

                <div className="flex aspect-[4/3] items-center justify-center">
                  <img
                    src={activeSlide.product.image}
                    alt={activeSlide.product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 backdrop-blur-xl">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-neutral-300 uppercase">
                    {activeSlide.product.edition}
                  </p>
                  <h2 className="mt-0.5 font-display text-sm font-bold tracking-wide text-white uppercase sm:text-base">
                    {activeSlide.product.name}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-neutral-300">
                    {activeSlide.product.specs}
                  </p>
                </div>

                <span className="shrink-0 rounded-lg bg-[#F04E2A] px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#D94120]">
                  {activeSlide.product.tag}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Glassy Interactive Wallpaper Switcher */}
        <div className="mt-12 flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-black/40 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center">
          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="group text-left"
                >
                  <div className="flex items-center gap-2 text-[11px]">
                    <span
                      className={`font-mono font-bold ${
                        isCurrent ? 'text-[#F04E2A]' : 'text-white/45'
                      }`}
                    >
                      {slide.indexLabel}
                    </span>
                    <span
                      className={`font-bold tracking-wider uppercase transition-colors ${
                        isCurrent
                          ? 'text-white'
                          : 'text-white/55 group-hover:text-white'
                      }`}
                    >
                      {slide.shortTitle}
                    </span>
                  </div>
                  <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                    {isCurrent && (
                      <div
                        key={`${slide.id}-${isPaused ? 'paused' : 'play'}`}
                        className={`h-full bg-[#F04E2A] ${
                          isPaused ? 'w-1/2' : 'animate-slide-progress'
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous wallpaper"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-950"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-950"
            >
              {isPaused ? (
                <Play className="h-3.5 w-3.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next wallpaper"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-950"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Athletic Marquee Band */}
      <div className="relative z-10 border-t border-white/10 bg-black/80 py-3.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-[10px] font-bold tracking-[0.18em] text-neutral-300 uppercase sm:justify-between lg:px-10">
          <span className="inline-flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-[#F04E2A]" />
            CARBON PROPULSION ARCHITECTURE
          </span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#F04E2A]" />
            SUPERCRITICAL NITROGEN FOAM
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#F04E2A]" />
            FREE 30-DAY TRIAL &amp; SIZE EXCHANGES
          </span>
          <span className="hidden items-center gap-2 lg:inline-flex">
            <Flame className="h-3.5 w-3.5 text-[#F04E2A]" />
            FREE EXPRESS SHIPPING $150+
          </span>
        </div>
      </div>
    </section>
  );
}
