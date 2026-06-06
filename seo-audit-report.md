# SEO Audit Hisoboti — TATU Akademik Litsey

## 1. Loyiha Strukturasi

Loyiha `src/app/` papkasida quyidagi page.tsx fayllarga ega:

### Asosiy sahifalar (ommaviy):

- `src/app/page.tsx` — Bosh sahifa (`/`)
- `src/app/about/page.tsx` — Litsey haqida (`/about`)
- `src/app/admission/page.tsx` — Qabul (`/admission`)
- `src/app/science/page.tsx` — Yutuqlar (`/science`)
- `src/app/news/page.tsx` — Yangiliklar ro'yxati (`/news`)
- `src/app/contact/page.tsx` — Aloqa (`/contact`)
- `src/app/login/page.tsx` — Admin login (`/login`)

### Admin panel sahifalari (dashboard, `/altuit-dashboard/*`):

- `src/app/altuit-dashboard/page.tsx` — Dashboard bosh sahifasi
- `src/app/altuit-dashboard/achievements/page.tsx` — Yutuqlarni boshqarish
- `src/app/altuit-dashboard/admission/page.tsx` — Kirish qoidalarini boshqarish
- `src/app/altuit-dashboard/gallery/page.tsx` — Galereyani boshqarish
- `src/app/altuit-dashboard/hero/page.tsx` — Hero slider boshqarish
- `src/app/altuit-dashboard/leadership/page.tsx` — Rahbariyat boshqarish
- `src/app/altuit-dashboard/news/page.tsx` — Yangiliklarni boshqarish
- `src/app/altuit-dashboard/teachers/page.tsx` — Pedagoglar boshqarish
- `src/app/altuit-dashboard/stats/page.tsx` — Statistikani boshqarish
- `src/app/altuit-dashboard/login/page.tsx` — Dashboard login sahifasi

### Layout fayllari:

- `src/app/layout.tsx` — Root layout (server komponent, metadata mavjud)
- `src/app/altuit-dashboard/layout.tsx` — Dashboard layout (client komponent, metadata yo'q)

### Boshqa muhim fayllar:

- `src/middleware.ts`
- `next.config.ts`
- `src/lib/db.ts`
- `src/lib/supabase.ts`
- `src/lib/i18n.ts`

---

## 2. Har bir Sahifa Tahlili

### /

- Fayl: `src/app/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase — `getHeroSlides()`, `getStats()`, `getNews()`)
- SEO holati: ❌ muammo bor
- Muammo: `"use client"` direktivasi ishlatilganligi sababli `metadata` yoki `generateMetadata` eksport qilib bo'lmaydi. Bosh sahifa — eng muhim SEO sahifa, lekin hech qanday page-level metadata yo'q. Layout.tsx'dagi default metadata ishlaydi, lekin sahifa uchun maxsus title va description yo'q.

### /about

- Fayl: `src/app/about/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase — `getLeadership()`, `getTeachers()`)
- SEO holati: ❌ muammo bor
- Muammo: `"use client"` direktivasi ishlatilgan. Metadata yo'q. Sahifa sarlavhasi layout'dan template orqali keladi (%s | TATU Akademik Litsey), lekin template ham to'liq formatda ishlamaydi chunki page'da metadata yo'q. Dinamik kontent (DB dan keladigan rahbariyat va o'qituvchilar) indeksatsiya uchun muhim, lekin metadata'da aks ettirilmagan.

### /admission

