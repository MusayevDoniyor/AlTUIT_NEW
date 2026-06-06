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
  openGraph: {
    title: `Yangiliklar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi so'nggi yangiliklari, tadbirlar va e'lonlar. Olimpiada natijalari, qabul e'lonlari va litsey hayoti.",
    url: `${siteConfig.url}/news`,
  },
};

export default function NewsPage() {
  return <NewsClient />;
}
