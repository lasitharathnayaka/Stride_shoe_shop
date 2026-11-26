import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';

type AuthTab = 'signin' | 'signup' | 'guest';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTab: AuthTab =
    location.pathname === '/signup' ? 'signup' : 'signin';

  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [showPassword, setShowPassword] = useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('••••••••••••');

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
    <div className="grid min-h-[calc(100vh-125px)] grid-cols-1 lg:grid-cols-2">
      {/* Left Monochrome Editorial Visual Panel */}
      <div className="relative hidden overflow-hidden bg-neutral-900 lg:flex lg:flex-col lg:justify-between">
        <img
          src="/images/cat-lifestyle.jpg"
          alt="Stride Editorial Footwear"
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

        {/* Top Editorial Caption */}
        <div className="relative z-10 flex items-center justify-between px-10 pt-9 text-[10px] font-semibold tracking-[0.16em] text-white/80 uppercase">
          <span>STRIDE EDITORIAL</span>
          <span>VOL. 04 / AUTUMN</span>
        </div>

        {/* Bottom Member Perks Quote */}
        <div className="relative z-10 max-w-md px-10 pb-12 text-white">
          <p className="font-editorial text-sm leading-relaxed text-white/95">
            &ldquo;Member Perks: Early access to limited drops, saved fit
            profiles, and free 30-day exchanges.&rdquo;
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/80">
            <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            <span>Curated for verified members only</span>
          </p>
        </div>
      </div>

      {/* Right Auth Form Column */}
      <div className="flex items-center justify-center bg-[#FAFAFA] px-6 py-12 sm:px-10 lg:py-16">
        <div className="w-full max-w-[380px]">
          {/* 3-Tab Switcher */}
          <div className="flex items-center justify-between border-b border-neutral-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`border-b-2 pb-3 transition-colors ${
                activeTab === 'signin'
                  ? 'border-neutral-900 font-semibold text-neutral-900'
                  : 'border-transparent font-medium text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`border-b-2 pb-3 transition-colors ${
                activeTab === 'signup'
                  ? 'border-neutral-900 font-semibold text-neutral-900'
                  : 'border-transparent font-medium text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guest')}
              className={`border-b-2 pb-3 transition-colors ${
                activeTab === 'guest'
                  ? 'border-neutral-900 font-semibold text-neutral-900'
                  : 'border-transparent font-medium text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Track Guest Order
            </button>
          </div>

          {/* SIGN IN TAB */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="mt-8">
              <h1 className="font-editorial text-xl font-semibold text-neutral-900">
                Welcome Back
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Sign in to access your saved sizes and orders.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="signin-email"
                    className="block text-[11px] font-semibold text-neutral-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1.5 w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="signin-password"
                      className="block text-[11px] font-semibold text-neutral-800"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-[10px] font-medium text-neutral-400 transition-colors hover:text-neutral-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-1.5">
                    <input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full rounded-md border border-neutral-200 bg-white py-2.5 pr-10 pl-3.5 text-xs text-neutral-900 focus:border-neutral-400 focus:outline-none"
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
                className="mt-5 w-full rounded-md bg-[#F04E2A] py-3 text-xs font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#D94120]"
              >
                SIGN IN
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-200" />
                <span className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
                  OR CONTINUE WITH
                </span>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white py-2.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  <span className="font-bold">G</span>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white py-2.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
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
              <p className="mt-7 text-center text-[11px] leading-relaxed text-neutral-500">
                Checked out as a guest?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('guest')}
                  className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-stride-red"
                >
                  Switch to Track Guest Order
                </button>{' '}
                using your Order ID.
              </p>
            </form>
          )}

          {/* CREATE ACCOUNT TAB */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="mt-8">
              <h1 className="font-editorial text-xl font-semibold text-neutral-900">
                Create Member Account
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Unlock early access to limited drops and saved fit profiles.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="signup-name"
                    className="block text-[11px] font-semibold text-neutral-800"
                  >
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="mt-1.5 w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-[11px] font-semibold text-neutral-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1.5 w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-[11px] font-semibold text-neutral-800"
                  >
                    Password
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full rounded-md border border-neutral-200 bg-white py-2.5 pr-10 pl-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
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
                className="mt-5 w-full rounded-md bg-[#F04E2A] py-3 text-xs font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#D94120]"
              >
                CREATE ACCOUNT
              </button>

              <p className="mt-6 text-center text-[11px] text-neutral-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-stride-red"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}

          {/* TRACK GUEST ORDER TAB */}
          {activeTab === 'guest' && (
            <form onSubmit={handleGuestLookup} className="mt-8">
              <h1 className="font-editorial text-xl font-semibold text-neutral-900">
                Track Guest Order
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Enter your Order ID and email address to check shipment status.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="guest-order-id"
                    className="block text-[11px] font-semibold text-neutral-800"
                  >
                    Order ID
                  </label>
                  <input
                    id="guest-order-id"
                    type="text"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="#SH-90412"
                    className="mt-1.5 w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guest-email"
                    className="block text-[11px] font-semibold text-neutral-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1.5 w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-md bg-[#F04E2A] py-3 text-xs font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#D94120]"
              >
                TRACK ORDER
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
