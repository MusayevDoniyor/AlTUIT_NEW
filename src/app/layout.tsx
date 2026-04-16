import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad al-Xorazmiy Akademik Litseyi | TATU",
  description:
    "Toshkent axborot texnologiyalari universiteti (TATU) huzuridagi Muhammad al-Xorazmiy nomidagi Akademik Litsey — zamonaviy ta'lim muhitida yuqori sifatli akademik ta'lim.",
  keywords: [
    "TATU litsey",
    "akademik litsey",
    "Muhammad al-Xorazmiy litsey",
    "Toshkent litsey",
    "tatual.uz",
    "litsey qabul",
  ],
  openGraph: {
    title: "Muhammad al-Xorazmiy Akademik Litseyi | TATU",
    description:
      "Zamonaviy akademik ta'lim markazi — TATU huzuridagi Al-Xorazmiy Akademik Litseyi",
    locale: "uz_UZ",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
