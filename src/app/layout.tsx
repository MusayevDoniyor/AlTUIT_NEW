import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi",
    template: "%s | TATU Akademik Litsey",
  },
  description:
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — matematika, fizika, informatika va ingliz tili fanlarini chuqur o'rganishga ixtisoslashgan davlat ta'lim muassasasi. Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlari. 9-sinf bitiruvchilari uchun 2 yillik ta'lim. Toshkent, Yunusobod tumani.",
  keywords: [
    "TATU akademik litsey",
    "Muhammad al-Xorazmiy litsey",
    "tatual.uz",
    "aniq fanlar texnika",
    "aniq fanlar iqtisod",
    "TATU litsey qabul 2025",
    "litsey Yunusobod",
    "Bogishamol 112 litsey",
    "matematika fizika litsey Toshkent",
    "informatika litsey",
    "TATU litsey kirish imtihoni",
    "akademik litsey o'zbek",
    "litsey robototexnika",
    "IELTS litsey Toshkent",
  ],
  authors: [{ name: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi" }],
  creator: "TATU Akademik Litsey",
  publisher: "TATU Akademik Litsey",
  metadataBase: new URL("https://tatual.uz"),
  alternates: {
    canonical: "/",
    languages: {
      "uz-UZ": "/uz",
      "ru-RU": "/ru",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi",
    description:
      "Aniq fanlar (texnika) va aniq fanlar (iqtisod) yo'nalishlarida 2 yillik intensiv ta'lim. Robototexnika, Web-dasturlash, Cisco, IELTS to'garaklari. Manzil: Toshkent, Yunusobod, Bog'ishamol ko'chasi, 112.",
    url: "https://tatual.uz",
    siteName: "TATU Akademik Litsey",
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi",
    description:
      "Aniq fanlar yo'nalishida 2 yillik intensiv ta'lim. Toshkent, Yunusobod, Bog'ishamol ko'chasi, 112.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
