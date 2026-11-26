import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-[#F5F5F5]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 text-xs text-neutral-500 sm:flex-row lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="font-display font-bold tracking-[0.12em] text-neutral-900 uppercase">
            STRIDE
          </span>
          <span>© 2024 STRIDE Footwear. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#privacy" className="transition-colors hover:text-neutral-900">
            Privacy Policy
          </a>
          <a href="#terms" className="transition-colors hover:text-neutral-900">
            Terms of Service
          </a>
          <a href="#contact" className="transition-colors hover:text-neutral-900">
            Contact
          </a>
          <Link
            to="/admin"
            className="font-medium text-neutral-700 transition-colors hover:text-stride-red"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
