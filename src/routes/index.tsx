import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, Sparkles, Star } from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import { CARS, CITIES, type City } from "@/lib/cars";
import { submitBookingLead } from "@/lib/booking.functions";
import { HeroSearch } from "@/components/HeroSearch";
import { VehicleGrid } from "@/components/VehicleGrid";
import { CustomerForm } from "@/components/CustomerForm";
import { BookingSummary } from "@/components/BookingSummary";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SuperLogo } from "@/components/SuperLogo";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const WHATSAPP_NUMBER = "919780111802";

function LandingPage() {
  const [city, setCity] = useState<City>(CITIES[0]);
  const [pickup, setPickup] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [showCars, setShowCars] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const carsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

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
    setShowCars(true);
    setTimeout(() => {
      carsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleSelectCar(id: string) {
    // Toggle: clicking the selected car unselects it
    setSelectedCarId((prev) => (prev === id ? null : id));
    if (selectedCarId !== id) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }

  const canBook =
    !!selectedCar && name.trim().length > 1 && /^\d{10}$/.test(phone);

  async function handleBook() {
    if (!canBook || !selectedCar) return;
    setSubmitting(true);
    try {
      await submitBookingLead({
        data: {
          name,
          phone,
          city,
          vehicle: selectedCar.name,
          pickup,
          drop,
          location,
        },
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

  // Lock body scroll padding for sticky bar on mobile
  useEffect(() => {
    document.body.style.paddingBottom = selectedCar ? "96px" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [selectedCar]);

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0" />
        <img
          src={heroCar}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
          {/* Nav — minimal, brand-only */}
          <nav className="flex items-center justify-between gap-4 text-white">
            <SuperLogo />
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black md:text-[11px]"
            >
              +91 97801 11802
            </a>
          </nav>

          {/* Headline */}
          <div className="mt-16 max-w-3xl md:mt-24">
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white text-balance md:text-7xl lg:text-[5.5rem]">
              Drive.<br />
              Anytime.<br />
              <span className="gradient-text">Anywhere.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/65 md:text-lg">
              Premium self-drive cars in Chandigarh, Mohali and Panchkula.
              No commitment, unlimited options, hassle-free booking.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-10 md:mt-14">
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

          {/* Generic premium strip */}
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
      </section>

      {/* VEHICLES */}
      <section
        ref={carsRef}
        className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
      >
        <div className="mb-8 flex items-end justify-between md:mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {showCars ? "Available now" : "Our fleet"}
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {showCars ? `Cars in ${city}` : "Pick your perfect ride"}
            </h2>
          </div>
          <div className="hidden text-sm text-ink-soft md:block">
            {CARS.length} vehicles available
          </div>
        </div>

        <VehicleGrid selectedId={selectedCarId} onSelect={handleSelectCar} />
      </section>

      {/* DETAILS + SUMMARY — only after a car is selected */}
      {selectedCar && (
        <section
          ref={detailsRef}
          className="mx-auto max-w-7xl px-4 pb-32 md:px-8 md:pb-32"
        >
          <div className="mb-8 md:mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Almost there
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Confirm your booking
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
              <CustomerForm
                name={name}
                phone={phone}
                location={location}
                onName={setName}
                onPhone={setPhone}
                onLocation={setLocation}
              />

              {/* Desktop CTA */}
              <div className="mt-6 hidden md:block">
                <WhatsAppButton
                  full
                  onClick={handleBook}
                  loading={submitting}
                  disabled={!canBook}
                />
                {!canBook && (
                  <p className="mt-3 text-center text-sm text-ink-soft">
                    Enter your name &amp; 10-digit phone to continue.
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <BookingSummary
                city={city}
                vehicle={selectedCar}
                pickup={pickup}
                drop={drop}
              />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-10 text-sm text-ink-soft md:flex-row md:px-8">
          <SuperLogo />
          <div>© {new Date().getFullYear()} SUPER Mobility · Chandigarh · Mohali · Panchkula</div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      {selectedCar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 shadow-[0_-8px_24px_-8px_oklch(0_0_0/0.15)] backdrop-blur-xl md:hidden">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {selectedCar.name}
              </span>
              <span className="text-base font-bold text-ink">
                ₹{selectedCar.pricePerHour}
                <span className="ml-1 text-xs font-medium text-muted-foreground">/hr</span>
              </span>
            </div>
            <WhatsAppButton
              onClick={handleBook}
              loading={submitting}
              disabled={!canBook}
              label="WhatsApp"
            />
          </div>
        </div>
      )}
    </main>
  );
}
