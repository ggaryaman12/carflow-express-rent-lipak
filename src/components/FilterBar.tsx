import { Fuel, Users, Settings2, ArrowDownUp, X } from "lucide-react";

export type FilterState = {
  fuel: "all" | "Petrol" | "Diesel";
  seats: "all" | "4-5" | "6-7";
  transmission: "all" | "Manual" | "Automatic";
  sort: "popular" | "price-asc" | "price-desc";
};

type Props = {
  value: FilterState;
  onChange: (v: FilterState) => void;
  resultCount: number;
  totalCount: number;
};

const FUEL_OPTS = [
  { v: "all", l: "All Fuel" },
  { v: "Petrol", l: "Petrol" },
  { v: "Diesel", l: "Diesel" },
] as const;

const SEAT_OPTS = [
  { v: "all", l: "Any seats" },
  { v: "4-5", l: "4–5 seater" },
  { v: "6-7", l: "6–7 seater" },
] as const;

const TRANS_OPTS = [
  { v: "all", l: "Any gear" },
  { v: "Manual", l: "Manual" },
  { v: "Automatic", l: "Automatic" },
] as const;

const SORT_OPTS = [
  { v: "popular", l: "Popular" },
  { v: "price-asc", l: "Price ↑" },
  { v: "price-desc", l: "Price ↓" },
] as const;

export function FilterBar({ value, onChange, resultCount, totalCount }: Props) {
  const isFiltered =
    value.fuel !== "all" ||
    value.seats !== "all" ||
    value.transmission !== "all" ||
    value.sort !== "popular";

  function reset() {
    onChange({ fuel: "all", seats: "all", transmission: "all", sort: "popular" });
  }

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.08] bg-background/85 px-4 py-3 backdrop-blur-xl md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto no-scrollbar">
        <div className="flex shrink-0 items-baseline gap-2">
          <span className="text-sm font-bold text-ink">{resultCount}</span>
          <span className="text-xs text-ink-soft">of {totalCount} cars</span>
        </div>

        <div className="h-5 w-px shrink-0 bg-white/10" />

        <Group icon={<Fuel className="h-3.5 w-3.5" />} options={FUEL_OPTS} active={value.fuel} onPick={(v) => onChange({ ...value, fuel: v as FilterState["fuel"] })} />
        <Group icon={<Users className="h-3.5 w-3.5" />} options={SEAT_OPTS} active={value.seats} onPick={(v) => onChange({ ...value, seats: v as FilterState["seats"] })} />
        <Group icon={<Settings2 className="h-3.5 w-3.5" />} options={TRANS_OPTS} active={value.transmission} onPick={(v) => onChange({ ...value, transmission: v as FilterState["transmission"] })} />

        <div className="h-5 w-px shrink-0 bg-white/10" />

        <Group icon={<ArrowDownUp className="h-3.5 w-3.5" />} options={SORT_OPTS} active={value.sort} onPick={(v) => onChange({ ...value, sort: v as FilterState["sort"] })} />

        {isFiltered && (
          <button
            onClick={reset}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:bg-white/[0.08] hover:text-ink"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

function Group({
  icon,
  options,
  active,
  onPick,
}: {
  icon: React.ReactNode;
  options: readonly { v: string; l: string }[];
  active: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
      <span className="pl-2.5 pr-1 text-ink-soft">{icon}</span>
      {options.map((o) => {
        const isActive = o.v === active;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => onPick(o.v)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-tight transition ${
              isActive
                ? "bg-white text-black shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {o.l}
          </button>
        );
      })}
    </div>
  );
}
