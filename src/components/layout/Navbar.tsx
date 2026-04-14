"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NavLinks = [
  { name: "Asosiy", href: "/" },
  { name: "Rahbariyat", href: "/administration" },
  { name: "Qabul 2025", href: "/admission" },
  { name: "Hujjatlar", href: "/documents" },
  { name: "Yangiliklar", href: "/news" },
  { name: "Bog'lanish", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
        scrolled
          ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-brand-primary/10"
          : "py-6 bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 relative flex items-center justify-center bg-white rounded-full shadow-lg p-1 overflow-hidden transition-all group-hover:scale-110 group-hover:rotate-3">
             <img src="/tuit.png" alt="TATU AL Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "font-display font-bold text-lg leading-tight transition-colors",
                scrolled
                  ? "text-brand-primary"
                  : "text-brand-primary dark:text-white",
              )}
            >
              TATU AL
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider font-semibold opacity-80",
                scrolled
                  ? "text-slate-600"
                  : "text-slate-200 dark:text-slate-400",
              )}
            >
              Akademik Litseyi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium text-sm transition-colors hover:text-brand-secondary",
                scrolled
                  ? "text-slate-700"
                  : "text-brand-primary dark:text-white",
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Globe
                size={18}
                className={
                  scrolled
                    ? "text-slate-600"
                    : "text-brand-primary dark:text-white"
                }
              />
            </button>
            <Link
              href="tel:+998712350369"
              className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all transform hover:-translate-y-0.5"
            >
              <Phone size={14} />
              <span>Bog'lanish</span>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-brand-primary dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[72px] bg-white dark:bg-slate-900 z-40 p-6 transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col gap-6">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-display font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="tel:+998712350369"
            className="flex items-center justify-center gap-2 bg-brand-primary text-white p-4 rounded-xl text-lg font-bold"
            onClick={() => setIsOpen(false)}
          >
            <Phone size={20} />
            <span>Aloqa markazi</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
