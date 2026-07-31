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
  openGraph: {
    title: `Galereya | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi hayotidan foto galereya — tadbirlar, o'quv jarayoni, bino va sharoitlar, sport hayoti.",
    url: `${siteConfig.url}/gallery`,
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
