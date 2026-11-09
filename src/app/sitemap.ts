import { type MetadataRoute } from "next";
import { getNews } from "@/lib/db";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/strategy", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/admission", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/news", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/departments", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/gallery", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/science", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >,
    priority: route.priority,
  }));

  let newsEntries: MetadataRoute.Sitemap = [];

  try {
    const news = await getNews();
    if (news && news.length > 0) {
      newsEntries = news.map((item) => ({
        url: `${baseUrl}/news/${item.id}`,
        lastModified: item.date ? new Date(item.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Ignore DB errors during sitemap generation — keep static routes
  }

  return [...staticEntries, ...newsEntries];
}
