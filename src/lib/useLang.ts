"use client";

import { useCallback, useSyncExternalStore } from "react";
import { type Lang } from "@/lib/i18n";

const STORAGE_KEY = "altuit_lang";

function isValidLang(value: string | null): value is Lang {
  return value === "uz" || value === "ru" || value === "en";
}

// Module-level store so all components read the same value synchronously.
const listeners = new Set<() => void>();
let currentLang: Lang = "uz";

function emit() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): Lang {
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "uz";
}

// Read the stored value once when the module loads in the browser.
// During SSR this block is skipped, so the server always renders "uz"
// and hydration stays consistent (React re-syncs via getSnapshot after).
if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isValidLang(stored)) currentLang = stored;
  } catch {
    // localStorage unavailable (private mode etc.) — keep "uz"
  }

  // Sync across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && isValidLang(e.newValue)) {
      currentLang = e.newValue;
      emit();
    }
  });
}

export function useLang(): [Lang, (l: Lang) => void] {
  const lang = useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot,
    getServerSnapshot,
  );

  const setLang = useCallback((l: Lang) => {
    currentLang = l;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // localStorage unavailable — keep in-memory lang
    }
    emit();
  }, []);

  return [lang, setLang];
}
