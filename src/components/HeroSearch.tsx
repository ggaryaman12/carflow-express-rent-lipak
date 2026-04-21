import { MapPin, ArrowRight } from "lucide-react";
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
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-2 shadow-card backdrop-blur-2xl md:p-2.5">
      <div className="grid grid-cols-1 gap-1.5 md:grid-cols-[1.1fr_1.3fr_1.3fr_auto] md:items-stretch">
        {/* City */}
        <label className="group flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.06] transition hover:bg-white/[0.07] md:py-4">
          <MapPin className="h-5 w-5 text-ink-soft" />
          <div className="flex-1">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
              City
            </div>
            <select
              value={city}
              onChange={(e) => onCity(e.target.value as City)}
              className="-mx-1 w-[calc(100%+0.5rem)] cursor-pointer appearance-none bg-transparent px-1 text-base font-semibold text-ink outline-none"
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
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-7 py-4 text-base font-semibold tracking-tight text-primary-foreground transition active:scale-[0.98]"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          Find Cars
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
