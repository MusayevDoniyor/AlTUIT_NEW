import type { Metadata } from "next";
import AdmissionClient from "./AdmissionClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Qabul 2025",
  description:
    "TATU Akademik Litseyiga 2025-yil qabul — kirish imtihonlari, talab qilinadigan hujjatlar, muddatlar. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari.",
  keywords: [
    "TATU litsey qabul 2025",
    "akademik litsey kirish imtihoni",
    "aniq fanlar texnika",
    "aniq fanlar iqtisod",
    "litsey hujjatlar",
    "my.gov.uz litsey qabul",
  ],
  openGraph: {
    title: `Qabul 2025 | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyiga 2025-yil qabul — kirish imtihonlari, talab qilinadigan hujjatlar, muddatlar. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari.",
    url: `${siteConfig.url}/admission`,
  },
};

export default function AdmissionPage() {
  return <AdmissionClient />;
}
