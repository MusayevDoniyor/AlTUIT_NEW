import type { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: "404 — Sahifa topilmadi",
  description:
    "Kechirasiz, siz qidirayotgan sahifa topilmadi yoki ko'chirilgan bo'lishi mumkin. Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi rasmiy veb-sayti.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundClient />;
}
