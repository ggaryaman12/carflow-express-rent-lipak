import { createServerFn } from "@tanstack/react-start";

export type LeadInput = {
  name: string;
  phone: string;
  city: string;
  vehicle: string;
  pickup: string;
  drop: string;
  location: string;
};

function validate(input: unknown): LeadInput {
  const v = input as Partial<LeadInput>;
  if (!v || typeof v !== "object") throw new Error("Invalid payload");
  if (!v.name || !v.phone || !v.vehicle) {
    throw new Error("Missing required fields");
  }
  return {
    name: String(v.name),
    phone: String(v.phone),
    city: String(v.city ?? ""),
    vehicle: String(v.vehicle),
    pickup: String(v.pickup ?? ""),
    drop: String(v.drop ?? ""),
    location: String(v.location ?? ""),
  };
}

export const submitBookingLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => validate(input))
  .handler(async ({ data }) => {
    // In production: forward to CRM / DB / Slack here.
    console.log("[booking-lead]", JSON.stringify(data));
    return {
      ok: true,
      id: `LEAD-${Date.now()}`,
      receivedAt: new Date().toISOString(),
    };
  });
