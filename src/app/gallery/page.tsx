import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Galereya",
  description:
    "TATU Akademik Litseyi hayotidan foto galereya — tadbirlar, o'quv jarayoni, bino va sharoitlar, sport hayoti.",
  keywords: [
    "TATU litsey galereya",
    "akademik litsey rasmlar",
    "litsey fotosuratlar",
    "litsey tadbirlar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
  },
  openGraph: {
    title: `Galereya | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi hayotidan foto galereya — tadbirlar, o'quv jarayoni, bino va sharoitlar, sport hayoti.",
    url: `${siteConfig.url}/gallery`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Galereya | TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Galereya | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi hayotidan foto galereya — tadbirlar, o'quv jarayoni, bino va sharoitlar.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
