import type { Metadata } from "next";
import ScienceClient from "./ScienceClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Yutuqlar",
  description:
    "TATU Akademik Litseyi o'quvchilarining olimpiada va musobaqa yutuqlari. Respublika va xalqaro olimpiadalar, Cisco, IELTS sertifikatlari.",
  keywords: [
    "TATU litsey olimpiada",
    "akademik litsey yutuqlar",
    "litsey xalqaro musobaqa",
    "litsey dasturlash olimpiada",
  ],
  openGraph: {
    title: `Yutuqlar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi o'quvchilarining olimpiada va musobaqa yutuqlari. Respublika va xalqaro olimpiadalar, Cisco, IELTS sertifikatlari.",
    url: `${siteConfig.url}/science`,
  },
};

export default function SciencePage() {
  return <ScienceClient />;
}
