import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SizeRow {
  usMen: string;
  sizeLabel: string;
  usWomen: string;
  uk: string;
  eu: string;
  cm: string;
  inches: string;
}

const SIZE_ROWS: SizeRow[] = [
  {
    usMen: '8.0',
    sizeLabel: 'US 8',
    usWomen: '9.5',
    uk: '7.0',
    eu: '41',
    cm: '26.0',
    inches: '10.2',
  },
  {
    usMen: '8.5',
    sizeLabel: 'US 8.5',
    usWomen: '10.0',
    uk: '7.5',
    eu: '42',
    cm: '26.5',
    inches: '10.4',
  },
  {
    usMen: '9.5',
    sizeLabel: 'US 9.5',
    usWomen: '11.0',
    uk: '8.5',
    eu: '43',
    cm: '27.5',
    inches: '10.8',
  },
  {
    usMen: '10.0',
    sizeLabel: 'US 10',
    usWomen: '11.5',
    uk: '9.0',
    eu: '44',
    cm: '28.0',
    inches: '11.0',
  },
  {
    usMen: '10.5',
    sizeLabel: 'US 10.5',
    usWomen: '12.0',
    uk: '9.5',
    eu: '44.5',
    cm: '28.5',
    inches: '11.2',
  },
];

interface SizeGuideModalProps {
  isOpen: boolean;
  currentSize: string;
  onApplySize: (sizeLabel: string) => void;
  onClose: () => void;
}

export default function SizeGuideModal({
  isOpen,
  currentSize,
  onApplySize,
  onClose,
}: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'CM' | 'Inches'>('CM');
  const [pickedSize, setPickedSize] = useState<string>(currentSize);

  useEffect(() => {
    if (isOpen) {
      const matchingRow = SIZE_ROWS.find((row) => row.sizeLabel === currentSize);
      setPickedSize(matchingRow ? matchingRow.sizeLabel : 'US 9.5');
    }
  }, [isOpen, currentSize]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplySize(pickedSize);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[500px] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="size-guide-title"
              className="font-editorial text-lg font-semibold text-neutral-900"
            >
              Footwear Size &amp; Fit Guide
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">
              Find your exact measurement across US, UK, and EU sizing
              standards.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="mt-5 inline-flex rounded-md bg-neutral-100 p-1">
          <button
            type="button"
            onClick={() => setUnit('CM')}
            className={`rounded px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              unit === 'CM'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            CM
          </button>
          <button
            type="button"
            onClick={() => setUnit('Inches')}
            className={`rounded px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              unit === 'Inches'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Inches
          </button>
        </div>

        {/* Size Table */}
        <div className="mt-5 overflow-hidden rounded-lg bg-[#F7F7F7]">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200/70 text-[10px] font-bold tracking-[0.08em] text-neutral-600 uppercase">
                <th className="px-4 py-3">US MEN</th>
                <th className="px-3 py-3">US WOMEN</th>
                <th className="px-3 py-3">UK</th>
                <th className="px-3 py-3">EU</th>
                <th className="px-4 py-3">{unit === 'CM' ? 'CM' : 'IN'}</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_ROWS.map((row) => {
                const isSelected = pickedSize === row.sizeLabel;
                return (
                  <tr
                    key={row.usMen}
                    onClick={() => setPickedSize(row.sizeLabel)}
                    className={`cursor-pointer border-b border-neutral-200/40 transition-colors last:border-b-0 ${
                      isSelected
                        ? 'bg-[#FCE8E5] font-semibold text-neutral-900'
                        : 'text-neutral-700 hover:bg-neutral-200/50'
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5">
                        {row.usMen}
                        {isSelected && (
                          <CheckCircle2
                            className="h-3.5 w-3.5 text-[#E54837]"
                            strokeWidth={2}
                          />
                        )}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">{row.usWomen}</td>
                    <td className="px-3 py-2.5">{row.uk}</td>
                    <td className="px-3 py-2.5">{row.eu}</td>
                    <td className="px-4 py-2.5">
                      {unit === 'CM' ? row.cm : `${row.inches}"`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3-Step Measurement Guide */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-[#F7F7F7] p-3.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-bold text-white">
              1
            </span>
            <h3 className="mt-2.5 font-editorial text-xs font-semibold text-neutral-900">
              Stand on Paper
            </h3>
            <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">
              Tape a piece of paper to a hard floor and stand flat.
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F7F7] p-3.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-bold text-white">
              2
            </span>
            <h3 className="mt-2.5 font-editorial text-xs font-semibold text-neutral-900">
              Mark Bounds
            </h3>
            <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">
              Mark the tip of your longest toe and back of your heel.
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F7F7] p-3.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-[11px] font-bold text-white">
              3
            </span>
            <h3 className="mt-2.5 font-editorial text-xs font-semibold text-neutral-900">
              Measure Distance
            </h3>
            <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">
              Measure the total length in{' '}
              {unit === 'CM' ? 'centimeters' : 'inches'} with a ruler.
            </p>
          </div>
        </div>

        {/* Apply CTA */}
        <button
          type="button"
          onClick={handleApply}
          className="mt-5 w-full rounded-md bg-neutral-900 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          Apply Size &amp; Close
        </button>
      </div>
    </div>
  );
}
