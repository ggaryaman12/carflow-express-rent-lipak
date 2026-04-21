import { CARS } from "@/lib/cars";
import { VehicleCard } from "./VehicleCard";

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function VehicleGrid({ selectedId, onSelect }: Props) {
  return (
    <div>
      {/* Mobile: horizontal scroll */}
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:hidden no-scrollbar snap-x snap-mandatory">
        {CARS.map((car) => (
          <div key={car.id} className="snap-start">
            <VehicleCard car={car} selected={selectedId === car.id} onSelect={onSelect} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARS.map((car) => (
          <VehicleCard key={car.id} car={car} selected={selectedId === car.id} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
