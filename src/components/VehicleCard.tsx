import { Users, Fuel, Settings2, Check, Star } from "lucide-react";
import type { Car } from "@/lib/cars";

type Props = {
  car: Car;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function VehicleCard({ car, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(car.id)}
      aria-pressed={selected}
      className={`group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-3xl bg-card text-left transition-all duration-300 hover:-translate-y-1 md:w-auto ${
        selected
          ? "ring-2 ring-white shadow-[0_20px_60px_-15px_oklch(1_0_0/0.25)]"
          : "ring-1 ring-white/[0.06] hover:ring-white/20 shadow-soft hover:shadow-card"
      }`}
    >
      {/* Selected check */}
      {selected && (
        <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
      )}

      {/* Badge */}
      {car.badge && !selected && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black backdrop-blur">
          {car.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-bold tracking-tight text-ink">{car.name}</h3>
            <div className="mt-1 text-xs font-medium text-ink-soft">{car.category}</div>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-1 text-xs font-semibold text-ink ring-1 ring-white/10">
            <Star className="h-3 w-3 fill-white text-white" />
            4.9
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" /> {car.seats}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Settings2 className="h-4 w-4" /> {car.transmission}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel className="h-4 w-4" /> {car.fuel}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-white/[0.06] pt-4">
          <div>
            <div className="text-2xl font-bold tracking-tight text-ink">
              ₹{car.pricePerHour}
              <span className="ml-1 text-sm font-medium text-ink-soft">/hr</span>
            </div>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selected
                ? "bg-white text-black"
                : "bg-white/[0.08] text-ink ring-1 ring-white/10 group-hover:bg-white group-hover:text-black"
            }`}
          >
            {selected ? "Selected" : "Select"}
          </span>
        </div>
      </div>
    </button>
  );
}
