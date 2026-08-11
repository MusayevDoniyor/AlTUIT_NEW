-- ============================================
-- SUPABASE SECURITY HARDENING — MAVJUD BAZAGA ISHLATISH UCHUN
-- ============================================
-- Bu fayl allaqachon o'rnatilgan Supabase bazangizni himoyalaydi:
-- hozirgacha HAR QANDAY ro'yxatdan o'tgan foydalanuvchi yozishi mumkin edi
-- (auth.role() = 'authenticated'). Endi faqat admin_users jadvalidagi email
-- yoki user_metadata.role='admin' bo'lgan foydalanuvchi yozishi mumkin.
--
-- ISHLATISH: Supabase Dashboard -> SQL Editor -> bu faylni qo'ying -> Run.
-- So'ng admin emailingizni qo'shing (quyida ko'rsatilgan).

-- 1. Admin email allowlist jadvali (funksiyadan OLDIN yaratilishi kerak,
--    chunki PostgreSQL funksiya yaratishda jadval mavjudligini tekshiradi)
CREATE TABLE IF NOT EXISTS public.admin_users (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ⚠️ MUHIM: O'ZINGIZNING ADMIN EMAILINGIZNI SHU YERGA YOZING, keyin Run qiling:
INSERT INTO public.admin_users (email)
VALUES ('admin@tatual.uz')
ON CONFLICT (email) DO NOTHING;

-- 2. Admin tekshiruv funksiyasi
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin'
      OR EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE email = auth.jwt() ->> 'email'
      );
$$;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin read" ON public.admin_users;
DROP POLICY IF EXISTS "Admin insert" ON public.admin_users;
DROP POLICY IF EXISTS "Admin update" ON public.admin_users;
DROP POLICY IF EXISTS "Admin delete" ON public.admin_users;
CREATE POLICY "Admin read" ON public.admin_users FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin insert" ON public.admin_users FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update" ON public.admin_users FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete" ON public.admin_users FOR DELETE USING (public.is_admin());

-- 3. Barcha jadvallarda eski (xavfli) yozish policy-larini almashtirish
-- (Har bir jadval: "Auth insert/update/delete" -> faqat admin)
-- Faqat MAVJUD jadvallarga ishlaydi — mavjud bo'lmagan jadval xato bermaydi.
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'news','leadership','teachers','departments','facilities',
    'achievements','admission_rules','stats','gallery','hero_slides',
    'site_settings'
  ]
  LOOP
    IF to_regclass('public.' || tbl) IS NOT NULL THEN
      EXECUTE format('DROP POLICY IF EXISTS "Auth insert" ON %I', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "Auth update" ON %I', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "Auth delete" ON %I', tbl);
      EXECUTE format('CREATE POLICY "Auth insert" ON %I FOR INSERT WITH CHECK (public.is_admin())', tbl);
      EXECUTE format('CREATE POLICY "Auth update" ON %I FOR UPDATE USING (public.is_admin())', tbl);
      EXECUTE format('CREATE POLICY "Auth delete" ON %I FOR DELETE USING (public.is_admin())', tbl);
    END IF;
  END LOOP;
END $$;

-- 4. Storage yuklash/o'chirish ham faqat adminlarga
DROP POLICY IF EXISTS "Auth image upload" ON storage.objects;
DROP POLICY IF EXISTS "Auth image update" ON storage.objects;
DROP POLICY IF EXISTS "Auth image delete" ON storage.objects;
CREATE POLICY "Auth image upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND public.is_admin());
CREATE POLICY "Auth image update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND public.is_admin());
CREATE POLICY "Auth image delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND public.is_admin());

DROP POLICY IF EXISTS "Auth document upload" ON storage.objects;
DROP POLICY IF EXISTS "Auth document update" ON storage.objects;
DROP POLICY IF EXISTS "Auth document delete" ON storage.objects;
CREATE POLICY "Auth document upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND public.is_admin());
CREATE POLICY "Auth document update" ON storage.objects FOR UPDATE USING (bucket_id = 'documents' AND public.is_admin());
CREATE POLICY "Auth document delete" ON storage.objects FOR DELETE USING (bucket_id = 'documents' AND public.is_admin());

-- ============================================
-- YAKUNLANGAN. Endi bajarilgan ishlar:
-- 1. is_admin() funksiyasi yaratildi
-- 2. admin_users jadvali yaratildi + emailingiz qo'shildi
-- 3. Barcha jadvallarda faqat admin yozishi mumkin
-- 4. Storage'da faqat admin yuklashi/o'chirishi mumkin
--
-- Tavsiya: Supabase Dashboard -> Authentication -> Providers ->
-- "Enable Sign ups" ni O'CHIRING (faqat admin qo'lda user yaratadi).
-- ============================================
