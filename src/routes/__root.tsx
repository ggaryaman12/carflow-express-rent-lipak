import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SUPER Car Rental — Self Drive Cars in Tricity" },
      {
        name: "description",
        content:
          "Affordable self-drive car rental in Chandigarh, Mohali & Panchkula. Book Swift, Thar, Scorpio and more in under 30 seconds — confirm on WhatsApp.",
      },
      { name: "author", content: "SUPER Car Rental" },
      { property: "og:title", content: "SUPER Car Rental — Self Drive Cars in Tricity" },
      {
        property: "og:description",
        content: "Self-drive cars in Chandigarh, Mohali & Panchkula. Book in 30 seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0e0a1f" },
      { name: "twitter:title", content: "SUPER Car Rental — Self Drive Cars in Tricity" },
      { name: "description", content: "A modern, responsive car rental landing page for booking self-drive vehicles." },
      { property: "og:description", content: "A modern, responsive car rental landing page for booking self-drive vehicles." },
      { name: "twitter:description", content: "A modern, responsive car rental landing page for booking self-drive vehicles." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/97ecd8d8-a407-455d-b15a-a9fdd28fb4bc/id-preview-370ae3e8--bcaaddff-2a83-4612-8e2e-d804e71fdb39.lovable.app-1776768627183.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/97ecd8d8-a407-455d-b15a-a9fdd28fb4bc/id-preview-370ae3e8--bcaaddff-2a83-4612-8e2e-d804e71fdb39.lovable.app-1776768627183.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