- Fayl: `src/app/admission/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase — `getAdmissionRules()`)
- SEO holati: ❌ muammo bor
- Muammo: `"use client"` direktivasi ishlatilgan. Qabul sahifasi — eng ko'p qidiriladigan sahifalardan biri. Metadata umuman yo'q. "Qabul 2025", "kirish imtihonlari" kabi muhim keyword'lar faqat layout.tsx dagi umumiy keyword'larga tayanadi.

### /science

- Fayl: `src/app/science/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase — `getAchievements()`, `getStats()`)
- SEO holati: ❌ muammo bor
- Muammo: `"use client"` direktivasi ishlatilgan. Yutuqlar sahifasi ham muhim (olimpiada g'oliblari, statistikalar). Metadata yo'q.

### /news

- Fayl: `src/app/news/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase — `getNews()`)
- SEO holati: ❌ muammo bor
- Muammo: `"use client"` direktivasi ishlatilgan. Yangiliklar sahifasi — tez-tez yangilanadigan kontent, Google News uchun muhim. Metadata yo'q. Bundan tashqari, `/news/[id]` dynamic route mavjud (page.tsx da `href={/news/${item.id}}` ishlatilgan), lekin `src/app/news/[id]/page.tsx` fayli TOPILMADI. Bu degani — yangilik detallar sahifasi mavjud emas yoki yana `"use client"` bo'lib `generateMetadata` yo'q.

### /news/[id]

- Fayl: `src/app/news/[id]/page.tsx` — ❌ TOPILMADI
- metadata: ❌ yo'q (fayl mavjud emas)
- generateMetadata: ❌ yo'q
- Data source: noma'lum (fayl yo'q)
- SEO holati: ❌ muammo bor
- Muammo: Yangiliklar ro'yxatida `/news/${item.id}` havolalar mavjud, lekin bu route uchun page.tsx fayli topilmadi. Bu 404 xatolikka olib keladi yoki route ishlamaydi.

### /contact

- Fayl: `src/app/contact/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: static (barcha ma'lumotlar kodda hardcoded)
- SEO holati: ⚠️ o'rtacha
- Muammo: `"use client"` direktivasi ishlatilgan. Metadata yo'q. Aloqa sahifasi SEO uchun muhim emas, lekin hali ham page title/description kerak (manzil, telefon — Local SEO uchun).

### /login

- Fayl: `src/app/login/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase Auth)
- SEO holati: ✅ yaxshi (admin sahifa, SEO kerak emas)
- Muammo: Admin login sahifasi. SEO uchun muhim emas. `robots` meta tag bilan `noindex` qilish tavsiya etiladi.

### /altuit-dashboard

- Fayl: `src/app/altuit-dashboard/page.tsx`
- metadata: ❌ yo'q
- generateMetadata: ❌ yo'q
- Data source: dynamic (Supabase)
- SEO holati: ✅ yaxshi (admin panel, SEO kerak emas)
- Muammo: Admin panel. `robots` meta tag bilan `noindex` qilish tavsiya etiladi. Middleware orqali himoyalangan.

### /altuit-dashboard/\*

(Barcha dashboard alt-sahifalari: achievements, admission, gallery, hero, leadership, news, teachers, stats, login)

- Fayl: `src/app/altuit-dashboard/*/page.tsx`
- metadata: ❌ yo'q (barchasida)
- generateMetadata: ❌ yo'q (barchasida)
- Data source: dynamic (Supabase)
- SEO holati: ✅ yaxshi (admin panel, SEO kerak emas)
- Muammo: Barchasi `"use client"`. Admin panel sahifalari. Middleware orqali himoyalangan.

---

## 3. Umumiy SEO Muammolar Ro'yxati

1. **Barcha ommaviy sahifalar `"use client"` direktivasi bilan yozilgan** — bu Next.js App Router'da `metadata` va `generateMetadata` eksport qilish imkonini yo'qotadi. Server komponentlarga o'tkazish kerak.

2. **Hech bir page.tsx faylida `metadata` yoki `generateMetadata` yo'q** — barcha sahifalar faqat layout.tsx'dagi default metadata'ga tayanadi. Bu har bir sahifa uchun unikal title, description, va Open Graph ma'lumotlari yo'qligini anglatadi.

3. **`/news/[id]` dynamic route uchun page.tsx mavjud emas** — yangilik detallar sahifasi yo'q. Bu jiddiy muammo: foydalanuvchilar yangilik linklariga bosganda 404 ko'radi.

4. **`robots.txt` fayli yo'q** — `public/` papkasida yo'q. Next.js avtomatik generatsiya qilmaydi, qo'lda yaratish kerak.

5. **`sitemap.xml` fayli yo'q** — dinamik kontent uchun `sitemap.ts` yoki `sitemap.xml` yaratilmagan. Qidiruv tizimlari sahifalarni topishi qiyin.

6. **`next.config.ts` da SEO bilan bog'liq sozlamalar yo'q** — `headers()` orqali xavfsizlik va caching sozlamalari qo'shilmagan. `i18n` defaultLocale sozlanmagan (layout.tsx da `lang="uz"` hardcoded).

7. **Open Graph va Twitter Card faqat layout.tsx da** — barcha sahifalar uchun bir xil OG rasm, title, description. Har bir sahifa uchun alohida Open Graph ma'lumotlari yo'q.

8. **JSON-LD Structured Data (schema.org) yo'q** — EducationalOrganization yoki School structured data qo'shilmagan. Bu Google'da boy natijalar (rich results) ko'rsatilishiga yordam beradi.

9. **Canonical URL'lar alternates bilan noto'g'ri sozlangan** — layout.tsx da `alternates.languages` ko'rsatilgan (`/uz`, `/ru`, `/en`), lekin loyihada aslida til route'lari yo'q. Barcha tillar bitta sahifada holat (state) orqali boshqariladi. Bu qidiruv tizimlarini chalg'itadi.

10. **Rasmlarda `alt` matni ko'pincha bo'sh yoki yetarli emas** — ko'p `<Image>` komponentlarida `alt=""` yozilgan. Bu accessibility va SEO uchun yomon.

11. **Dinamik sahifalarda `loading.tsx` va `error.tsx` yo'q** — bu foydalanuvchi tajribasi va Core Web Vitals uchun muhim.

12. **`middleware.ts` faqat admin route'larni himoya qiladi** — til yo'naltirish, www/non-www yo'naltirish, yoki trailing slash boshqaruvi yo'q.

---

## 4. Mavjud Metadata (layout.tsx dan)

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi",
    template: "%s | TATU Akademik Litsey",
  },
  description:
    "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — matematika, fizika, informatika va ingliz tili fanlarini chuqur o'rganishga ixtisoslashgan davlat ta'lim muassasasi...",
  keywords: [
    "TATU akademik litsey",
    "Muhammad al-Xorazmiy litsey",
    "tatual.uz",
    // ... (jami 12 ta keyword)
  ],
  authors: [{ name: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi" }],
  creator: "TATU Akademik Litsey",
  publisher: "TATU Akademik Litsey",
  metadataBase: new URL("https://tatual.uz"),
  alternates: {
    canonical: "/",
    languages: {
      "uz-UZ": "/uz", // ⚠️ bu route'lar mavjud emas
      "ru-RU": "/ru", // ⚠️ bu route'lar mavjud emas
      "en-US": "/en", // ⚠️ bu route'lar mavjud emas
    },
  },
  openGraph: {
    title: "Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi",
    description: "...",
    url: "https://tatual.uz",
    siteName: "TATU Akademik Litsey",
    locale: "uz_UZ",
    type: "website",
    // ⚠️ images yo'q — OG rasm ko'rsatilmaydi
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    // ⚠️ images yo'q
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
```

**Yaxshi tomonlari:**

- `metadataBase` to'g'ri sozlangan
- `title.template` orqali barcha sahifalar uchun title formati mavjud
- `keywords` boy va o'zbek tilida
- `robots` index/follow sozlangan

**Kamchiliklari:**

- Open Graph va Twitter uchun `images` maydoni to'ldirilmagan
- `alternates.languages` mavjud bo'lmagan route'larga ishora qiladi
- Har bir sahifa uchun alohida metadata yo'q (barchasi `"use client"` bo'lgani uchun)

---

## 5. Muhim Fayllar Holati

| Fayl                               | Holati       | Izoh                                                                                                                    |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **robots.txt**                     | ❌ Yo'q      | `public/robots.txt` fayli yo'q. Next.js da `app/robots.ts` orqali generatsiya qilish kerak                              |
| **sitemap.xml**                    | ❌ Yo'q      | `app/sitemap.ts` orqali dinamik sitemap generatsiya qilish kerak                                                        |
| **middleware.ts**                  | ✅ Bor       | Faqat admin route himoya va `/admin` redirect uchun. SEO uchun muhim yo'naltirishlar (www→non-www, trailing slash) yo'q |
| **next.config.js SEO sozlamalari** | ❌ Yo'q      | `headers()`, `i18n`, yoki SEO bilan bog'liq sozlamalar mavjud emas                                                      |
| **not-found.tsx**                  | ❌ Topilmadi | Maxsus 404 sahifasi yo'q                                                                                                |
| **loading.tsx**                    | ❌ Topilmadi | Root loading holati yo'q                                                                                                |

---

## 6. Xulosa

- **Jami sahifalar soni:** 18 ta (7 ta ommaviy + 9 ta dashboard admin + 1 ta admin login + root layout)
- **SEO to'liq sozlangan:** 0 ta
- **SEO qisman sozlangan:** 1 ta (root layout — faqat default metadata)
- **SEO umuman yo'q:** 17 ta (barcha page.tsx fayllar)

### Asosiy tavsiyalar:

1. **Eng muhim:** Barcha ommaviy sahifalarni `"use client"` dan Server Komponentlarga o'tkazish. Metadata uchun alohida `generateMetadata()` yoki `metadata` eksport qilish.

2. **Darhol qilish kerak:** `robots.txt` va `sitemap.xml` yaratish (Next.js da `app/robots.ts` va `app/sitemap.ts` fayllar orqali).

3. **Tez orada:** Har bir sahifa uchun alohida metadata (title, description, openGraph, keywords) yozish.

4. **Qo'shimcha:** JSON-LD Structured Data (`EducationalOrganization` sxemasi) qo'shish.

5. **Xatolik:** `/news/[id]/page.tsx` faylini yaratish (yoki mavjud bo'lsa, `generateMetadata` bilan Server Komponent qilish).

6. **Ogohlantirish:** `alternates.languages` noto'g'ri sozlangan — mavjud bo'lmagan `/uz`, `/ru`, `/en` route'lariga ishora qiladi. Bu qidiruv tizimlarini chalg'itadi.
