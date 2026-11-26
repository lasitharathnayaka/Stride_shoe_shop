import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/homeData';

export default function CategoriesSection() {
  return (
    <section id="categories" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
              CATEGORIES
            </p>
            <h2 className="mt-1 font-display text-lg font-bold tracking-wide text-neutral-900 uppercase sm:text-xl">
              SHOP BY DISCIPLINE
            </h2>
          </div>

          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to="/collections"
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900"
            >
              <img
                src={category.image}
                alt={`${category.subtitle} ${category.title}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute right-4 bottom-4 left-4">
                <p className="text-[10px] font-medium tracking-[0.14em] text-neutral-300 uppercase">
                  {category.index}
                </p>
                <h3 className="mt-0.5 font-display text-base font-bold tracking-wide text-white uppercase">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
