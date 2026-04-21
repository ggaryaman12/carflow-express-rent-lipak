import { createFileRoute } from "@tanstack/react-router";

type LeadPayload = {
  name: string;
  phone: string;
  city: string;
  vehicle: string;
  pickup: string;
  drop: string;
  location: string;
};

export const Route = createFileRoute("/api/booking-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Partial<LeadPayload>;

          if (!body.name || !body.phone || !body.vehicle) {
            return Response.json(
              { ok: false, error: "Missing required fields" },
              { status: 400 },
            );
          }

          // In production: forward to CRM / DB / Slack here.
          console.log("[booking-lead]", JSON.stringify(body));

          return Response.json({
            ok: true,
            id: `LEAD-${Date.now()}`,
            receivedAt: new Date().toISOString(),
          });
        } catch (err) {
          console.error("[booking-lead] error:", err);
          return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
        }
      },
    },
  },
});
