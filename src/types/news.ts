export interface ImageItem {
  url: string;
  order: number;
  isMain: boolean;
}

export interface NewsFormData {
  date: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  body_uz: string;
  body_ru: string;
  body_en: string;
  desc_uz: string;
  desc_ru: string;
  desc_en: string;
  tag: { uz: string; ru: string; en: string };
  color: string;
  images: ImageItem[];
  is_published: boolean;
}
