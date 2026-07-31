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
  images JSONB NOT NULL DEFAULT '[]',
  file_url TEXT DEFAULT '',
  file_name TEXT DEFAULT '',
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

-- 3. Departments (Kafedralar)
CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name_uz TEXT NOT NULL DEFAULT '',
  name_ru TEXT NOT NULL DEFAULT '',
  name_en TEXT NOT NULL DEFAULT '',
  head_teacher_id TEXT DEFAULT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Teachers (O'qituvchilar)
CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name_uz TEXT NOT NULL DEFAULT '',
  full_name_ru TEXT NOT NULL DEFAULT '',
  full_name_en TEXT NOT NULL DEFAULT '',
  subject_uz TEXT NOT NULL DEFAULT '',
  subject_ru TEXT NOT NULL DEFAULT '',
  subject_en TEXT NOT NULL DEFAULT '',
  info_uz TEXT NOT NULL DEFAULT '',
  info_ru TEXT NOT NULL DEFAULT '',
  info_en TEXT NOT NULL DEFAULT '',
  certificates_uz TEXT NOT NULL DEFAULT '',
  certificates_ru TEXT NOT NULL DEFAULT '',
  certificates_en TEXT NOT NULL DEFAULT '',
  photo_url TEXT DEFAULT '',
  department_id TEXT DEFAULT NULL,
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 5. Facilities (Moddiy-texnik baza)
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

-- 6. Achievements (Yutuqlar)
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

-- 7. Admission Rules (Kirish qoidalari)
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

-- 8. Stats (Statistika raqamlari)
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

-- 9. Gallery (Galereya)
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  image_url TEXT NOT NULL DEFAULT '',
  caption_uz TEXT NOT NULL DEFAULT '',
  caption_ru TEXT NOT NULL DEFAULT '',
  caption_en TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Tadbirlar',
  created_at BIGINT NOT NULL DEFAULT 0
);

-- 10. Hero Slides (Bosh sahifa slaydlari)
CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  image_url TEXT NOT NULL DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  title_uz TEXT NOT NULL DEFAULT '',
  title_ru TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  desc_uz TEXT NOT NULL DEFAULT '',
  desc_ru TEXT NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL DEFAULT ''
);

-- 11. Site Settings (Sayt sozlamalari)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'site',
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_settings (id, maintenance_mode)
VALUES ('site', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Row Level Security (RLS) — Hamma o'qishi mumkin, faqat auth'd users yozishi mumkin
-- ============================================

-- Enable RLS for all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access (website visitors can see all data)
CREATE POLICY "Public read" ON news FOR SELECT USING (true);
CREATE POLICY "Public read" ON leadership FOR SELECT USING (true);
CREATE POLICY "Public read" ON teachers FOR SELECT USING (true);
CREATE POLICY "Public read" ON facilities FOR SELECT USING (true);
CREATE POLICY "Public read" ON departments FOR SELECT USING (true);
CREATE POLICY "Public read" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read" ON admission_rules FOR SELECT USING (true);
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);

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

CREATE POLICY "Auth insert" ON departments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON departments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON departments FOR DELETE USING (auth.role() = 'authenticated');

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

CREATE POLICY "Auth insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

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

-- Documents storage bucket (news PDF biriktirmalari uchun)
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public document read" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Auth document upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Auth document update" ON storage.objects FOR UPDATE USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Auth document delete" ON storage.objects FOR DELETE USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
