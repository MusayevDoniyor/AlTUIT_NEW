import type { Metadata } from "next";
import DepartmentsClient from "./DepartmentsClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kafedralar",
  description: "TATU Akademik Litseyi kafedralari — mudirlar va professor-o'qituvchilar tarkibi",
  openGraph: {
    title: `Kafedralar | ${siteConfig.shortName}`,
    url: `${siteConfig.url}/departments`,
  },
};

export default function DepartmentsPage() {
  return <DepartmentsClient />;
}
