import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftRight,
  Award,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from 'lucide-react';

const GUARANTEES = [
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'Complimentary 2-day courier delivery on all orders over $150.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Instant Size Exchanges',
    desc: 'Reserve your new size immediately with free doorstep pickup.',
  },
  {
    icon: ShieldCheck,
    title: '30-Day Road Trial',
    desc: 'Run, train, and test outdoors. Return hassle-free within 30 days.',
  },
  {
    icon: Award,
    title: '2-Year Carbon Warranty',
    desc: 'Full structural guarantee on all carbon-plate & foam midsoles.',
  },
];

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* 4-Pillar Trust Strip */}
        <div className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200/80 bg-[#FAFAFB] p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-sm font-bold text-neutral-950 uppercase">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Elevated Drop Signup Card */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-[#F4F4F6] px-6 py-14 text-center sm:px-12 lg:py-16">
          <div className="mx-auto max-w-xl">
            <p className="text-[10px] font-bold tracking-[0.18em] text-stride-red uppercase">
              JOIN THE MOVEMENT
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase sm:text-3xl">
              NEVER MISS A DROP
            </h2>

            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">
              Subscribe to get early access to limited edition releases, athlete
              collaborations, and member-only colorways.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribed) setSubscribed(false);
                }}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="w-full max-w-xs rounded-lg border border-neutral-300 bg-white px-4 py-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-stride-red px-6 py-3 text-xs font-bold tracking-wide text-white uppercase shadow-sm transition-colors hover:bg-stride-red-hover sm:w-auto"
              >
                Sign Up
              </button>
            </form>

            {subscribed && (
              <p className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  You&apos;re on the list. Watch your inbox for upcoming drops.
                </span>
              </p>
            )}

            <p className="mt-6 text-xs text-neutral-500">
              Member Portal:{' '}
              <Link
                to="/login"
                className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-stride-red"
              >
                Sign In
              </Link>{' '}
              or{' '}
              <Link
                to="/signup"
                className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-stride-red"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
