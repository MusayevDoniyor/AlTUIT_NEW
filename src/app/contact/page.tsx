import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Bog'lanish",
  description:
    "TATU Akademik Litseyi manzili: Toshkent, Yunusobod tumani, Bog'ishamol ko'chasi, 112. Tel: +998 71 235-03-69, +998 93 103-32-45. Bodomzor metro bekati yaqinida.",
  keywords: [
    "TATU litsey manzil",
    "akademik litsey telefon",
    "Bogishamol 112",
    "Yunusobod litsey",
    "litsey kontakt",
  ],
  openGraph: {
    title: `Bog'lanish | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi manzili: Toshkent, Yunusobod tumani, Bog'ishamol ko'chasi, 112. Tel: +998 71 235-03-69, +998 93 103-32-45.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
