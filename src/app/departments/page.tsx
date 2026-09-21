import type { Metadata } from "next";
import DepartmentsClient from "./DepartmentsClient";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kafedralar",
  description: "TATU Akademik Litseyi kafedralari — mudirlar va professor-o'qituvchilar tarkibi",
  alternates: {
    canonical: `${siteConfig.url}/departments`,
  },
  openGraph: {
    title: `Kafedralar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi kafedralari — mudirlar va professor-o'qituvchilar tarkibi.",
    url: `${siteConfig.url}/departments`,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kafedralar | TATU Akademik Litseyi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Kafedralar | ${siteConfig.shortName}`,
    description:
      "TATU Akademik Litseyi kafedralari — mudirlar va professor-o'qituvchilar tarkibi.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
};

export default function DepartmentsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Bosh sahifa",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kafedralar",
        item: `${siteConfig.url}/departments`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DepartmentsClient />
    </>
  );
}
