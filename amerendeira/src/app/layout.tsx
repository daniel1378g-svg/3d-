import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "@/styles/globals.css";
import { brand } from "@/content/site";

const SITE_URL = "https://amerendeira.pt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "A Merendeira — Pão com chouriço feito à moda antiga",
  description: brand.tagline,
  applicationName: "A Merendeira",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/brand/icon-m-256.png", sizes: "256x256", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "A Merendeira",
    title: "A Merendeira",
    description: brand.tagline,
    images: [{ url: "/og/a-merendeira.jpg", width: 1200, height: 630, alt: "Pão com chouriço acabado de cozer, com vapor, e o logótipo A Merendeira" }],
  },
  twitter: { card: "summary_large_image", title: "A Merendeira", description: brand.tagline, images: ["/og/a-merendeira.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#191919",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before first paint: marks JS as available and decides whether the opening plays (once
// per session, never with reduced motion, never when arriving on an anchor such as #menus).
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('mrd:intro');if(!r&&!seen&&!location.hash){d.classList.add('has-intro');setTimeout(function(){if(!d.classList.contains('intro-running'))d.classList.remove('has-intro');},3000);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet="/videos/poster/cover-960.avif 960w, /videos/poster/cover-1280.avif 1280w"
          imageSizes="(max-width: 899px) 100vw, 94vw"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
