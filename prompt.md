PageSpeed audit natijalariga asoslanib quyidagilarni tuzat.
Bir vaqtda bitta o'zgartir, har biridan keyin npm run build tekshir.

1. RENDER BLOCKING — layout.tsx:
   - <link> orqali Google Fonts import ni olib tashla
   - next/font/google ishlatilayotganini tekshir (allaqachon bor)
   - head da faqat bitta font yuklanayotganini tekshir

2. RASM OPTIMIZATSIYA:
   - Barcha <img> teglarni next/image ga o'tkazish
   - Hero slider rasmlari: priority={true} qo'sh (LCP uchun)
   - Boshqa rasmlar: loading="lazy" (default)

3. ACCESSIBILITY — buttons:
   - Ikonali barcha tugmalarga aria-label qo'sh
   - Ikonali linklarga aria-label qo'sh

4. next.config.ts ga qo'sh:
   const nextConfig = {
   experimental: {
   optimizePackageImports: ['lucide-react']
   },
   async headers() {
   return [
   {
   source: '/(._)',
   headers: [
   { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
   { key: 'X-Content-Type-Options', value: 'nosniff' },
   ]
   },
   {
   source: '/altuit-dashboard/(._)',
   headers: [{ key: 'X-Robots-Tag', value: 'noindex' }]
   }
   ]
   }
   }

Faqat shu 4 ta o'zgartirish. Boshqaga tegma.

Chunki hisobotlar shuni korsatayapti: Umumiy holat:
MobileDesktopPerformance🟡 76🟢 97Accessibility🟡 86🟡 82Best Practices🟢 96🟢 96SEO🟢 100🟢 100
