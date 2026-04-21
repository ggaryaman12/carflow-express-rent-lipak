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
    <div className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border md:p-8">
      <div className="mb-5">
        <h3 className="text-2xl font-bold tracking-tight text-ink">Your details</h3>
        <p className="mt-1 text-sm text-ink-soft">We&apos;ll send the booking confirmation on WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field icon={<User className="h-4 w-4" />} label="Full name">
          <input
            value={name}
            onChange={(e) => onName(e.target.value)}
            placeholder="Rahul Sharma"
            className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted-foreground"
          />
        </Field>

        <Field icon={<Phone className="h-4 w-4" />} label="Phone number">
          <input
            value={phone}
            onChange={(e) => onPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
            type="tel"
            inputMode="numeric"
            placeholder="98XXX XXXXX"
            className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted-foreground"
          />
        </Field>

        <div className="md:col-span-2">
          <Field icon={<MapPin className="h-4 w-4" />} label="Pickup location">
            <input
              value={location}
              onChange={(e) => onLocation(e.target.value)}
              placeholder="Sector 17, Chandigarh"
              className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted-foreground"
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
    <label className="group block rounded-2xl bg-muted/60 px-4 py-3 transition focus-within:bg-accent focus-within:ring-2 focus-within:ring-primary/30">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
