export default function InnovationSection() {
  return (
    <section id="innovation" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        {/* Left Outsole Visual */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl bg-[#F2F2F2]">
            <img
              src="/images/innovation-carbon.jpg"
              alt="Carbon plate outsole architecture"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
        </div>

        {/* Right Technology Copy + Metrics */}
        <div className="lg:col-span-6">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
            INNOVATION LAB
          </p>

          <h2 className="mt-1.5 font-display text-xl font-bold tracking-wide text-neutral-900 uppercase sm:text-2xl">
            CARBON ARCHITECTURE REDEFINED
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
            Our proprietary curved carbon plate works in tandem with
            nitrogen-infused foam to deliver an unprecedented 89% energy return
            with every toe-off. Designed by aerodynamicists, proven by elite
            marathoners.
          </p>

          <div className="mt-8 grid max-w-sm grid-cols-2 gap-6">
            <div>
              <p className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
                89%
              </p>
              <p className="mt-1 text-xs text-neutral-500">Energy Return Rate</p>
            </div>

            <div>
              <p className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
                -35g
              </p>
              <p className="mt-1 text-xs text-neutral-500">Weight Reduction</p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#featured"
              className="inline-flex items-center justify-center rounded-md bg-stride-dark px-6 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Discover The Technology
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
