import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[#F5F5F5]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-24">
        {/* Left Copy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-200/80 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-stride-red" />
            <span className="text-[10px] font-semibold tracking-[0.14em] text-neutral-700 uppercase">
              SPRING / SUMMER 2024 COLLECTION
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-neutral-900 uppercase sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
            ENGINEERED FOR EVERY STRIDE
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
            Push the boundaries of speed and comfort with next-gen carbon
            architecture and ultra-responsive cushioning designed for relentless
            momentum.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2.5 rounded-md bg-stride-red px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-stride-red-hover"
            >
              <span>Shop The Drop</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="#innovation"
              className="inline-flex items-center rounded-md bg-neutral-200/90 px-5 py-3 text-xs font-semibold text-neutral-900 transition-colors hover:bg-neutral-300/80"
            >
              Explore Tech
            </a>
          </div>
        </div>

        {/* Right Featured Product Card */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-2xl border border-neutral-200/70 bg-[#EAEAEA]/80 p-3.5 shadow-sm sm:p-4">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#C8C8CC] via-[#D8D8DC] to-[#E6E6E8]">
              <img
                src="/images/hero-apex-pro.jpg"
                alt="Apex Pro Carbon running shoe"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-xs">
              <div>
                <h2 className="font-display text-xs font-bold tracking-wide text-neutral-900 uppercase">
                  APEX PRO CARBON
                </h2>
                <p className="mt-0.5 text-[11px] text-neutral-500">
                  Weight: 195g
                </p>
              </div>

              <span className="rounded bg-stride-red px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                CARBON PLATE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
