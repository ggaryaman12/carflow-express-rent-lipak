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
import alto from "@/assets/car-altroz.jpg";
import ertiga from "@/assets/car-ertiga.jpg";
import xuv from "@/assets/car-xuv.jpg";

export type Car = {
  id: string;
  name: string;
  category: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel";
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  badge?: string;
};

// Curated from the SUPER Rental fleet — unique models, lowest available rate.
export const CARS: Car[] = [
  { id: "alto",     name: "Maruti Alto K10",     category: "Mini Hatchback",  seats: 4, transmission: "Manual",    fuel: "Petrol", pricePerHour: 50,  pricePerDay: 1200, image: alto },
  { id: "i10",      name: "Hyundai Grand i10",   category: "Hatchback",       seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 90,  pricePerDay: 2160, image: i10 },
  { id: "tiago",    name: "Tata Tiago",          category: "Hatchback",       seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 90,  pricePerDay: 2160, image: tiago },
  { id: "swift",    name: "Maruti Swift",        category: "Hatchback",       seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 90,  pricePerDay: 2160, image: swift, badge: "Popular" },
  { id: "ignis",    name: "Maruti Ignis",        category: "Compact",         seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 96,  pricePerDay: 2300, image: ignis },
  { id: "i20",      name: "Hyundai i20",         category: "Premium Hatch",   seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: i20 },
  { id: "baleno",   name: "Maruti Baleno",       category: "Premium Hatch",   seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: baleno },
  { id: "dzire",    name: "Maruti Dzire",        category: "Sedan",           seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 102, pricePerDay: 2450, image: dzire },
  { id: "nexon",    name: "Tata Nexon",          category: "Compact SUV",     seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: nexon },
  { id: "brezza",   name: "Maruti Brezza",       category: "Compact SUV",     seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 117, pricePerDay: 2800, image: brezza },
  { id: "creta",    name: "Hyundai Creta",       category: "Mid-size SUV",    seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 146, pricePerDay: 3500, image: creta, badge: "Hot" },
  { id: "seltos",   name: "Kia Seltos",          category: "Mid-size SUV",    seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 104, pricePerDay: 2500, image: seltos },
  { id: "ertiga",   name: "Maruti Ertiga",       category: "MPV — 7 Seater",  seats: 7, transmission: "Manual",    fuel: "Petrol", pricePerHour: 146, pricePerDay: 3500, image: ertiga },
  { id: "carens",   name: "Kia Carens",          category: "MPV — 7 Seater",  seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 146, pricePerDay: 3500, image: carens },
  { id: "jimny",    name: "Maruti Jimny",        category: "Off-Road SUV",    seats: 4, transmission: "Manual",    fuel: "Petrol", pricePerHour: 90,  pricePerDay: 2160, image: jimny, badge: "New" },
  { id: "xuv",      name: "Mahindra XUV 300",    category: "Compact SUV",     seats: 5, transmission: "Manual",    fuel: "Petrol", pricePerHour: 100, pricePerDay: 2400, image: xuv },
  { id: "thar",     name: "Mahindra Thar",       category: "Lifestyle SUV",   seats: 4, transmission: "Manual",    fuel: "Diesel", pricePerHour: 188, pricePerDay: 4500, image: thar },
  { id: "scorpio",  name: "Mahindra Scorpio-N",  category: "Premium SUV",     seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 229, pricePerDay: 5500, image: scorpio, badge: "Premium" },
  { id: "fortuner", name: "Toyota Fortuner",     category: "Luxury SUV",      seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 146, pricePerDay: 3500, image: fortuner },
];

export const CITIES = ["Chandigarh", "Mohali", "Panchkula", "Zirakpur"] as const;
export type City = (typeof CITIES)[number];
