import type { Metadata } from "next";
import ScienceClient from "./ScienceClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Yutuqlar",
  description:
    "TATU Akademik Litseyi o'quvchilarining olimpiada va musobaqa yutuqlari. Respublika va xalqaro olimpiadalar, Cisco, IELTS sertifikatlari.",
  keywords: [
    "TATU litsey olimpiada",
    "akademik litsey yutuqlar",
    "litsey xalqaro musobaqa",
    "litsey dasturlash olimpiada",
  ],
  alternates: {
    canonical: `${siteConfig.url}/science`,
  },
  openGraph: {
    title: `Yutuqlar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi o'quvchilarining olimpiada va musobaqa yutuqlari. Respublika va xalqaro olimpiadalar, Cisco, IELTS sertifikatlari.",
    url: `${siteConfig.url}/science`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yutuqlar | TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yutuqlar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi o'quvchilarining olimpiada va musobaqa yutuqlari.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function SciencePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yutuqlar",
        item: `${siteConfig.url}/science`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScienceClient />
    </>
  );
}
