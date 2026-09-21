import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { siteConfig } from "@/lib/config";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Litsey haqida",
  description:
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi haqida — rahbariyat, pedagoglar, moddiy-texnik baza. Toshkent, Yunusobod tumani.",
  keywords: [
    "TATU litsey rahbariyat",
    "litsey o'qituvchilari",
    "litsey infrastruktura",
    "Abdiyev Nosir",
    "TATU akademik litsey haqida",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `Litsey haqida | ${siteConfig.shortName}`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi haqida — rahbariyat, pedagoglar, moddiy-texnik baza. Toshkent, Yunusobod tumani.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Litsey haqida | ${siteConfig.shortName}`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi haqida — rahbariyat, pedagoglar, moddiy-texnik baza.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function AboutPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: translations.uz.faq_items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

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
        name: "Litsey haqida",
        item: `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutClient />
    </>
  );
}
