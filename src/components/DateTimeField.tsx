import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  /** value in `YYYY-MM-DDTHH:mm` (datetime-local) format */
  value: string;
  onChange: (v: string) => void;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function parseValue(value: string): { date: Date | undefined; hour: number; minute: number } {
  if (!value) return { date: undefined, hour: 10, minute: 0 };
  const [datePart, timePart] = value.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh = 10, mm = 0] = (timePart ?? "10:00").split(":").map(Number);
  return { date: new Date(y, m - 1, d), hour: hh, minute: mm };
}

function buildValue(date: Date, hour: number, minute: number) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(hour)}:${pad(minute)}`;
}

export function DateTimeField({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const { date, hour, minute } = parseValue(value);

  const display = date
    ? `${format(date, "EEE, dd MMM")} · ${pad(hour)}:${pad(minute)}`
    : "Select date & time";

  function setDate(d: Date | undefined) {
    if (!d) return;
    onChange(buildValue(d, hour, minute));
  }
  function setHour(h: number) {
    if (!date) return;
    onChange(buildValue(date, h, minute));
  }
  function setMinute(mm: number) {
    if (!date) return;
    onChange(buildValue(date, hour, mm));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3 text-left ring-1 ring-white/[0.06] transition hover:bg-white/[0.07] md:py-4"
        >
          <CalendarIcon className="h-5 w-5 text-ink-soft" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
              {label}
            </div>
            <div className="mt-0.5 truncate text-base font-semibold text-ink">{display}</div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto overflow-hidden border border-white/10 bg-popover p-0 shadow-card"
      >
        <div className="flex flex-col md:flex-row">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            className={cn("p-3 pointer-events-auto")}
          />
          <div className="flex border-t border-white/10 md:border-l md:border-t-0">
            <TimeColumn label="Hr" items={HOURS} active={hour} onSelect={setHour} />
            <TimeColumn label="Min" items={MINUTES} active={minute} onSelect={setMinute} />
          </div>
        </div>
        <div className="flex justify-end border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Done
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TimeColumn({
  label,
  items,
  active,
  onSelect,
}: {
  label: string;
  items: number[];
  active: number;
  onSelect: (n: number) => void;
}) {
  return (
    <div className="flex w-16 flex-col">
      <div className="border-b border-white/10 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </div>
      <div className="max-h-56 overflow-y-auto">
        {items.map((n) => {
          const isActive = n === active;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onSelect(n)}
              className={cn(
                "block w-full px-3 py-1.5 text-center text-sm transition",
                isActive
                  ? "bg-primary font-semibold text-primary-foreground"
                  : "text-ink hover:bg-white/10",
              )}
            >
              {pad(n)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
