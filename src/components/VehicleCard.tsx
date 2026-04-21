import { Users, Fuel, Settings2, Check } from "lucide-react";
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
      className={`group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-3xl bg-card text-left shadow-soft ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-card md:w-auto ${
        selected
          ? "ring-2 ring-primary shadow-glow"
          : "ring-border hover:ring-primary/30"
      }`}
    >
      {/* Selected check */}
      {selected && (
        <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
      )}

      {/* Badge */}
      {car.badge && !selected && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
          {car.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-muted to-secondary">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {car.category}
          </div>
          <h3 className="mt-1 text-xl font-bold text-ink">{car.name}</h3>
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

        <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
          <div>
            <div className="text-2xl font-bold tracking-tight text-ink">
              ₹{car.pricePerHour}
              <span className="ml-1 text-sm font-medium text-muted-foreground">/hr</span>
            </div>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-ink group-hover:bg-primary group-hover:text-primary-foreground"
            }`}
          >
            {selected ? "Selected" : "Select"}
          </span>
        </div>
      </div>
    </button>
  );
}
