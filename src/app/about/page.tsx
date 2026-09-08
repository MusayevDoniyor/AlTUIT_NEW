import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { siteConfig } from "@/lib/config";

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
  return <AboutClient />;
}
