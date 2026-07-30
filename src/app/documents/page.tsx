import type { Metadata } from "next";
import DocumentsClient from "./DocumentsClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Hujjatlar",
  description:
    "TATU Akademik Litseyi rasmiy hujjatlari — mandat natijalari, qabul hujjatlari va boshqa hujjatlarni yuklab olish.",
  keywords: [
    "TATU litsey hujjatlar",
    "mandat natijalari",
    "akademik litsey hujjatlari",
    "qabul hujjatlari",
  ],
  openGraph: {
    title: `Hujjatlar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi rasmiy hujjatlari — mandat natijalari, qabul hujjatlari va boshqa hujjatlarni yuklab olish.",
    url: `${siteConfig.url}/documents`,
  },
};

export default function DocumentsPage() {
  return <DocumentsClient />;
}
