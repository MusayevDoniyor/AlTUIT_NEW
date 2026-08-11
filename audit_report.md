# 📋 To'liq Audit Hisoboti — TATU Akademik Litsey Sayti (altuit)

| | |
|---|---|
| **Sana** | 2026-08-11 |
| **Filial** | `main` (93ddc20) |
| **Texnologiya** | Next.js 16 (App Router), React 19, Tailwind 4, Supabase |
| **Build** | ✅ Muvaffaqiyatli (25 route, TypeScript xatosiz) |
| **Lint** | ⚠️ 88 muammo (40 error, 48 warning) |

---

## 1. Xulosa (TL;DR)

Sayt **ishlayapti** va asosiy talablar bajarilgan: 8 ta dinamik bo'lim (yangiliklar, rahbariyat, pedagoglar, kafedralar, yutuqlar, galereya, hero slider, statistika), to'liq admin panel (CRUD), 3 tilli interfeys, SEO asoslari.

Lekin **3 ta jiddiy security muammosi** va **bir qancha funksional bug'lar** bor. Eng muhimi — **admin huquqlari hech qanday rol bilan himoyalanmagan**: Supabase'da public signup yoqilgan bo'lsa, istalgan ro'yxatdan o'tgan foydalanuvchi saytni to'liq boshqara oladi. Bu birinchi navbatda tuzatilishi kerak.

Early-stage startup sifatida eng katta bo'shliq — **engagement funksiyalari yo'q**: share tugmalari, Telegram/Instagram integratsiyasi, analytics, qabul countdown. Quyida bosqichma-bosqich reja berilgan.

---

## 2. Nima ishlayapti ✅

| Bo'lim | Holat | Izoh |
|---|---|---|
| Yangiliklar (`/news`, `/news/[id]`) | ✅ | DB'dan dinamik, draft/publish tizimi, rasm galereyasi, PDF biriktirish, XSS himoyasi (DOMPurify) |
| Rahbariyat / Pedagoglar / Kafedralar | ✅ | Supabase + admin CRUD + drag&drop tartiblash |
| Yutuqlar (`/science`) | ✅ | DB'dan dinamik ("Ilmiy hayot" eski nomi allaqachon tuzatilgan) |
| Galereya (`/gallery`) | ✅ | DB'dan dinamik, kategoriyalar |
| Hero slider | ✅ | Admin orqali rasm + matn boshqariladi |
| Statistika (counterlar) | ✅ | DB'dan dinamik |
| Qabul qoidalari | ✅ | DB'dan dinamik |
| Kirish formasi | ✅ | Telegram bot orqali xabar yuboradi (multi-recipient) |
| Admin panel `/altuit-dashboard` | ✅ | 10 ta CRUD bo'limi, auth himoyasi, toast, noindex |
| SEO | ✅ | Sitemap, robots, JSON-LD, OG metadata, custom 404 |
| Xavfsizlik asoslari | ✅ | `.env` git'ga qo'shilmagan, RLS yoqilgan, `/admin` decoy (404) |

---

## 3. Kritik xatoliklar 🔴 (darhol tuzatish kerak)

### 3.1. Admin rol tekshiruvi umuman yo'q — eng jiddiy muammo
- **RLS**: barcha yozish huquqi `auth.role() = 'authenticated'` bilan berilgan — ya'ni **har qanday tizimga kirgan user** (rolidan qat'iy nazar) hamma jadvalni o'chira/yoza oladi. [supabase-schema.sql:198-240]
- **Middleware**: faqat "user bormi?" deb tekshiradi, rolni tekshirmaydi. [src/middleware.ts:36-45]
- **Dashboard layout**: ham faqat sessiya mavjudligini tekshiradi. [src/app/altuit-dashboard/layout.tsx:64-92]
- **Natija**: Supabase Authentication'da "Email signup" yoqilgan bo'lsa — har kim o'zi ro'yxatdan o'tib, admin bo'lib oladi va butun kontentni boshqaradi.

