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
    "matematika fizika informatika litsey",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
  },
};

export default function HomePage() {
  return <HomeClient />;
}
