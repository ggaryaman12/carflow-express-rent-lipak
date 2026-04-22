import type { Car } from "./cars";
import type { FilterState } from "@/components/FilterBar";

const POPULAR_ORDER = [
  "swift", "creta", "thar", "scorpio", "fortuner", "brezza", "seltos",
  "ertiga", "nexon", "baleno", "i20", "dzire", "carens", "jimny",
  "ignis", "xuv", "i10", "tiago", "alto",
];

export function applyFilters(cars: Car[], f: FilterState): Car[] {
  let out = cars.filter((c) => {
    if (f.fuel !== "all" && c.fuel !== f.fuel) return false;
    if (f.transmission !== "all" && c.transmission !== f.transmission) return false;
    if (f.seats === "4-5" && (c.seats < 4 || c.seats > 5)) return false;
    if (f.seats === "6-7" && (c.seats < 6 || c.seats > 7)) return false;
    return true;
  });

  if (f.sort === "price-asc") {
    out = [...out].sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (f.sort === "price-desc") {
    out = [...out].sort((a, b) => b.pricePerHour - a.pricePerHour);
  } else {
    const idx = (id: string) => {
      const i = POPULAR_ORDER.indexOf(id);
      return i === -1 ? 999 : i;
    };
    out = [...out].sort((a, b) => idx(a.id) - idx(b.id));
  }
  return out;
}
