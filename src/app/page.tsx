import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.shortName,
  description: siteConfig.description,
  keywords: [
    "TATU akademik litsey",
    "akademik litsey Toshkent",
    "litsey qabul 2026",
    "Muhammad al-Xorazmiy litseyi",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
