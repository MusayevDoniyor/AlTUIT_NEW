import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TATU AL | Muhammad al-Xorazmiy nomidagi TATU akademik litseyi",
  description: "Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti akademik litseyi rasmiy veb-sayti. IT va aniq fanlar yo'nalishida yuqori sifatli ta'lim.",
  keywords: "tatual, tatu litsey, akademik litsey, al-xorazmiy litsey, it ta'lim, toshkent litseylari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-[88px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
