import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InnovationSection() {
  return (
    <section
      id="innovation"
      className="relative overflow-hidden bg-[#0B0B0D] py-20 text-white lg:py-28"
    >
      {/* Subtle vermilion ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#F04E2A]/12 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        {/* Left Outsole Visual */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl">
            <img
              src="/images/innovation-carbon.jpg"
              alt="Carbon plate outsole architecture"
              className="aspect-[16/11] w-full rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Right Technology Copy + Metrics */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <Zap className="h-3 w-3 text-[#F04E2A]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-neutral-300 uppercase">
              INNOVATION LAB
            </span>
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            CARBON ARCHITECTURE REDEFINED
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400">
            Our proprietary curved carbon plate works in tandem with
            nitrogen-infused supercritical foam to deliver an unprecedented 89%
            energy return with every toe-off. Designed by aerodynamicists,
            proven by elite marathoners.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3.5 sm:gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                89%
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Energy Return
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-display text-2xl font-bold text-[#F04E2A] sm:text-3xl">
                -35g
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Weight Saved
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                8mm
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Precision Drop
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/innovation"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-xs font-bold tracking-wide text-neutral-950 uppercase transition-all hover:bg-[#F04E2A] hover:text-white"
            >
              <span>Discover The Technology</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
