import swift from "@/assets/car-swift.jpg";
import jimny from "@/assets/car-jimny.jpg";
import ignis from "@/assets/car-ignis.jpg";
import brezza from "@/assets/car-brezza.jpg";
import thar from "@/assets/car-thar.jpg";
import scorpio from "@/assets/car-scorpio.jpg";
import carens from "@/assets/car-carens.jpg";
import creta from "@/assets/car-creta.jpg";
import baleno from "@/assets/car-baleno.jpg";
import seltos from "@/assets/car-seltos.jpg";
import fortuner from "@/assets/car-fortuner.jpg";
import i20 from "@/assets/car-i20.jpg";
import nexon from "@/assets/car-nexon.jpg";
import tiago from "@/assets/car-tiago.jpg";
import i10 from "@/assets/car-i10.jpg";
import dzire from "@/assets/car-dzire.jpg";
import altroz from "@/assets/car-altroz.jpg";
import ertiga from "@/assets/car-ertiga.jpg";
import xuv from "@/assets/car-xuv.jpg";

export type Car = {
  id: string;
  name: string;
  brand: string;
  model: number;
  category: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel";
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  badge?: string;
};

// Helper to infer specs by model name
const cat = (name: string, seats: number): string => {
  const n = name.toLowerCase();
  if (seats >= 7) return "MPV — 7 Seater";
  if (n.includes("thar") || n.includes("jimny")) return "Lifestyle SUV";
  if (n.includes("scorpio") || n.includes("xuv")) return "Premium SUV";
  if (n.includes("fortuner")) return "Luxury SUV";
  if (n.includes("creta") || n.includes("seltos")) return "Mid-size SUV";
  if (n.includes("brezza") || n.includes("nexon") || n.includes("punch") || n.includes("ecosport") || n.includes("xuv")) return "Compact SUV";
  if (n.includes("dzire") || n.includes("ciaz") || n.includes("city") || n.includes("amaze")) return "Sedan";
  if (n.includes("baleno") || n.includes("i20") || n.includes("altroz") || n.includes("polo") || n.includes("glanza")) return "Premium Hatch";
  if (n.includes("ignis")) return "Compact";
  if (n.includes("alto") || n.includes("kwid") || n.includes("eon")) return "Mini Hatchback";
  return "Hatchback";
};

