import { supabase } from "./supabase";

// Generic Upload file helper using Supabase Storage
export async function uploadImage(file: File, folder: string): Promise<string> {
  const fileExtension = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(fileName);

  return publicUrl;
}

// Generic Delete file helper using Supabase Storage
export async function deleteImage(url: string): Promise<void> {
  try {
    const marker = "/storage/v1/object/public/images/";
    const markerIndex = url.indexOf(marker);
    if (markerIndex === -1) {
      console.warn("Could not parse Supabase image path from URL:", url);
      return;
    }
    const path = url.substring(markerIndex + marker.length);
    const { error } = await supabase.storage.from("images").remove([path]);
    if (error) throw error;
  } catch (error) {
    console.error("Failed to delete image from Supabase storage:", error);
  }
}

// ----------------------------------------------------
// 1. News
// ----------------------------------------------------
export interface NewsItem {
  id?: string;
  date: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  bodyUz: string;
  bodyRu: string;
  bodyEn: string;
  descUz: string;
  descRu: string;
  descEn: string;
  tag: { uz: string; ru: string; en: string };
  color: string;
  imageUrl?: string;
  images?: string; // JSON string of ImageItem[]
  isPublished?: boolean;
}

export interface ImageItem {
  url: string;
  order: number;
  isMain: boolean;
}

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data ? mapRow(data) : null;
}

export async function saveNews(
  id: string,
  data: Omit<NewsItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("news")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}

/** Create news with images array support */
export async function createNews(
  data: Omit<NewsItem, "id"> & { images?: ImageItem[] },
): Promise<string> {
  const mainImage = data.images?.find((img) => img.isMain);
  const row = toRow({
    ...data,
    imageUrl: mainImage?.url || data.imageUrl || "",
    images: data.images ? JSON.stringify(data.images) : undefined,
  });
  const { error } = await supabase
    .from("news")
    .insert(row)
    .select("id")
    .single();
  if (error) throw error;
  return "";
}

/** Update news with images array support */
export async function updateNews(
  id: string,
  data: Omit<NewsItem, "id"> & { images?: ImageItem[] },
): Promise<void> {
  const mainImage = data.images?.find((img) => img.isMain);
  const row = toRow({
    ...data,
    imageUrl: mainImage?.url || data.imageUrl || "",
    images: data.images ? JSON.stringify(data.images) : undefined,
  });
  const { error } = await supabase.from("news").update(row).eq("id", id);
  if (error) throw error;
}

/** Delete news and its images from storage */
export async function deleteNewsWithImages(id: string): Promise<void> {
  const { data: news } = await supabase
    .from("news")
    .select("images")
    .eq("id", id)
    .single();

  if (news?.images) {
    let images: ImageItem[] = [];
    try {
      images =
        typeof news.images === "string" ? JSON.parse(news.images) : news.images;
    } catch {
      // ignore parse errors
    }
    for (const img of images) {
      const path = extractStoragePath(img.url);
      if (path) {
        await supabase.storage.from("images").remove([path]);
      }
    }
  }

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}

/** Extract storage path from a Supabase public URL */
function extractStoragePath(url: string): string | null {
  const marker = "/storage/v1/object/public/images/";
  const markerIndex = url.indexOf(marker);
  if (markerIndex === -1) return null;
  return url.substring(markerIndex + marker.length);
}

// ----------------------------------------------------
// 2. Leadership
// ----------------------------------------------------
export interface LeadershipItem {
  id?: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  roleUz: string;
  roleRu: string;
  roleEn: string;
  phone: string;
  email: string;
  initials: string;
  color: string;
  photoUrl?: string;
  orderIndex: number;
}

