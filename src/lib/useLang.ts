"use client";

import { useState, useEffect } from "react";
import { type Lang } from "@/lib/i18n";

const STORAGE_KEY = "altuit_lang";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "uz" || stored === "ru" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // localStorage unavailable (private mode etc.) — keep in-memory lang
    }
  };

  return [lang, setLang];
}
