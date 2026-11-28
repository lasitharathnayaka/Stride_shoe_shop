import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';

type AuthTab = 'signin' | 'signup' | 'guest';

const AUTH_WALLPAPERS = [
  {
    id: 'flagship',
    image: '/images/bg-running.jpg?v=2',
    location: 'ZURICH FLAGSHIP',
    eyebrow: 'MEMBER ACCESS',
    headlineTop: 'STEP INTO THE',
    headlineAccent: 'ARCHIVE',
  },
  {
    id: 'gallery',
    image: '/images/bg-court.jpg?v=2',
    location: 'NEW YORK GALLERY',
    eyebrow: 'COLLECTOR VAULT',
    headlineTop: 'BUILT FOR',
    headlineAccent: 'CHAMPIONS',
  },
  {
    id: 'lab',
    image: '/images/bg-trail.jpg?v=2',
    location: 'INNOVATION SHOWROOM',
    eyebrow: 'CARBON ARCHITECTURE',
    headlineTop: 'ENGINEERED',
    headlineAccent: 'FOR SPEED',
  },
  {
    id: 'tokyo',
    image: '/images/bg-streetwear.jpg?v=2',
    location: 'TOKYO STUDIO',
    eyebrow: 'CURATED RELEASES',
    headlineTop: 'CRAFTED FOR',
    headlineAccent: 'THE STREETS',
  },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab: AuthTab =
    location.pathname === '/signup' ? 'signup' : 'signin';

  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % AUTH_WALLPAPERS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = AUTH_WALLPAPERS[slideIndex];

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Create Account state
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Guest Lookup state
  const [orderId, setOrderId] = useState('#SH-90412');
  const [guestEmail, setGuestEmail] = useState('');

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
  };

  const handleGuestLookup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/order-confirmation');
  };

  return (
    <div className="grid min-h-[calc(100vh-125px)] grid-cols-1 lg:grid-cols-12">
      {/* Left Luxury Obsidian Live-Changing Editorial Panel */}
      <div className="relative hidden overflow-hidden bg-[#09090B] lg:col-span-6 lg:flex lg:flex-col lg:justify-between">
        {/* Live Crossfading Shoe Store Wallpapers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {AUTH_WALLPAPERS.map((slide, idx) => {
            const isCurrent = idx === slideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isCurrent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  key={isCurrent ? `${slide.id}-active` : slide.id}
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-cover object-center ${
                    isCurrent ? 'animate-kenburns' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/92 via-[#09090B]/40 to-[#09090B]/55" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#F04E2A]/15 blur-3xl" />
        </div>

        {/* Top Editorial Caption */}
        <div className="relative z-10 flex items-center justify-between px-10 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F04E2A]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-white uppercase">
              STRIDE INSIDER
            </span>
          </div>
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-neutral-200 uppercase backdrop-blur-md">
            {currentSlide.location}
          </span>
        </div>

        {/* Center Brand Headline */}
        <div className="relative z-10 px-10">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#FF6B4A] uppercase">
            {currentSlide.eyebrow}
          </p>
          <h2 className="mt-2 max-w-md font-display text-4xl font-bold tracking-tight text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] leading-[1.04]">
            {currentSlide.headlineTop}{' '}
            <span className="bg-gradient-to-r from-[#FF6B4A] to-[#F04E2A] bg-clip-text text-transparent">
              {currentSlide.headlineAccent}
            </span>
          </h2>
        </div>

        {/* Bottom Glassmorphic Member Perks Card + Live Slide Dots */}
        <div className="relative z-10 px-10 pb-10">
          <div className="rounded-2xl border border-white/15 bg-black/45 p-6 backdrop-blur-2xl">
            <p className="font-editorial text-sm leading-relaxed text-white/95">
              &ldquo;Early access to limited carbon drops, saved US/EU fit
              profiles, and complimentary 30-day doorstep size exchanges.&rdquo;
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Early Drop Access',
                'Saved Fit Profile',
                'Free 30-Day Exchanges',
              ].map((perk) => (
                <span
                  key={perk}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-[10px] font-semibold text-neutral-100"
                >
                  <Sparkles className="h-2.5 w-2.5 text-[#F04E2A]" />
                  {perk}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Curated for verified STRIDE members</span>
              </p>

              {/* Interactive Live Wallpaper Dots */}
              <div className="flex items-center gap-1.5">
                {AUTH_WALLPAPERS.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    aria-label={`Show ${slide.location} wallpaper`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === slideIndex
                        ? 'w-6 bg-[#F04E2A]'
                        : 'w-1.5 bg-white/35 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Elevated Auth Form Panel */}
      <div className="flex items-center justify-center bg-[#F5F5F7] px-6 py-12 sm:px-10 lg:col-span-6 lg:py-16">
        <div className="w-full max-w-[440px] rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-xl shadow-black/[0.04] sm:p-9">
          {/* Segmented Pill Tab Switcher */}
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-neutral-100 p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`rounded-lg py-2 font-bold transition-all ${
                activeTab === 'signin'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-950'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`rounded-lg py-2 font-bold transition-all ${
                activeTab === 'signup'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-950'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guest')}
              className={`rounded-lg py-2 font-bold transition-all ${
                activeTab === 'guest'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-950'
              }`}
            >
              Guest Order
            </button>
          </div>

          {/* SIGN IN TAB */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="mt-7">
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#F04E2A] uppercase">
                MEMBER PORTAL
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase">
                Welcome Back
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Sign in to access your saved sizes, wishlist, and order history.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="signin-email"
                    className="block text-[11px] font-bold text-neutral-700"
                  >
                    Email Address
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="signin-email"
                      type="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-3.5 pl-10 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="signin-password"
                      className="block text-[11px] font-bold text-neutral-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-[11px] font-semibold text-neutral-500 transition-colors hover:text-[#F04E2A]"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-1.5">
                    <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-10 pl-10 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3.5 text-xs font-bold tracking-[0.1em] text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-all hover:bg-[#D94120]"
              >
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-[10px] font-bold tracking-[0.14em] text-neutral-400 uppercase">
                  OR CONTINUE WITH
                </span>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 text-xs font-bold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-white"
                >
                  <span className="font-bold">G</span>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-2 rounded-xl bg-neutral-950 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              {/* Guest Switch Footer */}
              <p className="mt-6 text-center text-[11px] leading-relaxed text-neutral-500">
                Checked out as a guest?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('guest')}
                  className="font-bold text-neutral-950 underline underline-offset-2 hover:text-[#F04E2A]"
                >
                  Track Guest Order
                </button>
              </p>
            </form>
          )}

          {/* CREATE ACCOUNT TAB */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="mt-7">
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#F04E2A] uppercase">
                JOIN STRIDE INSIDER
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase">
                Create Account
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Unlock early access to limited drops and saved fit profiles.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="signup-name"
                    className="block text-[11px] font-bold text-neutral-700"
                  >
                    Full Name
                  </label>
                  <div className="relative mt-1.5">
                    <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-3.5 pl-10 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-[11px] font-bold text-neutral-700"
                  >
                    Email Address
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-3.5 pl-10 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-[11px] font-bold text-neutral-700"
                  >
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-10 pl-10 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3.5 text-xs font-bold tracking-[0.1em] text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-all hover:bg-[#D94120]"
              >
                <span>Create Account</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="mt-6 text-center text-[11px] text-neutral-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="font-bold text-neutral-950 underline underline-offset-2 hover:text-[#F04E2A]"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}

          {/* TRACK GUEST ORDER TAB */}
          {activeTab === 'guest' && (
            <form onSubmit={handleGuestLookup} className="mt-7">
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#F04E2A] uppercase">
                ORDER LOOKUP
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-950 uppercase">
                Track Guest Order
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Enter your Order ID and email address to view live shipment
                status.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="guest-order-id"
                    className="block text-[11px] font-bold text-neutral-700"
                  >
                    Order ID
                  </label>
                  <div className="relative mt-1.5">
                    <Package className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="guest-order-id"
                      type="text"
                      required
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="#SH-90412"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-3.5 pl-10 font-mono text-xs font-bold text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="guest-email"
                    className="block text-[11px] font-bold text-neutral-700"
                  >
                    Email Address
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="guest-email"
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-neutral-200 bg-[#FAFAFB] py-2.5 pr-3.5 pl-10 text-xs font-medium text-neutral-950 placeholder:text-neutral-400 transition-colors focus:border-neutral-950 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F04E2A] py-3.5 text-xs font-bold tracking-[0.1em] text-white uppercase shadow-md shadow-[#F04E2A]/25 transition-all hover:bg-[#D94120]"
              >
                <span>Track Order</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          {/* Security Footer Note */}
          <div className="mt-7 flex items-center justify-center gap-1.5 border-t border-neutral-100 pt-5 text-[10px] font-medium text-neutral-400">
            <ShieldCheck className="h-3.5 w-3.5 text-neutral-500" />
            <span>256-Bit Encrypted STRIDE Member Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
