# 🔍 Sayt audit — Sadoo talablari bo'yicha tekshiruv

Quyida website egasi (Sadoo) aytgan har bir talab va hozirgi holat keltirilgan.

---

## ✅ Bajarilgan talablar

| # | Talab | Holat | Izoh |
|---|-------|-------|------|
| 1 | **Rahbariyat** yangilanishi kerak (dinamik) | ✅ Bajarilgan | `leadership` Supabase jadvalidan olinadi, dashboard orqali boshqariladi |
| 2 | **Pedagog xodimlar** yangilanishi kerak | ✅ Bajarilgan | `teachers` Supabase jadvalidan olinadi, dashboard orqali boshqariladi |
| 3 | **Moddiy-texnika baza** — rasm qo'shish | ✅ Bajarilgan | `gallery` Supabase jadvalidan olinadi, dashboardda **Gallery** bo'limi mavjud |
| 4 | **Yo'nalishlar** — o'zgarmasin (statik) | ✅ Bajarilgan | 4 ta yo'nalish hardcoded holda [page.tsx](file:///c:/dev/altuit/src/app/page.tsx#L189-L194) da turadi |
| 5 | **Kirish qoidalari** yangilanishi kerak | ✅ Bajarilgan | `admission_rules` Supabase jadvalidan olinadi, dashboard orqali boshqariladi |
| 6 | **Hujjatlar va muddatlar** — statik qolsin | ✅ Bajarilgan | i18n translationlarda hardcoded turadi — [i18n.ts](file:///c:/dev/altuit/src/lib/i18n.ts#L82-L95) |
| 7 | **Ko'p beriladigan savollar** — statik qolsin | ✅ Bajarilgan | i18n translationlarda hardcoded turadi — [i18n.ts](file:///c:/dev/altuit/src/lib/i18n.ts#L98-L124) |
| 8 | **Yangiliklar** = `/news` bo'lishi | ✅ Bajarilgan | `/news` route mavjud, Supabasedan dinamik olinadi |
| 9 | **Bog'lanish** sahifasida litsey ma'lumotlari | ✅ Bajarilgan | [contact/page.tsx](file:///c:/dev/altuit/src/app/contact/page.tsx) — manzil, telefon, email, ish vaqti, bo'limlar bor |
| 10 | **Navbarda Yutuqlar** (Ilmiy hayot → Yutuqlar) | ✅ Bajarilgan | Navbarda `nav_science: "Yutuqlar"` — [i18n.ts](file:///c:/dev/altuit/src/lib/i18n.ts#L17) |
| 11 | **Hero** — rasm slider (admindan boshqariladi) | ✅ Bajarilgan | `hero_slides` Supabase jadvalidan olinadi, dashboard orqali boshqariladi |
| 12 | **Admin dashboard** mavjud | ✅ Bajarilgan | `/altuit-dashboard` — barcha bo'limlar uchun CRUD |
| 13 | **Statistikalar** yangilanishi kerak | ✅ Bajarilgan | `stats` Supabase jadvalidan olinadi |

---

## ⚠️ Muammolar / To'liq bajarilmagan joylar

### 1. 🔴 "Ilmiy hayot" → "Yutuqlar" — sahifa sarlavhasida eski nom

> [!WARNING]
> [science/page.tsx:85-89](file:///c:/dev/altuit/src/app/science/page.tsx#L85-L89) da sahifa sarlavhasi hali **"Ilmiy hayot"** deb yozilgan:
> ```tsx
> {lang === "uz"
>   ? "Ilmiy hayot"
>   : lang === "ru"
>     ? "Научная жизнь"
>     : "Academic Life"}
> ```
> Sadoo "Ilmiy hayotni o'rniga **yutuqlar** qo'yib qo'y" dedi — **hamma joyda bir xil** bo'lishi kerak.

**Status**: ❌ Sahifa titlida `"Ilmiy hayot"` qolgan, `"Yutuqlar"` bo'lishi kerak.

---

### 2. 🟡 Hero slider — "yozuvlar kerak emas, faqat rasm"

> [!IMPORTANT]
> Sadoo aydi: "bitta rasm turadigan narsa kerak... boyagi mana bu yozuvlar, boshqalar kerak emas."
> 
> Hozir hero slider 2 xil ishlaydi:
> - Agar DB slideda `titleUz` bo'lsa → **matn va buttonlar** ko'rsatadi
> - Agar `titleUz` bo'lmasa → **faqat rasm** ko'rsatadi
> 
> Bu logika to'g'ri ishlaydi — **admindan slide qo'shganda title bo'sh qoldirilsa, faqat rasm ko'rinadi**.
> 
> Lekin fallback (DB bo'sh bo'lganda) da hali matnli slide bor: [page.tsx:127-141](file:///c:/dev/altuit/src/app/page.tsx#L127-L141)

**Status**: ⚠️ Asosan ishlaydi, lekin fallback slideda matn bor. Adminga rasm yuklanganda to'g'ri ishlaydi.

---

### 3. 🟡 `Litsey haqida qisqa ma'lumot` — qayerdan olinadi?

> Sadoo: "Litsey haqida qisqa ma'lumot — u yangilanmaydi" (o'zi to'g'irlab oldi).

Hozir **statik** — i18n'dan olinadi. Bu to'g'ri.

**Status**: ✅ OK

---

### 4. 🟡 Build warning: `middleware` deprecated

> [!NOTE]
> Build'da `⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.` xabari chiqadi.
> Bu Next.js 16 yangiligi — `middleware.ts` → `proxy` o'zgarishi kerak. Hozircha ishlaydi, lekin kelajakda o'zgartirish kerak.

---

### 5. 🟡 ESLint — 35 ta error, 25 ta warning

Asosiy muammolar:
- **Unescaped `'`** — dashboarddagi sahifalarda `'` belgisi escape qilinmagan (25+ joy)
- **`@typescript-eslint/no-explicit-any`** — 7 ta joyda `any` type ishlatilgan
- **Unused imports** — `Award`, `Building2`, `FlaskConical`, `ChevronLeft`, `ChevronRight`, `FaFacebookF`, `Image`, `Sliders`, `X` va boshqalar import qilingan lekin ishlatilmagan

**Status**: ⚠️ Sayt ishlaydi, lekin kod sifati uchun tozalash kerak.

---

## 📊 Umumiy natija

| Kategoriya | Holat |
|------------|-------|
| **Funksional talablar** | 12/13 ✅ (1 ta kichik muammo) |
| **Dinamik bo'limlar** (DB orqali) | ✅ Rahbariyat, Pedagoglar, Gallery, Yutuqlar, Yangiliklar, Kirish qoidalari, Hero, Statistikalar |
| **Statik bo'limlar** | ✅ Yo'nalishlar, Hujjatlar, FAQ |
| **Build** | ✅ Muvaffaqiyatli |
| **Lint** | ⚠️ 35 error (lekin barchasi faqat code style muammolari) |

---

## 🔧 Tuzatish kerak bo'lgan joylar (prioritet bo'yicha)

1. **🔴 Muhim**: [science/page.tsx](file:///c:/dev/altuit/src/app/science/page.tsx#L85-L89) — `"Ilmiy hayot"` → `"Yutuqlar"` (barcha tillarda)
2. **🟡 O'rtacha**: Fallback hero slidedagi matnni olib tashlash yoki bo'sh qoldirish
3. **🟡 O'rtacha**: ESLint errorlarni tozalash (unescaped entities, unused imports)
4. **🟢 Past**: Middleware → Proxy migrasiya (Next.js 16)
