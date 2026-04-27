import { User, Phone, MapPin } from "lucide-react";

type Props = {
  name: string;
  phone: string;
  location: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onLocation: (v: string) => void;
};

export function CustomerForm({ name, phone, location, onName, onPhone, onLocation }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-6 shadow-soft md:p-8">

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field icon={<User className="h-4 w-4" />} label="Full name">
          <input
            value={name}
            onChange={(e) => onName(e.target.value)}
            placeholder="Rahul Sharma"
            className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink-soft/50"
          />
        </Field>

        <Field icon={<Phone className="h-4 w-4" />} label="Phone number">
          <input
            value={phone}
            onChange={(e) => onPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
            type="tel"
            inputMode="numeric"
            placeholder="98XXX XXXXX"
            className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink-soft/50"
          />
        </Field>

        <div className="md:col-span-2">
          <Field icon={<MapPin className="h-4 w-4" />} label="Pickup location">
            <input
              value={location}
              onChange={(e) => onLocation(e.target.value)}
              placeholder="Sector 17, Chandigarh"
              className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink-soft/50"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.06] transition focus-within:bg-white/[0.07] focus-within:ring-white/30">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
        <span className="text-ink">{icon}</span>
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
