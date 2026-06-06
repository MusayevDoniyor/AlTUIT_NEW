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
  openGraph: {
    title: `Litsey haqida | ${siteConfig.shortName}`,
    description:
      "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi haqida — rahbariyat, pedagoglar, moddiy-texnik baza. Toshkent, Yunusobod tumani.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
