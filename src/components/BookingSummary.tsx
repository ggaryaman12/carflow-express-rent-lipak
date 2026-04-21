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
    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-[oklch(0.22_0.04_280)] p-6 text-white shadow-card md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Booking summary</h3>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
          Live
        </span>
      </div>

      <div className="space-y-4">
        <Row icon={<MapPin className="h-4 w-4" />} label="City" value={city} />
        <Row
          icon={<Car className="h-4 w-4" />}
          label="Vehicle"
          value={vehicle ? vehicle.name : "Not selected yet"}
          muted={!vehicle}
        />
        <div className="flex items-stretch gap-3">
          <div className="flex-1 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-white/60">
              <CalendarClock className="h-4 w-4" /> Pickup
            </div>
            <div className="mt-1 text-base font-semibold">{fmt(pickup)}</div>
          </div>
          <div className="flex items-center justify-center text-white/40">
            <ArrowRight className="h-5 w-5" />
          </div>
          <div className="flex-1 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-white/60">
              <CalendarClock className="h-4 w-4" /> Drop
            </div>
            <div className="mt-1 text-base font-semibold">{fmt(drop)}</div>
          </div>
        </div>
      </div>

      {vehicle && hours > 0 && (
        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60">
              Estimated total · {hours} hr{hours > 1 ? "s" : ""}
            </div>
            <div className="mt-1 text-3xl font-bold tracking-tight">₹{total.toLocaleString("en-IN")}</div>
          </div>
          <div className="text-right text-xs text-white/60">
            Final fare confirmed<br />on WhatsApp
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
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
      <div className="flex items-center gap-2 text-sm text-white/70">
        <span className="text-[oklch(0.78_0.18_305)]">{icon}</span>
        {label}
      </div>
      <div className={`text-base font-semibold ${muted ? "text-white/40" : "text-white"}`}>{value}</div>
    </div>
  );
}
