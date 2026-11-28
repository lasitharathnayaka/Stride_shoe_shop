import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Cpu,
  Feather,
  Layers,
  ShieldCheck,
  Wind,
  Zap,
} from 'lucide-react';

interface TechLayer {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  icon: typeof Zap;
}

const TECH_LAYERS: TechLayer[] = [
  {
    id: 'carbon',
    index: '01',
    title: 'Curved Carbon-Fiber Plate',
    tagline: 'Full-length spoon geometry engineered for explosive toe-off.',
    description:
      'Molded from aerospace-grade T800 woven carbon fiber, our proprietary curved plate acts like a precision leaf spring—storing kinetic impact on heel strike and snapping forward at toe-off with 89% energy return.',
    image: '/images/innovation-carbon.jpg',
    specs: [
      { label: 'Stiffness Rating', value: '94 N/mm' },
      { label: 'Plate Thickness', value: '1.15 mm' },
      { label: 'Energy Return', value: '89.2%' },
    ],
    icon: Zap,
  },
  {
    id: 'foam',
    index: '02',
    title: 'Supercritical Nitrogen Foam',
    tagline: 'Ultra-lightweight PEBA compound infused with nitrogen gas.',
    description:
      'Traditional EVA foams pack out after 300km. Our nitrogen-infused supercritical midsole maintains bounce across 1,200+ kilometers while shaving 35 grams off every pair without sacrificing marathon cushioning.',
    image: '/images/hero-apex-pro.jpg',
    specs: [
      { label: 'Weight Reduction', value: '-35g' },
      { label: 'Rebound Resilience', value: '86%' },
      { label: 'Durability Rating', value: '1,200+ km' },
    ],
    icon: Wind,
  },
  {
    id: 'knit',
    index: '03',
    title: 'AeroWeave Engineered Knit',
    tagline: 'Micro-perforated monofilament upper with zero-stretch lockdown.',
    description:
      'Mapped using 3D thermal imaging of elite marathoners, AeroWeave places open ventilation zones over high-heat areas and reinforced tensile yarns across the midfoot for glove-like security at race pace.',
    image: '/images/prod-vapor-x.jpg',
    specs: [
      { label: 'Upper Weight', value: '42g' },
      { label: 'Airflow Index', value: '+64% Cool' },
      { label: 'Break-In Time', value: '0 Miles' },
    ],
    icon: Feather,
  },
];

const BENCHMARKS = [
  { label: 'Energy Return at Toe-Off', stride: 89, standard: 58, unit: '%' },
  { label: 'Impact Shock Dispersion', stride: 94, standard: 71, unit: '%' },
  { label: 'Foam Resilience @ 500km', stride: 92, standard: 54, unit: '%' },
];

const LAB_SILHOUETTES = [
  {
    name: 'AeroStride Velocity X',
    tag: 'MARATHON CARBON',
    price: '$180.00',
    image: '/images/hero-apex-pro.jpg',
    slug: 'aerostride-velocity-x',
  },
  {
    name: 'STRIDE Apex Court',
    tag: 'COURT LOCKDOWN',
    price: '$195.00',
    image: '/images/prod-apex-court.jpg',
    slug: 'stride-apex-court',
  },
  {
    name: 'STRIDE Terra Trail',
    tag: 'WATERPROOF GTX',
    price: '$210.00',
    image: '/images/prod-terra-trail.jpg',
    slug: 'stride-terra-trail',
  },
];

