import { useEffect } from "react";
import { X, Star, MapPin, CalendarClock } from "lucide-react";
import type { Car } from "@/lib/cars";
import { CustomerForm } from "./CustomerForm";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = {
  car: Car | null;
  city: string;
  pickup: string;
  drop: string;
  name: string;
  phone: string;
  location: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onLocation: (v: string) => void;
  onClose: () => void;
  onBook: () => void;
  submitting: boolean;
  canBook: boolean;
};

function fmt(v: string) {
  if (!v) return "—";
  try {
    return new Date(v).toLocaleString("en-IN", {
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });
  } catch { return v; }
}

function hoursBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.max(0, Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 3.6e6));
}

export function CarDetailSheet(props: Props) {
  const { car, city, pickup, drop, onClose } = props;

  useEffect(() => {
    if (!car) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [car]);

  useEffect(() => {
    if (!car) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [car, onClose]);

  if (!car) return null;

  const hours = hoursBetween(pickup, drop);
  const total = car.pricePerHour * Math.max(hours, 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden bg-background shadow-2xl ring-1 ring-white/10 sm:max-h-[92vh] sm:rounded-3xl animate-in zoom-in-95 duration-200"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Image header */}
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-surface to-surface-elevated sm:aspect-[2/1]">
              <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
            {car.badge && (
              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black backdrop-blur">
                {car.badge}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-5 pb-5 sm:px-7 sm:pb-7">
            {/* Title row */}
            <div className="-mt-6 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  {car.category}{car.model ? ` · ${car.model}` : ""}
                </div>
                <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {car.name}
                </h1>
              </div>
              <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.08] px-2.5 py-1 text-xs font-semibold text-ink ring-1 ring-white/10">
                <Star className="h-3 w-3 fill-white text-white" />
                4.9
              </div>
            </div>

            {/* Trip summary */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <Trip icon={<MapPin className="h-3 w-3" />} label="City" value={city} />
              <Trip icon={<CalendarClock className="h-3 w-3" />} label="Pickup" value={fmt(pickup)} />
              <Trip icon={<CalendarClock className="h-3 w-3" />} label="Drop" value={fmt(drop)} />
            </div>

            {/* Price + hours */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-br from-surface-elevated to-surface px-4 py-3 ring-1 ring-white/10">
              <div>
                <div className="text-2xl font-bold tracking-tight text-ink">
                  ₹{car.pricePerHour}
                  <span className="ml-1 text-sm font-medium text-ink-soft">/hr</span>
                </div>
                <div className="text-[11px] text-ink-soft">
                  ₹{car.pricePerDay.toLocaleString("en-IN")} / 24 hrs
                </div>
              </div>
              {hours > 0 && (
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                    {hours} hr est
                  </div>
                  <div className="text-xl font-bold text-ink">
                    ₹{total.toLocaleString("en-IN")}
                  </div>
                </div>
              )}
            </div>

            {/* Customer form */}
            <div className="mt-4">
              <CustomerForm
                name={props.name}
                phone={props.phone}
                location={props.location}
                onName={props.onName}
                onPhone={props.onPhone}
                onLocation={props.onLocation}
              />
            </div>
          </div>
        </div>

        {/* Sticky CTA footer */}
        <div className="border-t border-white/10 bg-surface/95 p-3 backdrop-blur-xl sm:p-4">
          <WhatsAppButton
            full
            onClick={props.onBook}
            loading={props.submitting}
            disabled={!props.canBook}
            label="Select & Book on WhatsApp"
          />
          {!props.canBook && (
            <p className="mt-2 text-center text-[11px] text-ink-soft">
              Enter your name &amp; 10-digit phone to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Trip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-ink-soft">
        <span className="text-ink">{icon}</span>
        {label}
      </div>
      <div className="mt-0.5 truncate text-xs font-semibold text-ink">{value}</div>
    </div>
  );
}
