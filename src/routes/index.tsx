import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Sparkles, Star } from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import { CARS, CITIES, type City } from "@/lib/cars";
import { submitBookingLead } from "@/lib/booking.functions";
import { applyFilters } from "@/lib/filters";
import { HeroSearch } from "@/components/HeroSearch";
import { VehicleGrid } from "@/components/VehicleGrid";
import { FilterBar, type FilterState } from "@/components/FilterBar";
import { CarDetailSheet } from "@/components/CarDetailSheet";
import { SuperLogo } from "@/components/SuperLogo";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const WHATSAPP_NUMBER = "919780111802";

function LandingPage() {
  const [city, setCity] = useState<City>(CITIES[0]);
  const [pickup, setPickup] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    fuel: "all",
    seats: "all",
    transmission: "all",
    sort: "popular",
  });

  const filteredCars = useMemo(() => applyFilters(CARS, filters), [filters]);
  const selectedCar = useMemo(
    () => CARS.find((c) => c.id === selectedCarId) ?? null,
    [selectedCarId],
  );

  // Set defaults on client only — avoids SSR hydration mismatch
  useEffect(() => {
    const p = new Date();
    p.setHours(p.getHours() + 2, 0, 0, 0);
    const d = new Date(p);
    d.setDate(d.getDate() + 1);
    const toLocal = (x: Date) => {
      const tz = x.getTimezoneOffset() * 60000;
      return new Date(x.getTime() - tz).toISOString().slice(0, 16);
    };
    setPickup(toLocal(p));
    setDrop(toLocal(d));
  }, []);

  function handleSearch() {
    const grid = document.getElementById("vehicles");
    grid?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSelectCar(id: string) {
    setSelectedCarId(id);
  }

  const canBook =
    !!selectedCar && name.trim().length > 1 && /^\d{10}$/.test(phone);

  async function handleBook() {
    if (!canBook || !selectedCar) return;
    setSubmitting(true);
    try {
      await submitBookingLead({
        data: { name, phone, city, vehicle: selectedCar.name, pickup, drop, location },
      }).catch(() => null);

      const message =
        `Hello, I want to book a self-drive car.\n\n` +
        `City: ${city}\n` +
        `Vehicle: ${selectedCar.name}\n` +
        `Pickup: ${pickup}\n` +
        `Drop: ${drop}\n` +
        `Pickup Location: ${location || "—"}\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0" />
        <div className="grid-overlay absolute inset-0" />
        <img
          src={heroCar}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:pb-28 md:pt-8">
          {/* Nav */}
          <nav className="flex items-center justify-between gap-4 text-white">
            <SuperLogo />
          </nav>

          {/* Two-column hero: headline left, search right */}
          <div className="mt-16 grid grid-cols-1 items-start gap-10 md:mt-20 md:grid-cols-[1.1fr_1fr] md:gap-10 lg:gap-16">
            {/* Left: headline */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
                <span className="h-px w-8 bg-white/30" />
                Self-drive · Tricity
              </div>
              <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.03em] text-white text-balance md:text-6xl lg:text-[5.5rem]">
                Drive.<br />
                Anytime.<br />
                <span className="gradient-text">Anywhere.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base text-white/60 md:text-[17px] md:leading-relaxed">
                A handpicked fleet of self-drive cars across Chandigarh, Mohali &amp; Panchkula —
                booked in under a minute, delivered to your door.
              </p>

              {/* Trust strip */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55 md:mt-10">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-white/80" />
                  Fully insured fleet
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 fill-white text-white" />
                  Sanitised &amp; serviced
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-white/80" />
                  24×7 roadside support
                </span>
              </div>
            </div>

            {/* Right: search panel */}
            <div className="lg:pt-2">
              <HeroSearch
                city={city}
                pickup={pickup}
                drop={drop}
                onCity={setCity}
                onPickup={setPickup}
                onDrop={setDrop}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLES */}
      <section
        id="vehicles"
        className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 md:px-8 md:pt-16 md:pb-24"
      >
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Available now
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Cars in {city}
            </h2>
          </div>
        </div>

        {/* Sticky filter bar */}
        <FilterBar
          value={filters}
          onChange={setFilters}
          resultCount={filteredCars.length}
          totalCount={CARS.length}
        />

        <div className="pt-6">
          <VehicleGrid
            cars={filteredCars}
            selectedId={selectedCarId}
            onSelect={handleSelectCar}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-10 text-sm text-ink-soft md:flex-row md:px-8">
          <SuperLogo />
          <div>© {new Date().getFullYear()} SUPER Mobility · Chandigarh · Mohali · Panchkula</div>
        </div>
      </footer>

      {/* Detail sheet */}
      <CarDetailSheet
        car={selectedCar}
        city={city}
        pickup={pickup}
        drop={drop}
        name={name}
        phone={phone}
        location={location}
        onName={setName}
        onPhone={setPhone}
        onLocation={setLocation}
        onClose={() => setSelectedCarId(null)}
        onBook={handleBook}
        submitting={submitting}
        canBook={canBook}
      />
    </main>
  );
}
