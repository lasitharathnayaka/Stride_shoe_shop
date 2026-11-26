import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

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
    <section className="bg-[#F5F5F5] py-16 lg:py-20">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          JOIN THE MOVEMENT
        </p>

        <h2 className="mt-1.5 font-display text-lg font-bold tracking-wide text-neutral-900 uppercase sm:text-xl">
          NEVER MISS A DROP
        </h2>

        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-neutral-500 sm:text-sm">
          Subscribe to get early access to limited edition releases, athlete
          collaborations, and secret colorways.
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
            className="w-full max-w-xs rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-stride-red px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-stride-red-hover sm:w-auto"
          >
            Sign Up
          </button>
        </form>

        {subscribed && (
          <p className="mt-3 text-xs font-medium text-emerald-700">
            You&apos;re on the list. Watch your inbox for upcoming drops.
          </p>
        )}

        <p className="mt-5 text-xs text-neutral-500">
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
    </section>
  );
}
