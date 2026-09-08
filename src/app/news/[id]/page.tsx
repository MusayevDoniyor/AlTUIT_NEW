import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById as getNewsByIdDb, getNewsMainImage } from "@/lib/db";
import NewsDetailClient from "./NewsDetailClient";
import { siteConfig } from "@/lib/config";

const getNewsById = cache(async (id: string) => {
  return getNewsByIdDb(id);
});

type Props = {
  params: Promise<{ id: string }>;
};

function cleanSnippet(htmlOrText?: string): string {
  if (!htmlOrText) return "";
  return htmlOrText
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return {
      title: "Yangilik topilmadi",
      description: "Qidirilayotgan yangilik topilmadi yoki o'chirilgan.",
    };
  }

  const title = news.titleUz || siteConfig.name;

  // Resolve snippet for description
  const rawSnippet = news.descUz?.trim() || cleanSnippet(news.bodyUz);
  const description =
    rawSnippet.length > 200
      ? `${rawSnippet.slice(0, 197).trim()}...`
      : rawSnippet || siteConfig.description;

  // Resolve best image URL: check getNewsMainImage first, fallback to imageUrl, then default OG image
  const resolvedImg = getNewsMainImage(news) || news.imageUrl?.trim();
  const ogImageUrl = resolvedImg
    ? resolvedImg.startsWith("http")
      ? resolvedImg
      : `${siteConfig.url}${resolvedImg}`
    : `${siteConfig.url}/og-image.jpg`;

  const postUrl = `${siteConfig.url}/news/${id}`;
  const tagStr = typeof news.tag === "string" ? news.tag : news.tag?.uz || "";

  return {
    title,
    description,
    keywords: tagStr
      ? [tagStr, "TATU akademik litsey", "Muhammad al-Xorazmiy litsey", "TATU litsey yangiliklari"]
      : ["TATU akademik litsey", "TATU litsey yangiliklari"],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: siteConfig.shortName,
      locale: "uz_UZ",
      type: "article",
      publishedTime: news.date ? new Date(news.date).toISOString() : undefined,
      modifiedTime: news.date ? new Date(news.date).toISOString() : undefined,
      authors: [siteConfig.name],
      tags: tagStr ? [tagStr] : ["Yangiliklar"],
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: ogImageUrl.endsWith(".png") ? "image/png" : "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@tatu_lyceum",
      site: "@tatu_lyceum",
    },
    other: {
      "telegram:channel": "@tatu_akademik_litseyi",
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/news/${id}`;
  const resolvedImg = getNewsMainImage(news) || news.imageUrl?.trim();
  const ogImageUrl = resolvedImg
    ? resolvedImg.startsWith("http")
      ? resolvedImg
    : `${siteConfig.url}${resolvedImg}`
    : `${siteConfig.url}/og-image.jpg`;

  const rawSnippet = news.descUz?.trim() || cleanSnippet(news.bodyUz);
  const description =
    rawSnippet.length > 200
      ? `${rawSnippet.slice(0, 197).trim()}...`
      : rawSnippet || siteConfig.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.titleUz,
    description: description,
    image: [ogImageUrl],
    datePublished: news.date ? new Date(news.date).toISOString() : undefined,
    dateModified: news.date ? new Date(news.date).toISOString() : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

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
    images: news.images || "",
    fileUrl: news.fileUrl,
    fileName: news.fileName,
    date: news.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsDetailClient news={serialized} />
    </>
  );
}
