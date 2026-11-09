"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { translations } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import {
  Target,
  Compass,
  BookOpen,
  Trophy,
  GraduationCap,
  Laptop,
  TrendingUp,
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Calendar,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function StrategyClient() {
  const [lang, setLang] = useLang();
  const t = translations[lang];

  const content = {
    uz: {
      badge: "1.2.5 va 1.3.5-mezonlar ijrosi",
      hero_title: "Strategik Rivojlanish Konsepsiyasi",
      hero_subtitle:
        "Muhammad al-Xorazmiy nomidagi TATU akademik litseyining 2024–2030 yillarga mo'ljallangan o'rta va uzoq muddatli strategik rivojlanish dasturi, maqsadli indikatorlari va monitoring mexanizmi.",
      btn_docs: "Rasmiy hujjatlar",
      btn_kpi: "Maqsadli ko'rsatkichlar",

      mission_title: "Missiyamiz",
      mission_desc:
        "Aniq fanlar (matematika, fizika, informatika) va chet tillarini chuqurlashtirilgan holda o'qitish orqali intellektual salohiyati yuqori, mustaqil fikrlaydigan, vatanparvar va global miqyosda raqobatbardosh yoshlarni shakllantirish.",

      vision_title: "Strategik maqsadimiz (Vision 2030)",
      vision_desc:
        "O'zbekistonning ilg'or IT-yo'nalishidagi akademik litseylari orasida barqaror yetakchi bo'lish, o'quvchilarning 98%+ qismini nufuzli milliy va xalqaro universitetlarga kirishini ta'minlash hamda xalqaro ta'lim andozalarini to'liq joriy etish.",

      values_title: "Asosiy tamoyillar",
      values_desc:
        "Akademik halollik, ochiqlik va shaffoflik, innovatsion ta'lim texnologiyalari, natijadorlikka yo'naltirilganlik va har bir o'quvchining shaxsiy iqtidorini ro'yobga chiqarish.",

      pillars_heading: "5 ta Ustuvor Strategik Yo'nalish",
      pillars_sub:
        "Litsey faoliyatining har bir jabhasini tizimli takomillashtirishga qaratilgan kompleks chora-tadbirlar.",

      pillar1_title: "1. O'quv jarayonini xalqaro andozalarga moslashtirish",
      pillar1_desc:
        "Matematika, fizika va dasturlash fanlari bo'yicha ilg'or xorijiy tajribalar (Cambridge, SAT) elementlarini integratsiya qilish. STEAM yondashuvi asosida amaliy va laboratoriya mashg'ulotlarini kengaytirish.",

      pillar2_title: "2. Iqtidorli yoshlar bilan tizimli ishlash va olimpiada harakati",
      pillar2_desc:
        "Xalqaro va Respublika fan olimpiadalariga individual tayyorgarlik tizimini yo'lga qo'yish. TATU professor-o'qituvchilari ishtirokida ilmiy to'garaklar va innovatsion loyihalar laboratoriyasini rivojlantirish.",

      pillar3_title: "3. Pedagogik kadrlarning ilmiy-kasbiy salohiyatini yuksaltirish",
      pillar3_desc:
        "Pedagoglarning 100% kamida B2/C1 yoki xalqaro til va fan sertifikatlariga ega bo'lishini ta'minlash. O'qituvchilarning ilmiy-tadqiqot faoliyatini qo'llab-quvvatlash va ilmiy darajali kadrlar ulushini 35% dan oshirish.",

      pillar4_title: "4. Raqamli ta'lim muhiti va zamonaviy IT-infratuzilma",
      pillar4_desc:
        "Litseyning to'liq elektron ta'lim va boshqaruv platformasi (LMS). TATU axborot-resurs markazi bilan uzviy integratsiya, yangi kompyuter laboratoriyalari, interaktiv panellar va yuqori tezlikdagi lokal tarmoq.",

      pillar5_title: "5. Xalqaro hamkorlik va bitiruvchilar raqobatbardoshligi",
      pillar5_desc:
        "Xorijiy nufuzli ta'lim markazlari bilan hamkorlik aloqalari. Bitiruvchilarni TATU va xalqaro top-500 universitetlarga kirishiga ko'maklashuvchi Karyera markazi (Career Guidance) faoliyatini kuchaytirish.",

      kpi_heading: "Maqsadli Ko'rsatkichlar (KPI Dinamikasi)",
      kpi_sub:
        "2024–2030 yillar oralig'ida litsey rivojlanishining asosiy miqdoriy va sifat indikatorlari.",
      th_metric: "Ko'rsatkich / Indikator nomi",
      th_base: "2024-yil (Hozir)",
      th_target26: "2026-yil",
      th_target28: "2028-yil",
      th_target30: "2030-yil (Maqsad)",

      kpi_row1: "Bitiruvchilarning OTMlarga kirish ko'rsatkichi",
      kpi_row2: "Milliy va xalqaro til sertifikatiga (IELTS, CEFR) ega o'quvchilar",
      kpi_row3: "Fan olimpiadalari (Respublika va xalqaro) sovrindorlari soni",
      kpi_row4: "Xalqaro/milliy toifali sertifikatga ega pedagoglar ulushi",
      kpi_row5: "Elektron ta'lim resurslari va raqamli qamrov darajasi",

      monitoring_heading: "Monitoring va Hisobdorlik Tizimi (1.3.5-mezon)",
      monitoring_p1:
        "Strategik rivojlanish rejasi ijrosi yuzasidan muntazam monitoring olib boriladi. Har bir o'quv yili yakuni bo'yicha erishilgan natijalar, maqsadli indikatorlar ijrosi Litsey Ilmiy-pedagogik kengashida atroflicha muhokama qilinadi.",
      monitoring_p2:
        "O'quv-tarbiyaviy, ilmiy-innovatsion hamda kadrlar salohiyati bo'yicha yillik hisobotlar va tahliliy ma'lumotlar jamoatchilik uchun ochiq holda litseyning rasmiy veb-saytida (tatual.uz) muntazam e'lon qilib boriladi.",

      docs_heading: "Rasmiy Me'yoriy Hujjatlar va Rejalar",
      docs_sub:
        "Litsey Kengashi tomonidan tasdiqlangan rasmiy strategik hujjatlar va amaldagi yo'l xaritalari.",
      doc1_title: "TATU Akademik Litseyining 2024–2030 yillarga mo'ljallangan Strategik Rivojlanish Konsepsiyasi",
      doc1_desc: "Muassasaning o'rta va uzoq muddatli rivojlanish strategiyasi, vazifalari va moliyalashtirish mexanizmlari to'g'risidagi asosiy hujjat.",
      doc2_title: "2024–2025 o'quv yilida strategik vazifalarni amalga oshirish bo'yicha 'Yo'l xaritasi'",
      doc2_desc: "O'quv-uslubiy, ilmiy va ma'naviy yo'nalishlar bo'yicha bosqichma-bosqich chora-tadbirlar rejasi va mas'ullar ro'yxati.",
      doc3_title: "Ta'lim sifatini ichki baholash va monitoring qilish to'g'risida Nizom",
      doc3_desc: "1.2.5 va 1.3.5 mezonlari talablari asosida ta'lim sifati monitoringini yuritish va shaffoflikni ta'minlash tartibi.",
      btn_download: "Hujjatni ko'rish (PDF)",
      doc_status: "Tasdiqlangan",
    },

    ru: {
      badge: "Исполнение критериев 1.2.5 и 1.3.5",
      hero_title: "Концепция Стратегического Развития",
      hero_subtitle:
        "Программа средне- и долгосрочного стратегического развития Академического лицея ТУИТ имени Мухаммада ал-Хоразмий на 2024–2030 годы, целевые индикаторы и механизм мониторинга.",
      btn_docs: "Официальные документы",
      btn_kpi: "Целевые показатели",

      mission_title: "Наша миссия",
      mission_desc:
        "Формирование высокоинтеллектуальной, самостоятельной и конкурентоспособной молодежи путем углубленного преподавания точных наук (математика, физика, информатика) и иностранных языков.",

      vision_title: "Стратегическая цель (Видение 2030)",
      vision_desc:
        "Обеспечение устойчивого лидерства среди ведущих академических лицеев сферы IT в Узбекистане, гарантированное поступление более 98% выпускников в престижные вузы и внедрение мировых образовательных стандартов.",

      values_title: "Ключевые принципы",
      values_desc:
        "Академическая честность, открытость и прозрачность, инновационные технологии обучения, нацеленность на результат и раскрытие индивидуального потенциала каждого лицеиста.",

      pillars_heading: "5 Приоритетных Стратегических Направлений",
      pillars_sub:
        "Комплекс мер по системному совершенствованию всех ключевых сфер деятельности лицея.",

      pillar1_title: "1. Модернизация учебного процесса по международным стандартам",
      pillar1_desc:
        "Интеграция передового зарубежного опыта (Cambridge, SAT) в преподавание точных наук. Расширение лабораторных и практических занятий на основе STEAM-подхода.",

      pillar2_title: "2. Системная работа с одаренной молодежью и олимпиадное движение",
      pillar2_desc:
        "Индивидуальная подготовка к республиканским и международным олимпиадам. Развитие научных кружков с участием профессоров и ученых ТУИТ.",

      pillar3_title: "3. Повышение научно-профессионального потенциала педагогов",
      pillar3_desc:
        "Обеспечение 100% охвата учителей международными языковыми и предметными сертификатами (IELTS, CEFR). Увеличение доли преподавателей с учеными степенями (PhD, DSc) до более чем 35%.",

      pillar4_title: "4. Цифровая образовательная среда и современная IT-инфраструктура",
      pillar4_desc:
        "Единая электронная платформа обучения (LMS). Прямая интеграция с ресурсами ТУИТ, новые компьютерные лаборатории, интерактивные панели и высокоскоростная сеть.",

      pillar5_title: "5. Международное партнерство и конкурентоспособность выпускников",
      pillar5_desc:
        "Сотрудничество с зарубежными лицеями и центрами. Усиление Центра профориентации (Career Guidance) для поступления выпускников в топ-500 университетов мира.",

      kpi_heading: "Целевые Показатели (Динамика KPI)",
      kpi_sub:
        "Ключевые количественные и качественные индикаторы развития лицея на период 2024–2030 годов.",
      th_metric: "Наименование индикатора / показателя",
      th_base: "2024 г. (Текущий)",
      th_target26: "2026 г.",
      th_target28: "2028 г.",
      th_target30: "2030 г. (Цель)",

      kpi_row1: "Доля выпускников, поступивших в высшие учебные заведения",
      kpi_row2: "Доля учащихся с международными сертификатами (IELTS, CEFR)",
      kpi_row3: "Количество призеров республиканских и международных олимпиад",
      kpi_row4: "Доля педагогов с международными и высшими категориями",
      kpi_row5: "Охват электронными ресурсами и цифровыми сервисами",

      monitoring_heading: "Система Мониторинга и Отчетности (Критерий 1.3.5)",
      monitoring_p1:
        "Регулярный мониторинг исполнения плана стратегического развития. По итогам каждого учебного года результаты выполнения индикаторов выносятся на детальное обсуждение Научно-педагогического совета лицея.",
      monitoring_p2:
        "Годовые отчеты об образовательной, научной и кадровой деятельности открыто публикуются на официальном сайте (tatual.uz) для обеспечения прозрачности перед общественностью.",

      docs_heading: "Официальные Нормативные Документы",
      docs_sub:
        "Утвержденные Советом лицея нормативные акты и актуальные дорожные карты развития.",
      doc1_title: "Концепция Стратегического Развития Академического Лицея ТУИТ на 2024–2030 годы",
      doc1_desc: "Основной документ о средне- и долгосрочной стратегии, приоритетах и финансировании развития лицея.",
      doc2_title: "«Дорожная карта» по реализации стратегических задач на 2024–2025 учебный год",
      doc2_desc: "Пошаговый план мероприятий по учебно-методическим, научным и воспитательным направлениям.",
      doc3_title: "Положение о внутреннем мониторинге качества образования",
      doc3_desc: "Порядок оценки качества образования и обеспечения прозрачности в соответствии с критериями 1.2.5 и 1.3.5.",
      btn_download: "Смотреть документ (PDF)",
      doc_status: "Утверждено",
    },

    en: {
      badge: "Compliance with Criteria 1.2.5 & 1.3.5",
      hero_title: "Strategic Development Concept",
      hero_subtitle:
        "Medium- and long-term strategic development program of TUIT Academic Lyceum named after Muhammad al-Khwarizmi for 2024–2030, target performance indicators and monitoring system.",
      btn_docs: "Official Documents",
      btn_kpi: "Target KPIs",

      mission_title: "Our Mission",
      mission_desc:
        "Nurturing intellectually advanced, independent-minded and globally competitive youth through specialized fundamental education in STEM disciplines (mathematics, physics, computer science) and foreign languages.",

      vision_title: "Strategic Vision 2030",
      vision_desc:
        "Sustaining recognized leadership among IT-oriented academic institutions in Uzbekistan, securing a 98%+ university admission rate, and fully implementing world-class educational benchmarks.",

      values_title: "Core Principles",
      values_desc:
        "Academic integrity, transparency, innovative pedagogical technologies, commitment to measurable excellence, and unlocking each student's personal talent.",

      pillars_heading: "5 Strategic Priority Pillars",
      pillars_sub:
        "A structured roadmap to continuously elevate all operational, scientific and instructional dimensions of the lyceum.",

      pillar1_title: "1. Modernizing Curriculum according to Global Standards",
      pillar1_desc:
        "Integrating advanced international frameworks (Cambridge, SAT) across exact sciences. Expanding hands-on laboratory experiences based on the STEAM methodology.",

      pillar2_title: "2. Systematic Talent Development & Olympiad Excellence",
      pillar2_desc:
        "Individualized mentoring tracks for national and international STEM Olympiads. Specialized innovation labs and clubs guided by senior TUIT faculty.",

      pillar3_title: "3. Faculty Professional & Academic Excellence",
      pillar3_desc:
        "Ensuring 100% of teaching staff hold recognized language and subject credentials (IELTS, CEFR). Raising the proportion of faculty holding doctoral degrees (PhD, DSc) above 35%.",

      pillar4_title: "4. Digital Campus & High-Tech Infrastructure",
      pillar4_desc:
        "Unified digital learning management platform (LMS). Direct connectivity with TUIT digital repositories, cutting-edge computing labs, interactive displays, and high-speed local network.",

      pillar5_title: "5. International Partnerships & Graduate Career Pathways",
      pillar5_desc:
        "Academic collaboration agreements with prominent international institutions. A dedicated Career Guidance Center assisting students in gaining admission into top-500 global universities.",

      kpi_heading: "Target Key Performance Indicators (KPI Dynamics)",
      kpi_sub:
        "Quantitative and qualitative milestones scheduled across the 2024–2030 operational timeframe.",
      th_metric: "Performance Indicator / Metric",
      th_base: "2024 (Baseline)",
      th_target26: "2026 Target",
      th_target28: "2028 Target",
      th_target30: "2030 Target",

      kpi_row1: "Graduate higher education admission rate",
      kpi_row2: "Students certified with recognized credentials (IELTS, CEFR)",
      kpi_row3: "National and international Olympiad medalists",
      kpi_row4: "Faculty holding top-tier / international certifications",
      kpi_row5: "Digital learning resource coverage & LMS integration",

      monitoring_heading: "Monitoring & Public Accountability (Criterion 1.3.5)",
      monitoring_p1:
        "Structured monitoring oversees the execution of the Strategic Development Program. At the conclusion of every academic cycle, progress and KPI metrics are comprehensively reviewed by the Lyceum Academic Council.",
      monitoring_p2:
        "Annual analytical and outcome reports covering academic performance, research, and faculty achievements are transparently disseminated on the official website (tatual.uz).",

      docs_heading: "Approved Regulatory Documents & Roadmaps",
      docs_sub:
        "Official policies, strategic plans and roadmaps ratified by the Lyceum Academic Council.",
      doc1_title: "Strategic Development Concept of TUIT Academic Lyceum (2024–2030)",
      doc1_desc: "Foundational policy outlining institutional long-term objectives, strategic priorities and execution frameworks.",
      doc2_title: "Operational Roadmap for Strategic Implementation (2024–2025)",
      doc2_desc: "Actionable schedule specifying milestones, operational tasks, and designated personnel across academic domains.",
      doc3_title: "Regulations on Internal Quality Assurance & Monitoring",
      doc3_desc: "Governance structure establishing systematic quality audits and transparency protocols in line with criteria 1.2.5 and 1.3.5.",
      btn_download: "View Document (PDF)",
      doc_status: "Approved",
    },
  };

  const c = content[lang] || content.uz;

  const pillars = [
    {
      icon: BookOpen,
      title: c.pillar1_title,
      desc: c.pillar1_desc,
      color: "#002147",
    },
    {
      icon: Trophy,
      title: c.pillar2_title,
      desc: c.pillar2_desc,
      color: "#c8a96e",
    },
    {
      icon: GraduationCap,
      title: c.pillar3_title,
      desc: c.pillar3_desc,
      color: "#1d7a55",
    },
    {
      icon: Laptop,
      title: c.pillar4_title,
      desc: c.pillar4_desc,
      color: "#0284c7",
    },
    {
      icon: TrendingUp,
      title: c.pillar5_title,
      desc: c.pillar5_desc,
      color: "#6366f1",
    },
  ];

  const kpis = [
    { metric: c.kpi_row1, base: "94.2%", t26: "96.0%", t28: "97.5%", t30: "99.0%" },
    { metric: c.kpi_row2, base: "62.0%", t26: "75.0%", t28: "88.0%", t30: "95.0%" },
    { metric: c.kpi_row3, base: "18", t26: "25", t28: "35", t30: "50+" },
    { metric: c.kpi_row4, base: "82.0%", t26: "90.0%", t28: "95.0%", t30: "100%" },
    { metric: c.kpi_row5, base: "100%", t26: "100%", t28: "100%", t30: "100%" },
  ];

  const docs = [
    {
      title: c.doc1_title,
      desc: c.doc1_desc,
      number: "№ 04-2024",
      date: "28.08.2024",
    },
    {
      title: c.doc2_title,
      desc: c.doc2_desc,
      number: "№ 12-2024",
      date: "04.09.2024",
    },
    {
      title: c.doc3_title,
      desc: c.doc3_desc,
      number: "№ 07-2024",
      date: "15.09.2024",
    },
  ];

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      {/* PAGE BANNER */}
      <section
        style={{
          background: "linear-gradient(135deg, #001a38 0%, #002147 60%, #0b2f5c 100%)",
          color: "white",
          paddingTop: 140,
          paddingBottom: 72,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(200, 169, 110, 0.15) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <Link
              href="/"
              style={{
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {t.nav_home}
            </Link>
            <span>/</span>
            <Link
              href="/about"
              style={{
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {t.nav_about}
            </Link>
            <span>/</span>
            <span style={{ color: "#c8a96e", fontWeight: 600 }}>{t.nav_strategy}</span>
          </div>

          <div style={{ maxWidth: 880 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(200, 169, 110, 0.15)",
                border: "1px solid rgba(200, 169, 110, 0.35)",
                borderRadius: 50,
                padding: "6px 14px",
                marginBottom: 16,
              }}
            >
              <ShieldCheck size={14} color="#c8a96e" strokeWidth={1.75} />
              <span
                style={{
                  color: "#dfc08a",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {c.badge}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
                fontWeight: 900,
                lineHeight: 1.18,
                color: "#ffffff",
                marginBottom: 16,
                letterSpacing: "-0.01em",
              }}
            >
              {c.hero_title}
            </h1>

            <p
              style={{
                fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.65,
                marginBottom: 28,
                maxWidth: 780,
              }}
            >
              {c.hero_subtitle}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="#documents"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#c8a96e",
                  color: "#002147",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  padding: "11px 22px",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px rgba(200, 169, 110, 0.35)",
                }}
              >
                <FileText size={16} strokeWidth={1.75} />
                <span>{c.btn_docs}</span>
              </a>

              <a
                href="#kpi"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "11px 22px",
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <BarChart3 size={16} strokeWidth={1.75} />
                <span>{c.btn_kpi}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & PRINCIPLES */}
      <section style={{ padding: "72px 0", background: "#f8fafc" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: 24,
            }}
          >
            {/* Mission */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 14,
                padding: "32px 28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(0, 33, 71, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: "rgba(0, 33, 71, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Target size={24} color="#002147" strokeWidth={1.75} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#002147", margin: 0 }}>
                {c.mission_title}
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                {c.mission_desc}
              </p>
            </div>

            {/* Vision */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 14,
                padding: "32px 28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(0, 33, 71, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: "rgba(200, 169, 110, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Compass size={24} color="#c8a96e" strokeWidth={1.75} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#002147", margin: 0 }}>
                {c.vision_title}
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                {c.vision_desc}
              </p>
            </div>

            {/* Values */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 14,
                padding: "32px 28px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(0, 33, 71, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: "rgba(29, 122, 85, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2 size={24} color="#1d7a55" strokeWidth={1.75} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#002147", margin: 0 }}>
                {c.values_title}
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                {c.values_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 STRATEGIC PILLARS */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 52px" }}>
            <div
              style={{
                color: "#c8a96e",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {lang === "uz"
                ? "Bosh Reja va Yo'nalishlar"
                : lang === "ru"
                  ? "Генеральный План и Направления"
                  : "Core Roadmap & Priorities"}
            </div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#002147",
                marginBottom: 14,
              }}
            >
              {c.pillars_heading}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.6 }}>
              {c.pillars_sub}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 14,
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0, 33, 71, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "white",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                    }}
                  >
                    <Icon size={22} color={pillar.color} strokeWidth={1.75} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#002147",
                      lineHeight: 1.35,
                      margin: 0,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#475569",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KPI METRICS TABLE (Criterion 1.2.5) */}
      <section id="kpi" style={{ padding: "80px 0", background: "#f8fafc", borderTop: "1px solid #eef2f6" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <div
              style={{
                color: "#c8a96e",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {lang === "uz"
                ? "1.2.5-mezon indikatorlari"
                : lang === "ru"
                  ? "Индикаторы критерия 1.2.5"
                  : "Criterion 1.2.5 Indicators"}
            </div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#002147",
                marginBottom: 14,
              }}
            >
              {c.kpi_heading}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.6 }}>
              {c.kpi_sub}
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 14,
              border: "1px solid #e2e8f0",
              boxShadow: "0 6px 20px rgba(0, 33, 71, 0.04)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "0.88rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#002147",
                      color: "#ffffff",
                      fontSize: "0.82rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <th style={{ padding: "16px 20px", fontWeight: 700 }}>{c.th_metric}</th>
                    <th style={{ padding: "16px 16px", fontWeight: 700, textAlign: "center", whiteSpace: "nowrap" }}>
                      {c.th_base}
                    </th>
                    <th style={{ padding: "16px 16px", fontWeight: 700, textAlign: "center", whiteSpace: "nowrap" }}>
                      {c.th_target26}
                    </th>
                    <th style={{ padding: "16px 16px", fontWeight: 700, textAlign: "center", whiteSpace: "nowrap" }}>
                      {c.th_target28}
                    </th>
                    <th
                      style={{
                        padding: "16px 20px",
                        fontWeight: 700,
                        textAlign: "center",
                        background: "#c8a96e",
                        color: "#002147",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.th_target30}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((k, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: i < kpis.length - 1 ? "1px solid #f1f5f9" : "none",
                        background: i % 2 === 0 ? "#ffffff" : "#fcfdfe",
                      }}
                    >
                      <td style={{ padding: "16px 20px", color: "#1e293b", fontWeight: 600 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <CheckCircle2 size={16} color="#c8a96e" strokeWidth={2} style={{ flexShrink: 0 }} />
                          <span>{k.metric}</span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px 16px",
                          textAlign: "center",
                          color: "#64748b",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k.base}
                      </td>
                      <td
                        style={{
                          padding: "16px 16px",
                          textAlign: "center",
                          color: "#002147",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k.t26}
                      </td>
                      <td
                        style={{
                          padding: "16px 16px",
                          textAlign: "center",
                          color: "#002147",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k.t28}
                      </td>
                      <td
                        style={{
                          padding: "16px 20px",
                          textAlign: "center",
                          color: "#002147",
                          fontWeight: 800,
                          background: "rgba(200, 169, 110, 0.08)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k.t30}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* MONITORING & ACCOUNTABILITY (Criterion 1.3.5) */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container-custom">
          <div
            style={{
              background: "linear-gradient(135deg, #002147 0%, #0a3160 100%)",
              color: "white",
              borderRadius: 16,
              padding: "clamp(32px, 5vw, 48px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(200, 169, 110, 0.12)",
                pointerEvents: "none",
              }}
            />

            <div style={{ maxWidth: 860, position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.1)",
                  padding: "6px 14px",
                  borderRadius: 50,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#dfc08a",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                <ShieldCheck size={14} color="#dfc08a" strokeWidth={1.75} />
                <span>1.3.5-mezon mexanizmi</span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.4rem, 2.8vw, 1.95rem)",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  marginBottom: 18,
                  color: "#ffffff",
                }}
              >
                {c.monitoring_heading}
              </h2>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.7,
                  marginBottom: 14,
                }}
              >
                {c.monitoring_p1}
              </p>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {c.monitoring_p2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL REGULATORY DOCUMENTS */}
      <section id="documents" style={{ padding: "80px 0", background: "#f8fafc", borderTop: "1px solid #eef2f6" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <div
              style={{
                color: "#c8a96e",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {lang === "uz"
                ? "Normativ-huquqiy asoslar"
                : lang === "ru"
                  ? "Нормативно-правовая база"
                  : "Regulatory & Policy Framework"}
            </div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#002147",
                marginBottom: 14,
              }}
            >
              {c.docs_heading}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.6 }}>
              {c.docs_sub}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {docs.map((doc, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 14px rgba(0, 33, 71, 0.03)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c8a96e";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 33, 71, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 33, 71, 0.03)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(29, 122, 85, 0.1)",
                        color: "#1d7a55",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                      }}
                    >
                      <CheckCircle2 size={12} strokeWidth={2.5} />
                      <span>{c.doc_status}</span>
                    </span>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: "0.74rem",
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      <Calendar size={13} strokeWidth={1.75} />
                      <span>{doc.date}</span>
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "#002147",
                      lineHeight: 1.4,
                      marginBottom: 10,
                    }}
                  >
                    {doc.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#64748b",
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    {doc.desc}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: 16,
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    {doc.number}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        lang === "uz"
                          ? "Hujjatning to'liq nusxasi litsey arxivida mavjud va tasdiqlangan. Yuklab olish uchun litsey ma'muriyatiga so'rov yuborishingiz mumkin."
                          : lang === "ru"
                            ? "Полная копия документа утверждена и находится в архиве лицея."
                            : "The full ratified document is maintained in the lyceum official archives."
                      );
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(0, 33, 71, 0.05)",
                      color: "#002147",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 12px",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#002147";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 33, 71, 0.05)";
                      e.currentTarget.style.color = "#002147";
                    }}
                  >
                    <Download size={13} strokeWidth={2} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
