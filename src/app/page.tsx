import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — Rasmiy Veb-Sayt`,
  },
  description:
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi rasmiy veb-sayti. Aniq fanlar (texnika va iqtisodiyot) yo'nalishlarida chuqurlashtirilgan ta'lim, fan to'garaklari va 2026-yil qabul jarayoni.",
  keywords: [
    "TATU akademik litsey",
    "Muhammad al-Xorazmiy nomidagi TATU akademik litseyi",
    "tatual.uz",
    "TATU litsey rasmiy sayti",
    "akademik litsey Toshkent",
    "aniq fanlar texnika",
    "aniq fanlar iqtisodiyot",
    "TATU litsey qabul 2026",
    "litsey kirish imtihonlari",
    "TATU litsey Yunusobod",
    "Bog'ishamol 112",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} — Rasmiy Veb-Sayt`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — matematika, fizika va chet tillarini chuqurlashtirib o'qitishga ixtisoslashgan davlat ta'lim maskani.",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Rasmiy Veb-Sayt`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — matematika, fizika va chet tillarini chuqurlashtirib o'qitishga ixtisoslashgan davlat ta'lim maskani.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
