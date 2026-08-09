import type { Metadata } from "next";
import { SITE } from "@/content/site";

// Metadata is rendered once on the server, always in Portuguese — the
// client-side locale toggle swaps visible text but not <head> tags. See
// plan doc, "Indexação em inglês" for the accepted trade-off.
export function buildMetadata(): Metadata {
  const title = `${SITE.name} — ${SITE.tagline.pt}`;
  const description = SITE.description.pt;
  const ogImage = `${SITE.url}/og-default.jpg`;

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: { canonical: SITE.url },
    openGraph: {
      type: "website",
      locale: SITE.locale.pt,
      url: SITE.url,
      title,
      description,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    robots: { index: true, follow: true }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description.pt,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Niassa",
      addressCountry: "MZ"
    }
  };
}