**Yechim (ikkalasidan biri):**
1. Supabase dashboard'da public signup-ni **o'chirish** (faqat admin qo'lda user yaratadi); YOKI
2. `user_metadata.role = 'admin'` yoki `admin_roles` jadvali qo'shib, RLS policy + middleware'da rolni tekshirish.

### 3.2. Contact API — ichki ma'lumot oshkor bo'ladi
- Telegram chat ID'lari xato xabarida mijozga verbatim qaytadi: `Chat ${chatId} ga xabar yuborib bo'lmadi`. [src/app/api/contact/route.ts:102, 112-117]
- **Yechim**: foydalanuvchiga har doim generic xabar ("Xabar yuborishda xatolik yuz berdi") qaytarish, tafsilotni faqat server log'iga yozish.

### 3.3. Spam himoyasi yo'q
- Contact formada honeypot, rate-limit yoki captcha yo'q. [src/app/api/contact/route.ts:6-120]
- Bot soatiga yuzlab xabar yuborib, Telegram'ni spam qilishi mumkin.
- **Yechim**: honeypot maydoni + IP bazli rate-limit (masalan, Vercel Edge/Upstash) + telefon formatini tekshirish.

---

## 4. Muhim bug'lar 🟠 (ishlayapti, lekin noto'g'ri)

| # | Muammo | Joyi |
|---|---|---|
| 1 | **Til almashtirishda FOUC (flash)**: sahifa avval "uz" bo'lib render bo'ladi, keyin ru/en ga o'tadi. `setState` effect ichida chaqirilgan (lint error ham shu). | src/lib/useLang.ts:14 |
| 2 | **Race condition**: `useAsyncData` eski javob yangisini ustidan yozishi mumkin; `error` qiymati hech qayerda o'qilmaydi — xatoliklar "bo'sh state" bo'lib ko'rinadi. | src/lib/useAsyncData.ts:11-30, src/app/HomeClient.tsx:217-229 |
| 3 | **Carousel tiqilishi**: 1200ms lock auto-advance tick'larini yutib yuboradi — slider bir necha soniya to'xtab qolishi mumkin. | src/app/HomeClient.tsx:260-289 |
| 4 | **Maintenance default noto'g'ri**: DB'da qator bo'lmasa `maintenanceMode: true` qaytadi — yangi o'rnatilganda sayt "texnik ishlar" banneri bilan chiqadi. | src/lib/db.ts:541-543 |
| 5 | **og-image.jpg yo'q**: metadata'da referensiya bor, lekin `public/` da faqat `image.png` va `logo.png`. Telegram/Facebook'da bo'lishishda OG card buzilgan. | src/app/layout.tsx:53,65 |
| 6 | **Manzil 3 joyda duplicate va turlicha**: "112-uy" vs "112", telefon 2 joyda. | src/lib/config.ts:8-10, src/lib/i18n.ts:223, src/app/contact/ContactClient.tsx:70-100 |
| 7 | **Footer'da hardcode**: avtobus raqamlari (19,38,50,63,115), "tatual.uz" matni — i18n'dan emas. | src/components/Footer.tsx |
| 8 | **Xarita so'rovi hardcode** (faqat o'zbekcha manzil, hamma tilda) | src/app/contact/ContactClient.tsx:276-315 |
| 9 | **Telefon maydoni** `type="text"`, faqat uzunlik tekshiriladi — format validatsiya yo'q | src/app/contact/ContactClient.tsx:450-458 |
| 10 | **`<html lang="uz">` statik**, ru/en sahifalar uchun `hreflang` yo'q — SEO tillar bo'yicha to'liq emas | src/app/layout.tsx:85 |

---

## 5. Schema / Migratsiya muammolari 🟡

| # | Muammo | Izoh |
|---|---|---|
| 1 | `site_settings` jadvali **kodda ishlatilmaydi** — maintenance `stats` jadvalining `maintenance_mode` kalitida saqlanadi | supabase-schema.sql:157-165 vs src/lib/db.ts:528-560 |
| 2 | `facilities` jadvali **o'lik** — schema'da bor, admin panel va kod yo'q | supabase-schema.sql:78-89 |
| 3 | `supabase-migration-news-images.sql` **eskirgan** — `images` ustuni schema'da allaqachon bor, migration keraksiz | supabase-migration-news-images.sql:1-14 |
| 4 | `key` ustuni `stats` jadvalida **unique emas** — bir xil kalit 2 marta qo'shilsa xato yuzaga kelishi mumkin | supabase-schema.sql:120-129 |

---

## 6. Kod sifati 🟡

- **Lint: 88 muammo (40 error, 48 warning)**:
  - ~35 ta unescaped `'` (react/no-unescaped-entities) — apostoflar `&apos;` bilan yozilishi kerak
  - 7+ ta unused import/variable (`useRef`, `Editor`, `lang`, `error` va b.)
  - `set-state-in-effect` (src/lib/useLang.ts:14)
  - React Compiler memoization muammosi (src/components/admin/NewsImageUpload.tsx:321)
- **Next.js 16**: `middleware.ts` konvensiyasi `proxy` ga o'zgartirilgan — kelajakda `src/proxy.ts` deb qayta nomlash tavsiya (hozir ishlayapti).
- Admin panel faqat o'zbekcha — rus tilida ishlaydigan xodimlar uchun qiyin.

---

## 7. Engagement rejasi — early stage startup uchun 🚀

### Hafta 1 — eng yuqori effekt (katta ish talab qilmaydi)

| # | Funksiya | Nega muhim |
|---|---|---|
| 1 | **News'ga share tugmalari** (Telegram, Facebook, X, "link nusxalash") | O'zbekistonda asosiy tarqatish kanali Telegram — bepul word-of-mouth |
| 2 | **Telegram kanaliga obuna banneri** (footer/navbar: `t.me/tatu_akademik_litseyi`) | Maqsadli auditoriya (9-sinf ota-onalari) Telegram'da |
| 3 | **Instagram feed embed** (`@tatu_lyceum`) | Talabgorlar va ota-onalar Instagram'da — saytga tirbandlik olib kiradi |

### Hafta 2 — o'rtacha ish

| # | Funksiya | Nega muhim |
|---|---|---|
| 4 | **Analytics** (GA4 yoki Vercel Analytics) | Qaysi sahifa ishlayotganini bilmasdan optimallashtirib bo'lmaydi |
| 5 | **Qabul countdown** — "hujjat topshirishgacha N kun" + `my.edu.uz` CTA | Urgency — konversiyani oshiradi |
| 6 | **Related news + prev/next** | Sahifa/visit soni oshadi |
| 7 | **News search + tag filter** | Mavjud yangiliklardan foydalanish osonlashadi |

### Hafta 3+ — kengaytirish

| # | Funksiya | Nega muhim |
|---|---|---|
| 8 | Newsletter / qabul xabarnomasi (email yoki Telegram) | Qabul mavsumida qaytib keladigan auditoriya |
| 9 | View counter + o'qish vaqti | Ijtimoiy isbot (social proof) |
| 10 | Testimonials / bitiruvchilar bo'limi ("bitiruvchilarimiz qayerga kirdi") | Abituriyentlar uchun eng kuchli isbot |
| 11 | Galereyada lightbox + YouTube video embed (litsey virtual turi) | Vizual taassurot |
| 12 | QR code (bosma reklama/broshyuralar uchun) | Offline → online o'tish |
| 13 | RSS feed | Yangiliklar avtomatik tarqaladi |
| 14 | Poll ("Qaysi yo'nalish sizni qiziqtiradi?") | Engagement + ma'lumot to'plash |

---

## 8. Prioritized roadmap ✅→🔴→🟠→🚀

**1-bosqich — Security (bugun):**
- [ ] Supabase signup-ni o'chirish yoki `admin_roles` jadvali + RLS/middleware rol tekshiruvi
- [ ] Contact API'da generic xato xabarlari
- [ ] Honeypot + rate-limit + telefon validatsiya

**2-bosqich — Tuzatishlar (shu hafta):**
- [ ] og-image.jpg yaratish (1200x630) yoki `image.png` dan foydalanish
- [ ] useLang FOUC tuzatish (lazy initial state)
- [ ] useAsyncData race guard + error UI
- [ ] Carousel lock muammosi
- [ ] Maintenance default `false`
- [ ] Lint 88 muammoni tozalash
- [ ] Manzil/telefonni bitta manbaga birlashtirish (config.ts)

**3-bosqich — Engagement (keyingi):**
- [ ] Share tugmalari → Telegram banner → Instagram feed → Analytics → Countdown → Related news → Search

**4-bosqich — Kengaytirish:**
- [ ] Newsletter, testimonial, lightbox+video, QR, RSS, poll
- [ ] `proxy.ts` migratsiya, `site_settings` jadvali sinxronlash, `facilities` qo'shish yoki o'chirish

---

## 9. Tekshiruv natijalari

```bash
npm run build   # ✅ Compiled successfully — 25 route, TypeScript OK
npm run lint    # ⚠️ 88 problems (40 errors, 48 warnings)
git ls-files    # ✅ .env git'ga qo'shilmagan (secret xavfsiz)
```

**Manba**: `C:\dev\altuit` (branch `main`), kod qat'iy referensiyalar bilan tekshirildi.
