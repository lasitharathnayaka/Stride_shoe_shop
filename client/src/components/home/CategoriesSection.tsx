import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/homeData';

const DISCIPLINE_COUNTS: Record<string, string> = {
  running: '24 Silhouettes',
  lifestyle: '18 Silhouettes',
  basketball: '12 Silhouettes',
  boots: '9 Silhouettes',
};

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-stride-red uppercase">
              CATEGORIES
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase sm:text-3xl">
              SHOP BY DISCIPLINE
            </h2>
          </div>

          <Link
            to="/collections"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:text-stride-red"
          >
            <span>Explore All Disciplines</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to="/collections"
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={category.image}
                alt={`${category.subtitle} ${category.title}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

              {/* Top Count Pill */}
              <div className="absolute top-3.5 left-3.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md">
                {DISCIPLINE_COUNTS[category.slug] ?? '16 Silhouettes'}
              </div>

              {/* Top-Right Hover Arrow */}
              <span className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-stride-red group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              {/* Bottom Title */}
              <div className="absolute right-5 bottom-5 left-5">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-300 uppercase">
                  {category.index}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-wide text-white uppercase">
                  {category.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 transition-colors group-hover:text-white">
                  <span>Shop Collection</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
