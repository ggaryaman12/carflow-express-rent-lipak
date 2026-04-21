import swift from "@/assets/car-swift.jpg";
import jimny from "@/assets/car-jimny.jpg";
import ignis from "@/assets/car-ignis.jpg";
import brezza from "@/assets/car-brezza.jpg";
import thar from "@/assets/car-thar.jpg";
import scorpio from "@/assets/car-scorpio.jpg";
import carens from "@/assets/car-carens.jpg";

export type Car = {
  id: string;
  name: string;
  category: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel";
  pricePerHour: number;
  image: string;
  badge?: string;
};

export const CARS: Car[] = [
  { id: "swift", name: "Maruti Swift", category: "Hatchback", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 149, image: swift, badge: "Popular" },
  { id: "ignis", name: "Maruti Ignis", category: "Compact", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerHour: 159, image: ignis },
  { id: "brezza", name: "Maruti Brezza", category: "Compact SUV", seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerHour: 229, image: brezza },
  { id: "jimny", name: "Maruti Jimny", category: "Off-Road SUV", seats: 4, transmission: "Manual", fuel: "Petrol", pricePerHour: 269, image: jimny, badge: "New" },
  { id: "carens", name: "Kia Carens", category: "MPV — 7 Seater", seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 299, image: carens },
  { id: "thar", name: "Thar Roxx", category: "Lifestyle SUV", seats: 5, transmission: "Automatic", fuel: "Diesel", pricePerHour: 349, image: thar, badge: "Hot" },
  { id: "scorpio", name: "Scorpio N", category: "Premium SUV", seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerHour: 379, image: scorpio },
];

export const CITIES = ["Chandigarh", "Mohali", "Panchkula", "Zirakpur"] as const;
export type City = (typeof CITIES)[number];
