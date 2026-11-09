import type { Metadata } from "next";
import StrategyClient from "./StrategyClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Strategik rivojlanish",
  description:
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyining 2024–2030 yillarga mo'ljallangan strategik rivojlanish rejasi va konsepsiyasi. Maqsadli ko'rsatkichlar, ta'lim sifati monitoringi va ustuvor vazifalar.",
  keywords: [
    "TATU litsey strategik rivojlanish",
    "litsey rivojlanish rejasi",
    "strategik maqsadlar 2030",
    "TATU akademik litsey konsepsiya",
    "ta'lim sifati monitoringi",
    "tatual.uz strategik rivojlanish",
  ],
  alternates: {
    canonical: `${siteConfig.url}/strategy`,
  },
  openGraph: {
    title: `Strategik rivojlanish | ${siteConfig.shortName}`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyining 2024–2030 yillarga mo'ljallangan strategik rivojlanish rejasi va konsepsiyasi.",
    url: `${siteConfig.url}/strategy`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Strategik rivojlanish | TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Strategik rivojlanish | ${siteConfig.shortName}`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyining 2024–2030 yillarga mo'ljallangan strategik rivojlanish rejasi.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function StrategyPage() {
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
        name: "Litsey haqida",
        item: `${siteConfig.url}/about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategik rivojlanish",
        item: `${siteConfig.url}/strategy`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StrategyClient />
    </>
  );
}
