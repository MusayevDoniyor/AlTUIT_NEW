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
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — matematika, fizika va ingliz tili fanlarini chuqur o'rganishga ixtisoslashgan davlat ta'lim muassasasi. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari. 9-sinf bitiruvchilari uchun 2 yillik ta'lim. Toshkent, Yunusobod tumani.",
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
    "TATU litsey kirish imtihoni",
    "akademik litsey o'zbek",
    "litsey robototexnika",
    "IELTS litsey Toshkent",
  ],
  authors: [
    { name: siteConfig.name },
    { name: "Musayev Doniyor", url: "https://github.com/MusayevDoniyor" },
    { name: "Abduvaliyev Otabek", url: "https://github.com/OtabekAbduvaliyev" },
  ],
  creator: "Musayev Doniyor & Abduvaliyev Otabek",
  publisher: siteConfig.shortName,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "uz-UZ": siteConfig.url,
      "ru-RU": `${siteConfig.url}?lang=ru`,
      "en-US": `${siteConfig.url}?lang=en`,
      "x-default": siteConfig.url,
    },
  },
  other: {
    "geo.region": "UZ-TK",
    "geo.placename": "Toshkent",
    "geo.position": "41.3526;69.2887",
    ICBM: "41.3526, 69.2887",
  },
  openGraph: {
    title: siteConfig.name,
    description:
      "Aniq fanlar (texnika va iqtisodiyot) yo'nalishlarida 2 yillik chuqurlashtirilgan akademik ta'lim. Fan olimpiadalari va xorijiy tillarga ixtisoslashgan to'garaklar. Manzil: Toshkent shahri, Yunusobod tumani, Bog'ishamol ko'chasi, 112-uy.",
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
      "Aniq fanlar (texnika va iqtisodiyot) yo'nalishida 2 yillik chuqurlashtirilgan akademik ta'lim. Toshkent, Bog'ishamol ko'chasi, 112-uy.",
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
              alternateName: ["TATU Akademik Litsey", "TATU AL", "AlTUIT"],
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              image: `${siteConfig.url}/og-image.jpg`,
              creator: {
                "@type": "Person",
                name: "Musayev Doniyor & Abduvaliyev Otabek",
                url: "https://github.com/MusayevDoniyor",
              },
              description:
                "Matematika, fizika va chet tillarini chuqur o'rganishga ixtisoslashgan davlat akademik litseyi.",
              parentOrganization: {
                "@type": "CollegeOrUniversity",
                name: "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti",
                alternateName: "TATU",
                url: "https://tuit.uz",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bog'ishamol ko'chasi, 112-uy",
                addressLocality: "Toshkent",
                addressRegion: "Yunusobod tumani",
                addressCountry: "UZ",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 41.3526,
                longitude: 69.2887,
              },
              hasMap: "https://maps.google.com/?q=41.3526,69.2887",
              telephone: "+998712350369",
              email: "info@tatual.uz",
              sameAs: [
                siteConfig.telegram,
                siteConfig.instagram,
                "https://tuit.uz/akademik-litsey",
                siteConfig.url,
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:30",
                  closes: "17:30",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
