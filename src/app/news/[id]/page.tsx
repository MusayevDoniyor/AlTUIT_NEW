import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/db";
import NewsDetailClient from "./NewsDetailClient";
import { siteConfig } from "@/lib/config";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return { title: "Yangilik topilmadi" };
  }

  const tagStr = typeof news.tag === "string" ? news.tag : news.tag?.uz || "";

  return {
    title: news.titleUz,
    description: news.descUz?.slice(0, 160),
    keywords: tagStr
      ? [tagStr, "TATU litsey yangilik"]
      : ["TATU litsey yangilik"],
    openGraph: {
      title: news.titleUz,
      description: news.descUz?.slice(0, 160),
      images: news.imageUrl ? [{ url: news.imageUrl }] : [],
      url: `${siteConfig.url}/news/${id}`,
      type: "article",
      publishedTime: news.date,
    },
    twitter: {
      card: "summary_large_image",
      title: news.titleUz,
      description: news.descUz?.slice(0, 160),
      images: news.imageUrl ? [news.imageUrl] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  const serialized = {
    id: news.id || id,
    titleUz: news.titleUz,
    titleRu: news.titleRu,
    titleEn: news.titleEn,
    bodyUz: news.bodyUz,
    bodyRu: news.bodyRu,
    bodyEn: news.bodyEn,
    descUz: news.descUz,
    descRu: news.descRu,
    descEn: news.descEn,
    tag: news.tag,
    color: news.color,
    imageUrl: news.imageUrl,
    date: news.date,
  };

  return <NewsDetailClient news={serialized} />;
}
