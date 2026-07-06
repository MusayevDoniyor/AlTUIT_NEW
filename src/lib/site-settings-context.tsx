"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSiteSettings } from "@/lib/db";

interface SiteSettingsContextValue {
  maintenanceMode: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  maintenanceMode: false,
  loading: true,
  refresh: async () => {},
});

export function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const settings = await getSiteSettings();
      setMaintenanceMode(settings.maintenanceMode);
    } catch {
      setMaintenanceMode(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SiteSettingsContext.Provider
      value={{ maintenanceMode, loading, refresh }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
