import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/lib/i18n/LocaleProvider";
import Header from "@/components/layout/Header";
import CurrencyTicker from "@/components/layout/CurrencyTicker";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#FCFCFA",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-MZ" className={`${familjenGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-bg font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <LocaleProvider>
          <ScrollProgressBar />
          <Header />
          <CurrencyTicker />
          <main id="main">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
