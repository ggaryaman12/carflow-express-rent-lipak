import { MapPin, Calendar, Search } from "lucide-react";
import { CITIES, type City } from "@/lib/cars";

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
    <div className="rounded-3xl bg-surface/95 p-3 shadow-card backdrop-blur-xl ring-1 ring-white/10 md:p-3">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.1fr_1.3fr_1.3fr_auto] md:items-stretch">
        {/* City */}
        <label className="group flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3 transition hover:bg-muted md:py-4">
          <MapPin className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">City</div>
            <select
              value={city}
              onChange={(e) => onCity(e.target.value as City)}
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </label>

        {/* Pickup */}
        <label className="group flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3 transition hover:bg-muted md:py-4">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Pickup</div>
            <input
              type="datetime-local"
              value={pickup}
              onChange={(e) => onPickup(e.target.value)}
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
            />
          </div>
        </label>

        {/* Drop */}
        <label className="group flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3 transition hover:bg-muted md:py-4">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Drop</div>
            <input
              type="datetime-local"
              value={drop}
              onChange={(e) => onDrop(e.target.value)}
              className="w-full bg-transparent text-base font-semibold text-ink outline-none"
            />
          </div>
        </label>

        {/* CTA */}
        <button
          type="button"
          onClick={onSearch}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-glow transition active:scale-[0.98] md:px-7"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <Search className="h-5 w-5" />
          Find Cars
        </button>
      </div>
    </div>
  );
}