export default function InnovationPage() {
  const [activeLayerId, setActiveLayerId] = useState<string>('carbon');
  const activeLayer =
    TECH_LAYERS.find((layer) => layer.id === activeLayerId) ?? TECH_LAYERS[0];

  return (
    <div className="bg-white text-neutral-950">
      {/* Dark Obsidian Lab Hero */}
      <section className="relative overflow-hidden bg-[#09090B] py-16 text-white lg:py-24">
        <img
          src="/images/bg-trail.jpg?v=2"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#09090B]/95 via-[#09090B]/80 to-[#09090B]/55" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#F04E2A]/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 text-[#F04E2A]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-neutral-200 uppercase">
              STRIDE BIOMECHANICS LAB • ZURICH &amp; TOKYO
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-white uppercase sm:text-5xl lg:text-6xl lg:leading-[1.02]">
            THE SCIENCE OF{' '}
            <span className="bg-gradient-to-r from-[#FF6B4A] via-[#F04E2A] to-[#FFA057] bg-clip-text text-transparent">
              RELENTLESS SPEED
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            Every STRIDE silhouette starts in our biomechanics wind tunnel and
            pressure-plate lab. We combine aerospace carbon composites with
            supercritical nitrogen cushioning to turn vertical impact into
            effortless forward propulsion.
          </p>

          {/* 4 Lab Telemetry Metrics */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '89%', label: 'Energy Return Rate' },
              { value: '195g', label: 'Flagship Race Weight' },
              { value: '+4.2%', label: 'Running Economy Gain' },
              { value: '1,200km', label: 'Tested Midsole Life' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
              >
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 3-Layer Shoe Architecture Explorer */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-[#F04E2A] uppercase">
                <Layers className="h-3.5 w-3.5" />
                <span>3-LAYER ANATOMY</span>
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase sm:text-3xl">
                INSIDE THE ARCHITECTURE
              </h2>
            </div>

            <p className="max-w-md text-xs text-neutral-500">
              Select each engineered layer to inspect how our carbon plate,
              nitrogen foam, and monofilament knit work together.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Layer Selector Cards */}
            <div className="space-y-3.5 lg:col-span-5">
              {TECH_LAYERS.map((layer) => {
                const Icon = layer.icon;
                const isSelected = layer.id === activeLayer.id;

                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-xl shadow-black/10'
                        : 'border-neutral-200/80 bg-[#FAFAFB] text-neutral-900 hover:border-neutral-400 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? 'text-[#F04E2A]' : 'text-neutral-400'
                        }`}
                      >
                        LAYER {layer.index}
                      </span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isSelected
                            ? 'bg-[#F04E2A] text-white'
                            : 'bg-neutral-200/70 text-neutral-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold uppercase">
                      {layer.title}
                    </h3>
                    <p
                      className={`mt-1 text-xs leading-relaxed ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {layer.tagline}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Layer Inspector Detail Panel */}
            <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-[#F5F5F7] p-5 sm:p-7 lg:col-span-7">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xs">
                <img
                  src={activeLayer.image}
                  alt={activeLayer.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>

              <div className="mt-6">
                <p className="text-[10px] font-bold tracking-[0.16em] text-[#F04E2A] uppercase">
                  SPECIFICATION BREAKDOWN • LAYER {activeLayer.index}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-neutral-950 uppercase sm:text-2xl">
                  {activeLayer.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                  {activeLayer.description}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {activeLayer.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl border border-neutral-200/80 bg-white p-3.5"
                    >
                      <p className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                        {spec.label}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-neutral-950">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Benchmark Comparison Band */}
      <section className="bg-[#09090B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-[#F04E2A] uppercase">
                <Activity className="h-3.5 w-3.5" />
                <span>LAB TELEMETRY</span>
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase sm:text-3xl">
                PROVEN AGAINST CONVENTIONAL EVA
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                Independent mechanical impact testing at 18 km/h cadence shows
                dramatically higher propulsion return and long-distance foam
                recovery compared to standard running trainers.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-[#F04E2A]" />
                <span>Verified across 14,000+ logged athlete kilometers</span>
              </div>
            </div>

            <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-7">
              {BENCHMARKS.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white">{row.label}</span>
                    <span className="font-mono text-[#FF6B4A]">
                      STRIDE {row.stride}
                      {row.unit} vs Standard {row.standard}
                      {row.unit}
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-2">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#B91C0C] to-[#F04E2A]"
                        style={{ width: `${row.stride}%` }}
                      />
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-neutral-500"
                        style={{ width: `${row.standard}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Engineered Silhouettes */}
      <section className="bg-[#F5F5F7] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#F04E2A] uppercase">
                EXPERIENCE THE TECH
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-neutral-950 uppercase sm:text-3xl">
                BUILT WITH STRIDE LAB
              </h2>
            </div>

            <Link
              to="/collections"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 uppercase hover:text-[#F04E2A]"
            >
              <span>Shop All Silhouettes</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {LAB_SILHOUETTES.map((shoe) => (
              <Link
                key={shoe.slug}
                to={`/product/${shoe.slug}`}
                className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="overflow-hidden rounded-xl bg-[#EFEFF2]">
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.14em] text-[#F04E2A] uppercase">
                      {shoe.tag}
                    </p>
                    <h3 className="mt-0.5 font-display text-base font-bold text-neutral-950">
                      {shoe.name}
                    </h3>
                  </div>
                  <span className="font-display text-sm font-bold text-neutral-900">
                    {shoe.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
