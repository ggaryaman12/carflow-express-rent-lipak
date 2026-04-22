import type { Car } from "@/lib/cars";
import { VehicleCard } from "./VehicleCard";

type Props = {
  cars: Car[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function VehicleGrid({ cars, selectedId, onSelect }: Props) {
  if (cars.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">
        <div className="text-base font-semibold text-ink">No cars match your filters</div>
        <p className="mt-2 text-sm text-ink-soft">Try clearing a filter or two.</p>
      </div>
    );
  }
  return (
    <div>
      {/* Mobile: horizontal scroll */}
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:hidden no-scrollbar snap-x snap-mandatory">
        {cars.map((car) => (
          <div key={car.id} className="snap-start">
            <VehicleCard car={car} selected={selectedId === car.id} onSelect={onSelect} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <VehicleCard key={car.id} car={car} selected={selectedId === car.id} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
