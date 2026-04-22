import { useEffect } from "react";
import {
  X, Users, Fuel, Settings2, Star, ShieldCheck, Sparkles,
  Snowflake, Wind, Camera, Briefcase, MapPin, CalendarClock, ArrowRight,
  CheckCircle2, XCircle, Crown,
} from "lucide-react";
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

const FEATURES = [
  { icon: Snowflake, label: "Air Conditioning" },
  { icon: ShieldCheck, label: "Anti-lock Braking" },
  { icon: Camera, label: "Reverse Camera" },
  { icon: Wind, label: "Power Windows" },
  { icon: Sparkles, label: "Power Steering" },
  { icon: Briefcase, label: "Spacious Boot" },
];

const REVIEWS = [
  {
    name: "Mir Mustafa Hussain",
    trips: 6,
    rating: 5,
    months: "Booked for 5 hrs · Apr 2026",
    body: "The host was very friendly and pickup/drop was extremely convenient. Car was spotless and drove like a dream.",
  },
  {
    name: "Amit S Sorathia",
    trips: 4,
    rating: 5,
    months: "Booked for 8 hrs · Apr 2026",
    body: "Amazing host — very few such helpful and understanding people. All my future Tricity trips will be with SUPER.",
  },
];

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

  // Lock body scroll
  useEffect(() => {
    if (!car) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [car]);

  // Close on escape
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
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in fade-in duration-200">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-background/90 px-4 py-3 backdrop-blur-xl md:px-8">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-white/[0.08]"
        >
          <X className="h-4 w-4" />
          Close
        </button>
        <div className="hidden text-sm font-semibold text-ink md:block">{car.name}</div>
        <div className="text-sm text-ink-soft">
          <span className="font-bold text-ink">₹{car.pricePerHour}</span>/hr
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-32 md:pb-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-5">
          {/* LEFT — Gallery + info */}
          <div className="lg:col-span-3">
            {/* Hero image */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-surface-elevated">
              <div className="aspect-[5/3] w-full">
                <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
              </div>
              {car.badge && (
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black backdrop-blur">
                  {car.badge}
                </div>
              )}
            </div>

            {/* Title block */}
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  {car.category}
                </div>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  {car.name}
                </h1>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-sm font-semibold text-ink ring-1 ring-white/10">
                <Star className="h-3.5 w-3.5 fill-white text-white" />
                4.9
                <span className="text-xs font-normal text-ink-soft">· 240+</span>
              </div>
            </div>

            {/* Spec strip */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <Spec icon={<Users className="h-4 w-4" />} label="Seats" value={`${car.seats}`} />
              <Spec icon={<Settings2 className="h-4 w-4" />} label="Gear" value={car.transmission} />
              <Spec icon={<Fuel className="h-4 w-4" />} label="Fuel" value={car.fuel} />
            </div>

            {/* Features */}
            <Section title="Features">
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-ink"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    {f.label}
                  </span>
                ))}
              </div>
            </Section>

            {/* Ratings */}
            <Section title="Ratings & Reviews">
              <div className="mb-5 flex items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <Crown className="h-5 w-5 text-ink" />
                  <div>
                    <div className="text-2xl font-bold leading-none text-ink">4.9</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                      Guest Favourite
                    </div>
                  </div>
                </div>
                <div className="text-sm text-ink-soft">
                  Based on <span className="font-semibold text-ink">240+ trips</span>
                  <br />
                  <span className="text-xs">98% completed without issues</span>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {REVIEWS.map((r) => (
                  <div key={r.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-ink">
                        {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink">{r.name}</div>
                        <div className="text-[11px] text-ink-soft">{r.trips} trips with SUPER</div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                      ))}
                      <span className="ml-2 text-[11px] text-ink-soft">{r.months}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Inclusions */}
            <Section title="Inclusions / Exclusions">
              <ul className="space-y-2.5 text-sm">
                <Inc ok>Security deposit (if applied) refunded within 2-3 days post trip.</Inc>
                <Inc>Fuel not included. Return car with same fuel level.</Inc>
                <Inc>Toll & FASTag charges not included.</Inc>
                <Inc>Off-road, DUI, over-speeding & restricted zones excluded from protection.</Inc>
              </ul>
            </Section>
          </div>

          {/* RIGHT — sticky booking card */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-elevated to-surface p-6 shadow-card">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-ink">
                      ₹{car.pricePerHour}
                      <span className="ml-1 text-base font-medium text-ink-soft">/hr</span>
                    </div>
                    <div className="mt-1 text-xs text-ink-soft">
                      ₹{car.pricePerDay.toLocaleString("en-IN")} for full 24 hrs
                    </div>
                  </div>
                  <div className="text-right">
                    {hours > 0 && (
                      <>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                          {hours} hr est
                        </div>
                        <div className="text-xl font-bold text-ink">
                          ₹{total.toLocaleString("en-IN")}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="my-5 h-px bg-white/10" />

                <div className="space-y-2">
                  <Trip icon={<MapPin className="h-3.5 w-3.5" />} label="City" value={city} />
                  <Trip icon={<CalendarClock className="h-3.5 w-3.5" />} label="Pickup" value={fmt(pickup)} />
                  <Trip icon={<CalendarClock className="h-3.5 w-3.5" />} label="Drop" value={fmt(drop)} />
                </div>
              </div>

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

              {/* Desktop CTA */}
              <div className="mt-4 hidden md:block">
                <WhatsAppButton
                  full
                  onClick={props.onBook}
                  loading={props.submitting}
                  disabled={!props.canBook}
                />
                {!props.canBook && (
                  <p className="mt-3 text-center text-xs text-ink-soft">
                    Enter your name &amp; 10-digit phone to continue.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {car.name}
            </span>
            <span className="text-base font-bold text-ink">
              ₹{car.pricePerHour}<span className="ml-1 text-xs font-medium text-muted-foreground">/hr</span>
            </span>
          </div>
          <WhatsAppButton onClick={props.onBook} loading={props.submitting} disabled={!props.canBook} label="Book on WhatsApp" />
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] px-3 py-3 text-center">
      <div className="mb-1 flex justify-center text-ink-soft">{icon}</div>
      <div className="text-sm font-semibold text-ink">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-soft">{label}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-white/[0.06] pt-7">
      <h2 className="mb-4 text-lg font-bold tracking-tight text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Inc({ ok = false, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-ink-soft">
      {ok
        ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
        : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/80" />}
      <span>{children}</span>
    </li>
  );
}

function Trip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]">
      <div className="inline-flex items-center gap-2 text-xs text-ink-soft">
        <span className="text-ink">{icon}</span>
        {label}
      </div>
      <div className="truncate text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}
