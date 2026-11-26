import { useEffect, useState, type FormEvent } from 'react';
import { Bell, CheckCircle2, X } from 'lucide-react';

export interface RestockProduct {
  id: string;
  brand: string;
  name: string;
  colorway: string;
  image: string;
  defaultSize?: string;
}

interface RestockAlertModalProps {
  isOpen: boolean;
  product: RestockProduct | null;
  onClose: () => void;
}

const ALERT_SIZES = ['US 9.5', 'US 10', 'US 10.5'];

export default function RestockAlertModal({
  isOpen,
  product,
  onClose,
}: RestockAlertModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('US 10');
  const [email, setEmail] = useState<string>('alexander@example.com');
  const [smsEnabled, setSmsEnabled] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && product) {
      setSelectedSize(product.defaultSize ?? 'US 10');
      setSubmitted(false);
    }
  }, [isOpen, product]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="restock-modal-title"
    >
      <div
        className="relative w-full max-w-[380px] rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Row: Bell Icon + Close */}
        <div className="flex items-start justify-between">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4F4F5] text-neutral-900">
            <Bell className="h-4 w-4 fill-neutral-900" strokeWidth={1.8} />
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close restock alert modal"
            className="rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className="mt-3 font-editorial text-base font-semibold text-neutral-900">
              Alert Activated for {selectedSize}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
              We&apos;ll notify <span className="font-medium text-neutral-800">{email}</span>
              {smsEnabled ? ' and send an instant SMS' : ''} the moment{' '}
              <span className="font-medium text-neutral-800">{product.name}</span>{' '}
              restocks.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-md bg-neutral-900 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <h2
              id="restock-modal-title"
              className="mt-3 font-editorial text-base font-semibold text-neutral-900"
            >
              Get Notified When {selectedSize} Restocks
            </h2>

            {/* Product Summary Box */}
            <div className="mt-3.5 flex items-center justify-between gap-3 rounded-lg bg-[#F5F5F5] p-3">
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-11 w-11 shrink-0 rounded-md bg-white object-cover"
                />
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
                    {product.brand}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-neutral-800">
                    {product.name} — {product.colorway}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-800">
                {selectedSize}
              </span>
            </div>

            {/* Select Size for Alert */}
            <div className="mt-5">
              <p className="text-[11px] font-semibold text-neutral-800">
                Select Size for Alert
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {ALERT_SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-md border py-2 text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Address */}
            <div className="mt-4">
              <label
                htmlFor="restock-email"
                className="block text-[11px] font-semibold text-neutral-800"
              >
                Email Address
              </label>
              <input
                id="restock-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@example.com"
                className="mt-1.5 w-full rounded-md border border-neutral-200 bg-[#F5F5F5] px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none"
              />
            </div>

            {/* SMS Alert Toggle */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold text-neutral-900">
                  Also send SMS alert
                </p>
                <p className="text-[10px] text-neutral-400">
                  Instant text when live
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={smsEnabled}
                aria-label="Also send SMS alert"
                onClick={() => setSmsEnabled((prev) => !prev)}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                  smsEnabled ? 'bg-neutral-900' : 'bg-neutral-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                    smsEnabled ? 'translate-x-4.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {smsEnabled && (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (212) 555-8392"
                aria-label="Phone number for SMS alert"
                className="mt-2.5 w-full rounded-md border border-neutral-200 bg-[#F5F5F5] px-3.5 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none"
              />
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-[#F04E2A] py-3 text-xs font-semibold text-white transition-colors hover:bg-[#D94120]"
            >
              Notify Me When Available
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
