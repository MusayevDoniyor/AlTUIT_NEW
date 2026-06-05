-- ============================================
-- Al-TUIT Litsey — Supabase Database Schema
-- Supabase SQL Editor da ishga tushiring
-- ============================================

-- 1. News (Yangiliklar)
CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  date TEXT NOT NULL DEFAULT '',
  title_uz TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  body_uz TEXT NOT NULL DEFAULT '',
  body_ru TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  desc_uz TEXT NOT NULL DEFAULT '',
  desc_ru TEXT NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL DEFAULT '',
  tag JSONB NOT NULL DEFAULT '{"uz":"","ru":"","en":""}',
  color TEXT NOT NULL DEFAULT '#1a3a6e',
  image_url TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Leadership (Rahbariyat)
CREATE TABLE IF NOT EXISTS leadership (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name_uz TEXT NOT NULL DEFAULT '',
  name_ru TEXT NOT NULL DEFAULT '',
  name_en TEXT NOT NULL DEFAULT '',
  role_uz TEXT NOT NULL DEFAULT '',
  role_ru TEXT NOT NULL DEFAULT '',
  role_en TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  initials TEXT DEFAULT '',
  color TEXT NOT NULL DEFAULT '#1a3a6e',
  photo_url TEXT DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 3. Teachers (O'qituvchilar)
CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name_uz TEXT NOT NULL DEFAULT '',
  full_name_ru TEXT NOT NULL DEFAULT '',
  full_name_en TEXT NOT NULL DEFAULT '',
  subject_uz TEXT NOT NULL DEFAULT '',
  subject_ru TEXT NOT NULL DEFAULT '',
  subject_en TEXT NOT NULL DEFAULT '',
  photo_url TEXT DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 4. Facilities (Moddiy-texnik baza)
CREATE TABLE IF NOT EXISTS facilities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_uz TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  desc_uz TEXT NOT NULL DEFAULT '',
  desc_ru TEXT NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL DEFAULT '',
  image_url TEXT DEFAULT '',
  color TEXT NOT NULL DEFAULT '#c8a96e',
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 5. Achievements (Yutuqlar)
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_uz TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  desc_uz TEXT NOT NULL DEFAULT '',
  desc_ru TEXT NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL DEFAULT '',
  image_url TEXT DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#c8a96e',
  category TEXT DEFAULT 'Olimpiada',
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 6. Admission Rules (Kirish qoidalari)
CREATE TABLE IF NOT EXISTS admission_rules (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title_uz TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  content_uz TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 7. Stats (Statistika raqamlari)
CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT NOT NULL DEFAULT '',
  value INTEGER NOT NULL DEFAULT 0,
  suffix TEXT NOT NULL DEFAULT '',
  label_uz TEXT NOT NULL DEFAULT '',
  label_ru TEXT NOT NULL DEFAULT '',
  label_en TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#1a3a6e'
);

-- 8. Gallery (Galereya)
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  image_url TEXT NOT NULL DEFAULT '',
  caption_uz TEXT NOT NULL DEFAULT '',
  caption_ru TEXT NOT NULL DEFAULT '',
  caption_en TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Tadbirlar',
  created_at BIGINT NOT NULL DEFAULT 0
);

-- 9. Hero Slides (Bosh sahifa slaydlari)
CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  image_url TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================
-- Row Level Security (RLS) — Hamma o'qishi mumkin, faqat auth'd users yozishi mumkin
-- ============================================

-- Enable RLS for all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read access (website visitors can see all data)
CREATE POLICY "Public read" ON news FOR SELECT USING (true);
CREATE POLICY "Public read" ON leadership FOR SELECT USING (true);
CREATE POLICY "Public read" ON teachers FOR SELECT USING (true);
CREATE POLICY "Public read" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public read" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read" ON admission_rules FOR SELECT USING (true);
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read" ON hero_slides FOR SELECT USING (true);

-- Authenticated users can INSERT, UPDATE, DELETE
CREATE POLICY "Auth insert" ON news FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON news FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON news FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON leadership FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON leadership FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON leadership FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON teachers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON teachers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON teachers FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON facilities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON facilities FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON facilities FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON achievements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON achievements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON achievements FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON admission_rules FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON admission_rules FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON admission_rules FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON stats FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert" ON hero_slides FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON hero_slides FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON hero_slides FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- Storage bucket (rasmlar uchun)
-- ============================================
-- Supabase Dashboard → Storage → Create bucket "images" (Public)
-- Yoki SQL:
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can read, authenticated users can upload/delete
CREATE POLICY "Public image read" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth image upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth image update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth image delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
