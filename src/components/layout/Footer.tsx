import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Users,
  Camera,
  Send,
  Play,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
               <img src="/tuit.png" alt="TATU AL Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-display font-bold text-xl">
              TATU AL
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari
            universiteti akademik litseyi — yoshlarni IT va aniq fanlar sohasida
            yuqori malakali tayyorlash maskani.
          </p>
          <div className="flex gap-4">
            {[Users, Camera, Send, Play].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary transition-colors hover:text-white"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-display font-bold mb-6">
            Foydali havolalar
          </h4>
          <ul className="space-y-4 text-sm">
            {[
              "Litsey haqida",
              "Qabul shartlari",
              "O'qituvchilar",
              "Dars jadvali",
              "Meyoriy hujjatlar",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-brand-secondary transition-colors inline-block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-display font-bold mb-6">Bo'limlar</h4>
          <ul className="space-y-4 text-sm">
            {[
              "Kafedralar",
              "Yotoqxona",
              "Ma'naviyat va ma'rifat",
              "Sport majmuasi",
              "Robototexnika klubi",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-brand-secondary transition-colors inline-block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-display font-bold mb-6">Bog'lanish</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-brand-secondary shrink-0" />
              <span>Toshkent 100084, Amir Temur shox ko‘chasi 108 uy</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-brand-secondary shrink-0" />
              <div className="flex flex-col">
                <Link
                  href="tel:+998712350369"
                  className="hover:text-white transition-colors"
                >
                  +998 71 235 03 69
                </Link>
                <Link
                  href="tel:+998932220611"
                  className="hover:text-white transition-colors"
                >
                  +998 93 222 06 11
                </Link>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-brand-secondary shrink-0" />
              <Link
                href="mailto:info@tatual.uz"
                className="hover:text-white transition-colors"
              >
                info@tatual.uz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} Muhammad al-Xorazmiy nomidagi TATU AL.
          Barcha huquqlar himoyalangan.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-slate-300 transition-colors">
            Maxfiylik siyosati
          </Link>
          <Link href="#" className="hover:text-slate-300 transition-colors">
            Foydalanish shartlari
          </Link>
        </div>
      </div>
    </footer>
  );
};