// Full SUPER Rental fleet — 50 vehicles.
export const CARS: Car[] = [
  { id: "ignis-delta-ags", name: "Maruti Ignis Delta AGS", brand: "Maruti Suzuki", model: 2023, category: cat("Ignis", 5), seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 50,  pricePerDay: 1200, image: ignis },
  { id: "jimny-allgrip",   name: "Maruti Jimny Alpha Allgrip", brand: "Maruti Suzuki", model: 2023, category: "Lifestyle SUV", seats: 4, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: jimny, badge: "New" },
  { id: "eon-dlite",       name: "Hyundai Eon D-Lite", brand: "Hyundai", model: 2012, category: "Mini Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 71, pricePerDay: 1700, image: i10 },
  { id: "tiago-xt",        name: "Tata Tiago XT", brand: "Tata Motors", model: 2018, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: tiago },
  { id: "tiago",           name: "Tata Tiago", brand: "Tata Motors", model: 2023, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: tiago },
  { id: "grand-i10",       name: "Hyundai Grand i10", brand: "Hyundai", model: 2015, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: i10 },
  { id: "swift-lxi",       name: "Maruti Swift LXI", brand: "Maruti Suzuki", model: 2024, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: swift, badge: "Popular" },
  { id: "creta-2023",      name: "Hyundai Creta", brand: "Hyundai", model: 2023, category: "Mid-size SUV", seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 96, pricePerDay: 2300, image: creta },
  { id: "baleno-zeta-25",  name: "Maruti Baleno Zeta", brand: "Maruti Suzuki", model: 2025, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: baleno },
  { id: "baleno-zeta-21",  name: "Maruti Baleno Zeta", brand: "Maruti Suzuki", model: 2021, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: baleno },
  { id: "altroz",          name: "Tata Altroz", brand: "TATA", model: 2023, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: altroz },
  { id: "altroz-xe",       name: "Tata Altroz XE", brand: "TATA", model: 2024, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: altroz },
  { id: "glanza",          name: "Toyota Glanza", brand: "Toyota", model: 2022, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 96, pricePerDay: 2300, image: baleno },
  { id: "ciaz-alpha",      name: "Maruti Ciaz Alpha", brand: "Maruti Suzuki", model: 2018, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 104, pricePerDay: 2500, image: dzire },
  { id: "dzire-vxi-18",    name: "Maruti Dzire VXI", brand: "Maruti Suzuki", model: 2018, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 102, pricePerDay: 2450, image: dzire },
  { id: "tata-punch",      name: "Tata Punch", brand: "Tata Motors", model: 2024, category: "Compact SUV", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: nexon },
  { id: "ecosport",        name: "Ford EcoSport", brand: "Ford", model: 2016, category: "Compact SUV", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: nexon },
  { id: "punch-2024",      name: "Tata Punch", brand: "TATA", model: 2024, category: "Compact SUV", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: nexon },
  { id: "i20-2024",        name: "Hyundai i20", brand: "Hyundai", model: 2024, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: i20 },
  { id: "dzire-vxi-24",    name: "Maruti Dzire VXI", brand: "Maruti Suzuki", model: 2024, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 101, pricePerDay: 2424, image: dzire },
  { id: "i20-sports",      name: "Hyundai i20 Sports", brand: "Hyundai", model: 2024, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: i20 },
  { id: "tiago-xt-23",     name: "Tata Tiago XT", brand: "Tata Motors", model: 2023, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: tiago },
  { id: "seltos",          name: "Kia Seltos", brand: "KIA", model: 2023, category: "Mid-size SUV", seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 104, pricePerDay: 2500, image: seltos },
  { id: "creta-2024",      name: "Hyundai Creta", brand: "Hyundai", model: 2024, category: "Mid-size SUV", seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 117, pricePerDay: 2800, image: creta, badge: "Hot" },
  { id: "rumion",          name: "Toyota Rumion", brand: "Toyota", model: 2025, category: "MPV — 7 Seater", seats: 7, transmission: "Manual", fuel: "Petrol", pricePerHour: 146, pricePerDay: 3500, image: ertiga },
  { id: "ertiga-hybrid",   name: "Maruti Ertiga Smart Hybrid", brand: "Maruti Suzuki", model: 2024, category: "MPV — 7 Seater", seats: 7, transmission: "Manual", fuel: "Petrol", pricePerHour: 146, pricePerDay: 3500, image: ertiga },
  { id: "carens-g15",      name: "Kia Carens G1.5", brand: "KIA", model: 2024, category: "MPV — 7 Seater", seats: 7, transmission: "Automatic", fuel: "Petrol", pricePerHour: 146, pricePerDay: 3500, image: carens },
  { id: "scorpio-n-23",    name: "Mahindra Scorpio-N", brand: "Mahindra", model: 2023, category: "Premium SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 229, pricePerDay: 5500, image: scorpio, badge: "Premium" },
  { id: "fortuner",        name: "Toyota Fortuner", brand: "Toyota", model: 2016, category: "Luxury SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 146, pricePerDay: 3500, image: fortuner },
  { id: "scorpio-n-24",    name: "Mahindra Scorpio-N", brand: "Mahindra", model: 2024, category: "Premium SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 229, pricePerDay: 5500, image: scorpio },
  { id: "scorpio-n-25",    name: "Mahindra Scorpio-N", brand: "Mahindra", model: 2025, category: "Premium SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 229, pricePerDay: 5500, image: scorpio },
  { id: "taigo",           name: "Tata Taigo", brand: "Tata", model: 2024, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: tiago },
  { id: "baleno-delta",    name: "Maruti Baleno Delta", brand: "Maruti Suzuki", model: 2023, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: baleno },
  { id: "i20-sportz-crdi", name: "Hyundai i20 Sportz CRDi", brand: "Hyundai", model: 2013, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Diesel", pricePerHour: 90, pricePerDay: 2160, image: i20 },
  { id: "i20-sportz-12",   name: "Hyundai i20 Sportz 1.2 Kappa MT", brand: "Hyundai", model: 2024, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: i20 },
  { id: "honda-city-15",   name: "Honda City 1.5", brand: "Honda Cars India Ltd", model: 2012, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 83, pricePerDay: 2000, image: dzire },
  { id: "nexon-rtnbs6ph2", name: "TATA Nexon XM RTNBS6PH2", brand: "TATA Motors", model: 2025, category: "Compact SUV", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 104, pricePerDay: 2500, image: nexon },
  { id: "xuv300-2020",     name: "Mahindra XUV300", brand: "Mahindra & Mahindra Limited", model: 2020, category: "Compact SUV", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 104, pricePerDay: 2500, image: xuv },
  { id: "brio-smt",        name: "Honda Brio SMT", brand: "Honda Cars India Ltd", model: 2018, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: i10 },
  { id: "ertiga-vxi-cng",  name: "Maruti Ertiga VXI CNG", brand: "Maruti Suzuki", model: 2025, category: "MPV — 7 Seater", seats: 7, transmission: "Manual", fuel: "Petrol", pricePerHour: 146, pricePerDay: 3500, image: ertiga },
  { id: "tiago-xt-24",     name: "Tata Tiago XT", brand: "Tata Motors", model: 2024, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: tiago },
  { id: "citroen-c3",      name: "Citroën C3", brand: "PCA Automobiles India Pvt Ltd", model: 2023, category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: i10 },
  { id: "fiesta-classic",  name: "Ford Fiesta Classic", brand: "Ford", model: 2012, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 83, pricePerDay: 2000, image: dzire },
  { id: "tata-zest",       name: "Tata Zest", brand: "Tata Motors", model: 2018, category: "Sedan", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 83, pricePerDay: 2000, image: dzire },
  { id: "ignis-zeta",      name: "Maruti Ignis Zeta", brand: "Maruti Suzuki", model: 2022, category: "Compact", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: ignis },
  { id: "xuv500",          name: "Mahindra XUV500", brand: "Mahindra & Mahindra Limited", model: 2017, category: "Premium SUV", seats: 7, transmission: "Manual", fuel: "Diesel", pricePerHour: 90, pricePerDay: 2160, image: xuv },
  { id: "polo",            name: "Volkswagen Polo", brand: "Volkswagen", model: 2022, category: "Premium Hatch", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: baleno },
  { id: "xuv300-2022",     name: "Mahindra XUV300", brand: "Mahindra & Mahindra Limited", model: 2022, category: "Compact SUV", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 90, pricePerDay: 2160, image: xuv },
  { id: "kwid",            name: "Renault Kwid", brand: "Renault India Pvt Ltd", model: 2018, category: "Mini Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 83, pricePerDay: 2000, image: i10 },
  { id: "thar",            name: "Mahindra Thar", brand: "Mahindra & Mahindra Limited", model: 2024, category: "Lifestyle SUV", seats: 4, transmission: "Manual", fuel: "Diesel", pricePerHour: 188, pricePerDay: 4500, image: thar, badge: "Hot" },
];
// Silence unused warning — kept exported for future smart categorization.
void cat;

export const CITIES = ["Chandigarh", "Mohali", "Panchkula", "Zirakpur"] as const;
export type City = (typeof CITIES)[number];
