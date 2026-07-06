"use client";

import { SiteSettingsProvider } from "@/lib/site-settings-context";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteSettingsProvider>{children}</SiteSettingsProvider>;
}
