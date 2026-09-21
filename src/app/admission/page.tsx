import type { Metadata } from "next";
import AdmissionClient from "./AdmissionClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Qabul 2026",
  description:
    "TATU Akademik Litseyiga 2026-yil qabul — kirish imtihonlari, talab qilinadigan hujjatlar, muddatlar. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari.",
  keywords: [
    "TATU litsey qabul 2026",
    "akademik litsey kirish imtihoni",
    "aniq fanlar texnika",
    "aniq fanlar iqtisod",
    "litsey hujjatlar",
    "my.edu.uz litsey qabul",
    "litsey qabul nizomi",
  ],
  alternates: {
    canonical: `${siteConfig.url}/admission`,
  },
  openGraph: {
    title: `Qabul 2026 | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyiga 2026-yil qabul — kirish imtihonlari, talab qilinadigan hujjatlar, muddatlar. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari.",
    url: `${siteConfig.url}/admission`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Qabul 2026 | TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Qabul 2026 | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyiga 2026-yil qabul — kirish imtihonlari, talab qilinadigan hujjatlar, muddatlar.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function AdmissionPage() {
  const breadcrumbSchema = {
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
        name: "Qabul 2026",
        item: `${siteConfig.url}/admission`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AdmissionClient />
    </>
  );
}
