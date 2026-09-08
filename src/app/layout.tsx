import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — matematika, fizika, informatika va ingliz tili fanlarini chuqur o'rganishga ixtisoslashgan davlat ta'lim muassasasi. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari. 9-sinf bitiruvchilari uchun 2 yillik ta'lim. Toshkent, Yunusobod tumani.",
  keywords: [
    "TATU akademik litsey",
    "Muhammad al-Xorazmiy litsey",
    "tatual.uz",
    "aniq fanlar texnika",
    "aniq fanlar iqtisod",
    "TATU litsey qabul 2026",
    "litsey Yunusobod",
    "Bogishamol 112 litsey",
    "matematika fizika litsey Toshkent",
    "informatika litsey",
    "TATU litsey kirish imtihoni",
    "akademik litsey o'zbek",
    "litsey robototexnika",
    "IELTS litsey Toshkent",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.creator,
  publisher: siteConfig.shortName,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description:
      "Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlarida 2 yillik intensiv ta'lim. Robototexnika, Web-dasturlash, Cisco, IELTS to'garaklari. Manzil: Toshkent, Yunusobod, Bog'ishamol ko'chasi, 112.",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
      "Aniq fanlar yo'nalishida 2 yillik intensiv ta'lim. Toshkent, Yunusobod, Bog'ishamol ko'chasi, 112.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fbvmqyavgeqgvxoxhffi.supabase.co"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://fbvmqyavgeqgvxoxhffi.supabase.co"
        />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Asosiy qismga o&apos;tish
        </a>
        <div id="main-content">
          <Providers>{children}</Providers>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi",
              alternateName: "TATU Akademik Litsey",
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              description:
                "Matematika, fizika, informatika va ingliz tili fanlarini chuqur o'rganishga ixtisoslashgan davlat ta'lim muassasasi",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bog'ishamol ko'chasi, 112",
                addressLocality: "Toshkent",
                addressRegion: "Yunusobod tumani",
                addressCountry: "UZ",
              },
              telephone: ["+998712350369", "+998931033245"],
              email: "info@tatual.uz",
              sameAs: ["https://tuit.uz/akademik-litsey", siteConfig.url],
            }),
          }}
        />
      </body>
    </html>
  );
}
