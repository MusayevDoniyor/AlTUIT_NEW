import type { Metadata } from "next";
import NewsClient from "./NewsClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Yangiliklar",
  description:
    "TATU Akademik Litseyi so'nggi yangiliklari, tadbirlar va e'lonlar. Olimpiada natijalari, qabul e'lonlari va litsey hayoti.",
  keywords: [
    "TATU litsey yangiliklar",
    "akademik litsey tadbirlar",
    "litsey olimpiada",
    "litsey e'lonlar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/news`,
  },
  openGraph: {
    title: `Yangiliklar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi so'nggi yangiliklari, tadbirlar va e'lonlar. Olimpiada natijalari, qabul e'lonlari va litsey hayoti.",
    url: `${siteConfig.url}/news`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yangiliklar | TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yangiliklar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi so'nggi yangiliklari, tadbirlar va e'lonlar.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function NewsPage() {
  return <NewsClient />;
}
