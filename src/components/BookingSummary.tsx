import { MapPin, Car, CalendarClock, ArrowRight } from "lucide-react";
import type { Car as CarType } from "@/lib/cars";

type Props = {
  city: string;
  vehicle: CarType | null;
  pickup: string;
  drop: string;
};

function fmt(v: string) {
  if (!v) return "—";
  try {
    const d = new Date(v);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return v;
  }
}

function hoursBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60)));
}

export function BookingSummary({ city, vehicle, pickup, drop }: Props) {
  const hours = hoursBetween(pickup, drop);
  const total = vehicle ? vehicle.pricePerHour * Math.max(hours, 1) : 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-elevated via-surface to-background p-6 text-ink shadow-card md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Booking summary</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-white" /> Live
        </span>
      </div>

      <div className="space-y-3">
        <Row icon={<MapPin className="h-4 w-4" />} label="City" value={city} />
        <Row icon={<Car className="h-4 w-4" />} label="Vehicle" value={vehicle!.name} />
        <div className="flex items-stretch gap-2">
          <div className="flex-1 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              <CalendarClock className="h-3.5 w-3.5" /> Pickup
            </div>
            <div className="mt-1 text-sm font-semibold text-ink">{fmt(pickup)}</div>
          </div>
          <div className="flex items-center justify-center text-ink-soft">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="flex-1 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              <CalendarClock className="h-3.5 w-3.5" /> Drop
            </div>
            <div className="mt-1 text-sm font-semibold text-ink">{fmt(drop)}</div>
          </div>
        </div>
      </div>

      {vehicle && hours > 0 && (
        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Estimated · {hours} hr{hours > 1 ? "s" : ""}
            </div>
            <div className="mt-1 text-3xl font-bold tracking-tight text-ink">
              ₹{total.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="text-right text-[11px] text-ink-soft">
            Final fare confirmed
            <br />
            on WhatsApp
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.06]">
      <div className="flex items-center gap-2 text-sm text-ink-soft">
        <span className="text-ink">{icon}</span>
        {label}
      </div>
      <div className="text-base font-semibold text-ink">{value}</div>
    </div>
  );
}
