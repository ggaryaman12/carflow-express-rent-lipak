import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { CITIES, type City } from "@/lib/cars";
import { DateTimeField } from "./DateTimeField";

type Props = {
  city: City;
  pickup: string;
  drop: string;
  onCity: (v: City) => void;
  onPickup: (v: string) => void;
  onDrop: (v: string) => void;
  onSearch: () => void;
};

export function HeroSearch({ city, pickup, drop, onCity, onPickup, onDrop, onSearch }: Props) {
  return (
    <div className="relative">
      {/* Glow halo */}
      <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-60 blur-2xl" />

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-card backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
            <Sparkles className="h-3.5 w-3.5" />
            Book in 30s
          </div>
          <div className="text-[11px] font-medium text-ink-soft">No card · Pay later</div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* City */}
          <label className="group flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3.5 ring-1 ring-white/[0.06] transition hover:bg-white/[0.07]">
            <MapPin className="h-5 w-5 text-ink-soft" />
            <div className="flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                City
              </div>
              <select
                value={city}
                onChange={(e) => onCity(e.target.value as City)}
                className="-mx-1 mt-0.5 w-[calc(100%+0.5rem)] cursor-pointer appearance-none bg-transparent px-1 text-base font-semibold text-ink outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-background">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <DateTimeField label="Pickup" value={pickup} onChange={onPickup} />
          <DateTimeField label="Drop" value={drop} onChange={onDrop} />

          {/* CTA */}
          <button
            type="button"
            onClick={onSearch}
            className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-7 py-4 text-base font-semibold tracking-tight text-primary-foreground transition active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Search Available Cars
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mini reassurance row */}
        <div className="mt-3 flex items-center justify-between gap-3 px-3 pb-1 pt-2 text-[11px] text-ink-soft">
          <span>✓ Free cancellation</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>✓ Doorstep delivery</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>✓ 24×7 support</span>
        </div>
      </div>
    </div>
  );
}