export async function getLeadership(): Promise<LeadershipItem[]> {
  const { data, error } = await supabase
    .from("leadership")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveLeadership(
  id: string,
  data: Omit<LeadershipItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("leadership")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteLeadership(id: string): Promise<void> {
  const { error } = await supabase.from("leadership").delete().eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------
// 3. Teachers
// ----------------------------------------------------
export interface TeacherItem {
  id?: string;
  fullNameUz: string;
  fullNameRu: string;
  fullNameEn: string;
  subjectUz: string;
  subjectRu: string;
  subjectEn: string;
  photoUrl?: string;
  orderIndex: number;
}

export async function getTeachers(): Promise<TeacherItem[]> {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveTeacher(
  id: string,
  data: Omit<TeacherItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("teachers")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteTeacher(id: string): Promise<void> {
  const { error } = await supabase.from("teachers").delete().eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------
// 5. Achievements
// ----------------------------------------------------
export interface AchievementItem {
  id?: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descUz: string;
  descRu: string;
  descEn: string;
  imageUrl?: string;
  year: string;
  color: string;
  category?: string;
  orderIndex: number;
}

export async function getAchievements(): Promise<AchievementItem[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveAchievement(
  id: string,
  data: Omit<AchievementItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("achievements")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteAchievement(id: string): Promise<void> {
  const { error } = await supabase.from("achievements").delete().eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------
// 6. Admission Rules
// ----------------------------------------------------
export interface AdmissionRuleItem {
  id?: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  contentUz: string;
  contentRu: string;
  contentEn: string;
  orderIndex: number;
}

export async function getAdmissionRules(): Promise<AdmissionRuleItem[]> {
  const { data, error } = await supabase
    .from("admission_rules")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveAdmissionRule(
  id: string,
  data: Omit<AdmissionRuleItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("admission_rules")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteAdmissionRule(id: string): Promise<void> {
  const { error } = await supabase
    .from("admission_rules")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------
// 7. Stats
// ----------------------------------------------------
export interface StatItem {
  id?: string;
  key: string;
  value: number;
  suffix: string;
  labelUz: string;
  labelRu: string;
  labelEn: string;
  color: string;
}

export async function getStats(): Promise<StatItem[]> {
  const { data, error } = await supabase.from("stats").select("*");
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveStat(
  id: string,
  data: Omit<StatItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("stats")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

// ----------------------------------------------------
// 8. Gallery
// ----------------------------------------------------
export interface GalleryItem {
  id?: string;
  imageUrl: string;
  captionUz: string;
  captionRu: string;
  captionEn: string;
  category: string;
  createdAt: number;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveGallery(
  id: string,
  data: Omit<GalleryItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("gallery")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteGallery(id: string): Promise<void> {
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------
// 9. Hero Slides
// ----------------------------------------------------
export interface HeroSlideItem {
  id?: string;
  imageUrl: string;
  orderIndex: number;
  isActive: boolean;
}

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });
  if (error) throw error;

  // Fallback: if no active slides, return all
  if (!data || data.length === 0) {
    const { data: all } = await supabase
      .from("hero_slides")
      .select("*")
      .order("order_index", { ascending: true });
    return (all || []).map(mapRow);
  }
  return data.map(mapRow);
}

export async function getAllHeroSlides(): Promise<HeroSlideItem[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function saveHeroSlide(
  id: string,
  data: Omit<HeroSlideItem, "id">,
): Promise<void> {
  const row = toRow({ id, ...data });
  const { error } = await supabase
    .from("hero_slides")
    .upsert(row, { onConflict: "id" });
  if (error) throw error;
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------
// Helpers: camelCase ↔ snake_case mapping
// ----------------------------------------------------

// Convert camelCase JS object → snake_case for Supabase
function toRow(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    // Special case: nested tag object stored as JSONB
    if (k === "tag" && typeof v === "object" && v !== null) {
      out["tag"] = v;
      continue;
    }
    out[camelToSnake(k)] = v;
  }
  return out;
}

// Convert snake_case Supabase row → camelCase JS object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow<T = any>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[snakeToCamel(k)] = v;
  }
  return out as T;
}

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}
