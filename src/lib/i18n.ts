export type Lang = "uz" | "ru" | "en";

export interface FAQItem {
  q: string;
  a: string;
}

export interface TranslationStructure {
  nav_home: string;
  nav_about: string;
  nav_about_short: string;
  nav_leadership: string;
  nav_teachers: string;
  nav_strategy: string;
  nav_admissions: string;
  nav_directions: string;
  nav_departments: string;
  nav_rules: string;
  nav_docs: string;
  nav_faq: string;
  nav_science: string;
  nav_achievements: string;
  nav_news: string;
  nav_gallery: string;
  nav_contact: string;

  brand_title: string;
  brand_subtitle: string;

  header_admin: string;
  header_hours: string;

  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_cta2: string;

  about_title: string;
  about_p1: string;
  about_p2: string;
  about_p3: string;

  dir_title: string;
  dir_subtitle: string;
  dir1_name: string;
  dir1_desc: string;
  dir2_name: string;
  dir2_desc: string;

  adm_title: string;
  adm_subtitle: string;
  adm_step1_title: string;
  adm_step1_desc: string;
  adm_step2_title: string;
  adm_step2_desc: string;
  adm_step3_title: string;
  adm_step3_desc: string;
  adm_step4_title: string;
  adm_step4_desc: string;

  docs_title: string;
  docs_list: string[];
  docs_deadline: string;
  docs_deadline_val: string;
  docs_exam: string;
  docs_exam_val: string;

  faq_title: string;
  faq_items: FAQItem[];

  ach_title: string;
  ach_subtitle: string;

  news_title: string;
  news_all: string;
  news_read: string;

  contact_title: string;
  contact_address: string;
  contact_address_val: string;
  contact_phone: string;
  contact_phone_val: string;
  contact_phone_mobile: string;
  contact_phone_mobile_val: string;
  contact_email: string;
  contact_email_val: string;
  contact_schedule: string;
  contact_schedule_val: string;
  contact_send: string;
  contact_name: string;
  contact_msg: string;
  contact_submit: string;

  footer_links: string;
  footer_contact: string;
  footer_copy: string;
  footer_buses: string;

  maintenance_notice: string;
}

export const translations: Record<Lang, TranslationStructure> = {
  uz: {
    // Nav
    nav_home: "Bosh sahifa",
    nav_about: "Litsey haqida",
    nav_about_short: "Litsey haqida qisqa ma'lumot",
    nav_leadership: "Rahbariyat",
    nav_teachers: "Pedagog xodimlar",
    nav_strategy: "Strategik rivojlanish",
    nav_admissions: "Abituriyentlar",
    nav_directions: "Yo'nalishlar",
    nav_departments: "Kafedralar",
    nav_rules: "Qabul",
    nav_docs: "Hujjatlar va muddatlar",
    nav_faq: "Ko'p beriladigan savollar",
    nav_science: "Ilmiy faoliyat va yutuqlar",
    nav_achievements: "Yutuqlar",
    nav_news: "Yangiliklar",
    nav_gallery: "Galereya",
    nav_contact: "Bog'lanish",

    brand_title: "Muhammad al-Xorazmiy nomidagi",
    brand_subtitle: "TATU akademik litseyi",

    header_admin: "Litsey ma'muriyati",
    header_hours: "Dushanba – Shanba, 8:30 – 16:00",

    // Hero
    hero_badge: "Toshkent axborot texnologiyalari universiteti",
    hero_title: "Muhammad al-Xorazmiy nomidagi TATU akademik litseyi",
    hero_subtitle:
      "Biz 2006-yildan buyon iqtidorli yoshlarga aniq fanlar (texnika va iqtisodiyot) yo‘nalishida chuqurlashtirilgan akademik ta’lim berib kelmoqdamiz. Ilmiy izlanishlar va har tomonlama intellektual rivojlanishga alohida e’tibor qaratiladi.",
    hero_cta: "Qabul haqida",
    hero_cta2: "Litsey haqida",

    // About section
    about_title: "Litsey haqida",
    about_p1:
      "Muhammad al-Xorazmiy nomidagi TATU akademik litseyi — Toshkent axborot texnologiyalari universiteti (TATU) huzurida faoliyat yurituvchi nufuzli davlat ta'lim muassasasi hisoblanadi. Litsey 2006-yilda tashkil etilgan bo'lib, Toshkent shahri Yunusobod tumani Bog'ishamol ko'chasida joylashgan.",
    about_p2:
      "Litseyning asosiy maqsadi — bilimga chanqoq va iqtidorli yoshlarning intellektual salohiyatini to‘liq ro‘yobga chiqarish, ularga chuqurlashtirilgan fundamental ta’lim berish hamda yetakchi milliy va xalqaro oliy o‘quv yurtlariga munosib tayyorlashdir.",
    about_p3:
      "Litseyda matematika, fizika, chet tillari, axborot texnologiyalari va boshqa fanlar bo'yicha yuqori malakali pedagog xodimlar, fan nomzodlari va doktorlari mashg'ulotlar olib borishadi.",

    // Directions
    dir_title: "Ta'lim yo'nalishlari",
    dir_subtitle: "Litseyda quyidagi chuqurlashtirilgan akademik yo'nalishlar mavjud",
    dir1_name: "Aniq fanlar (Texnika)",
    dir1_desc:
      "Matematika va fizika fanlari chuqurlashtirilgan holda o'rgatiladi. Texnika va muhandislik oliy ta'lim muassasalariga maqsadli tayyorgarlik.",
    dir2_name: "Aniq fanlar (Iqtisodiyot)",
    dir2_desc:
      "Matematika va ingliz tili fanlariga ixtisoslashgan yo'nalish. Xalqaro ta'lim standartlari va iqtisodiy mutaxassisliklarga tayyorlash.",

    // Admission
    adm_title: "Qabul jarayoni",
    adm_subtitle:
      "Litseyga o'qishga kirish uchun quyidagi rasmiy tartib-qoidalarga amal qiling",
    adm_step1_title: "Onlayn ro'yxatdan o'tish",
    adm_step1_desc:
      "my.edu.uz yagona elektron ta'lim xizmatlari portali orqali onlayn ro'yxatdan o'ting va kerakli ma'lumotlarni kiriting.",
    adm_step2_title: "Hujjatlar qabuli",
    adm_step2_desc:
      "Har yili 10-iyundan 10-iyulgacha bo'lgan muddatda barcha talab etilgan ma'lumotlar va fotosuratni elektron tizimga yuklang.",
    adm_step3_title: "Kirish test sinovlari",
    adm_step3_desc:
      "Iyul oyida Bilim va malakalarni baholash agentligi tomonidan o'tkaziladigan kirish test sinovlarida ishtirok eting.",
    adm_step4_title: "Natijalar va qabul",
    adm_step4_desc:
      "Imtihon natijalari my.edu.uz portali va rasmiy axborot kanallarida e'lon qilinadi.",

    // Documents
    docs_title: "Onlayn ariza topshirish uchun talab etiladigan ma'lumotlar",
    docs_list: [
      "ID-karta yoki tug'ilganlik haqidagi guvohnoma ma'lumotlari (JShShIR)",
      "3,5x4,5 sm o'lchamdagi 1 dona rangli fotosurat (elektron shaklda)",
      "9-sinf bitiruv attestati (elektron baza orqali avtomatik integratsiya qilinadi)",
      "Fan olimpiadalari g'olibligi diplomi (imtiyoz mavjud bo'lsa)",
      "Chet tili yoki umumta'lim fanlari bo'yicha milliy/xalqaro sertifikat (IELTS, TOEFL, CEFR - mavjud bo'lsa)",
    ],
    docs_deadline: "Hujjat qabul qilish muddati:",
    docs_deadline_val:
      "Har yili 10-iyundan 10-iyulgacha (my.edu.uz portali orqali)",
    docs_exam: "Kirish imtihonlari:",
    docs_exam_val: "Iyul oyida (aniq sanalar Bilimni baholash agentligi tomonidan belgilanadi)",

    // FAQ
    faq_title: "Ko'p beriladigan savollar",
    faq_items: [
      {
        q: "Litseyga qanday kirish mumkin?",
        a: "Litseyga kirish uchun my.edu.uz portali orqali belgilangan muddatda onlayn ro'yxatdan o'tish va Bilimni baholash agentligi tomonidan o'tkaziladigan kirish test sinovlarini muvaffaqiyatli topshirish lozim.",
      },
      {
        q: "Qaysi sinf o'quvchilari qabul qilinadi?",
        a: "Litseyga umumiy o'rta ta'lim maktablarining 9-sinfini muvaffaqiyatli tugatgan va umumiy o'rta ta'lim to'g'risidagi attestatga ega bo'lgan o'quvchilar qabul qilinadi.",
      },
      {
        q: "O'qish muddati qancha?",
        a: "Litsey ta'limi 2 yil davom etadi (10 va 11-sinflar).",
      },
      {
        q: "Imtiyozlar mavjudmi?",
        a: "Ha, xalqaro va respublika fan olimpiadalari g'oliblari (1-3 o'rinlar) hamda belgilangan darajadagi milliy yoki xalqaro til sertifikatlariga (IELTS, TOEFL, CEFR) ega abituriyentlar uchun qonunchilikda belgilangan imtiyozlar qo'llaniladi.",
      },
      {
        q: "Litseyda yotoqxona bormi?",
        a: "Litseyda yotoqxona mavjud emas.",
      },
      {
        q: "Qanday ta'lim yo'nalishlari mavjud?",
        a: "Litseyda 2 ta akademik yo'nalish mavjud: Aniq fanlar (Texnika: Matematika, Fizika) va Aniq fanlar (Iqtisodiyot: Matematika, Ingliz tili).",
      },
    ],

    // Achievements
    ach_title: "Yutuqlar va mukofotlar",
    ach_subtitle:
      "O'quvchilarimizning xalqaro va respublika miqyosidagi natijalari",

    // News
    news_title: "So'nggi yangiliklar",
    news_all: "Barcha yangiliklar",
    news_read: "Batafsil",

    // Contact
    contact_title: "Bog'lanish",
    contact_address: "Manzil",
    contact_address_val: "Toshkent shahri, Yunusobod tumani, Bog'ishamol ko'chasi, 112-uy (Mo'ljal: 'Bodomzor' metro bekati)",
    contact_phone: "Telefon",
    contact_phone_val: "+998 71 235-03-69",
    contact_phone_mobile: "Tez aloqa",
    contact_phone_mobile_val: "+998 93 103-32-45",
    contact_email: "Elektron pochta",
    contact_email_val: "info@tatual.uz",
    contact_schedule: "Ish vaqti",
    contact_schedule_val: "Dushanba – Shanba: 8:30 – 16:00",
    contact_send: "Xabar yuborish",
    contact_name: "Ismingiz",
    contact_msg: "Xabar",
    contact_submit: "Yuborish",

    // Footer
    footer_links: "Tezkor havolalar",
    footer_contact: "Aloqa",
    footer_copy: "Barcha huquqlar himoyalangan.",
    footer_buses: "Avtobuslar: 19, 38, 50, 63, 115",

    maintenance_notice:
      "Diqqat: Saytda profilaktika va texnik yangilash ishlari olib borilmoqda. Ba'zi ma'lumotlar va aloqa kanallari vaqtincha cheklangan bo'lishi mumkin. Shoshilinch bog'lanish: +998 71 235-03-69 yoki +998 93 103-32-45.",
  },

  ru: {
    nav_home: "Главная",
    nav_about: "О лицее",
    nav_about_short: "Краткая информация",
    nav_leadership: "Руководство",
    nav_teachers: "Педагогический состав",
    nav_strategy: "Стратегическое развитие",
    nav_admissions: "Абитуриентам",
    nav_directions: "Направления",
    nav_departments: "Кафедры",
    nav_rules: "Приём",
    nav_docs: "Документы и сроки",
    nav_faq: "Часто задаваемые вопросы",
    nav_science: "Наука и достижения",
    nav_achievements: "Достижения",
    nav_news: "Новости",
    nav_gallery: "Галерея",
    nav_contact: "Контакты",

    brand_title: "Им. Мухаммада аль-Хорезми",
    brand_subtitle: "Академический лицей ТУИТ",

    header_admin: "Администрация лицея",
    header_hours: "Понедельник – Суббота, 8:30 – 16:00",

    hero_badge: "Ташкентский университет информационных технологий",
    hero_title: "Академический лицей имени Мухаммада аль-Хорезми при ТУИТ",
    hero_subtitle:
      "С 2006 года мы предоставляем углублённое академическое образование по точным наукам (техника и экономика). Особое внимание уделяется научным исследованиям и всестороннему развитию.",
    hero_cta: "Поступление",
    hero_cta2: "О лицее",

    about_title: "О лицее",
    about_p1:
      "Академический лицей имени Мухаммада аль-Хорезми — ведущее государственное образовательное учреждение при Ташкентском университете информационных технологий (ТУИТ). Основан в 2006 году и расположен в Юнусабадском районе Ташкента по улице Богишамол.",
    about_p2:
      "Основная миссия лицея — всестороннее раскрытие интеллектуального потенциала целеустремленной молодежи, предоставление фундаментальных академических знаний и подготовка к поступлению в ведущие университеты.",
    about_p3:
      "В лицее преподают высококвалифицированные педагоги, кандидаты и доктора наук по математике, физике, информационным технологиям, иностранным языкам и социально-гуманитарным предметам.",

    dir_title: "Образовательные направления",
    dir_subtitle: "В лицее представлены следующие углубленные академические направления",
    dir1_name: "Точные науки (Техника)",
    dir1_desc:
      "Углублённое изучение математики и физики. Целенаправленная подготовка к инженерно-техническим направлениям ведущих вузов.",
    dir2_name: "Точные науки (Экономика)",
    dir2_desc:
      "Специализация на математике и английском языке. Обучение по современным академическим стандартам для экономических специальностей.",

    adm_title: "Процедура поступления",
    adm_subtitle: "Для поступления в академический лицей следуйте официальному порядку",
    adm_step1_title: "Онлайн-регистрация",
    adm_step1_desc:
      "Зарегистрируйтесь онлайн через единый портал образовательных услуг my.edu.uz и заполните необходимые данные.",
    adm_step2_title: "Приём документов",
    adm_step2_desc:
      "С 10 июня по 10 июля загрузите электронные копии документов и фотографию в систему.",
    adm_step3_title: "Вступительные экзамены",
    adm_step3_desc: "Успешно сдайте тестовые испытания, проводимые Агентством по оценке знаний в июле.",
    adm_step4_title: "Результаты и зачисление",
    adm_step4_desc:
      "Результаты тестирования публикуются на портале my.edu.uz и официальных ресурсах лицея.",

    docs_title: "Необходимые документы для онлайн-подачи",
    docs_list: [
      "Данные ID-карты или свидетельства о рождении (ПИНФЛ)",
      "1 цветная фотография 3,5х4,5 см в электронном формате",
      "Аттестат об окончании 9-го класса (интегрируется автоматически)",
      "Диплом победителя предметных олимпиад (при наличии льготы)",
      "Национальный или международный сертификат по иностранному языку (IELTS, TOEFL, CEFR — при наличии)",
    ],
    docs_deadline: "Срок приёма документов:",
    docs_deadline_val: "Ежегодно с 10 июня по 10 июля (через портал my.edu.uz)",
    docs_exam: "Вступительные экзамены:",
    docs_exam_val: "В июле (точные даты объявляются Агентством по оценке знаний)",

    faq_title: "Часто задаваемые вопросы",
    faq_items: [
      {
        q: "Как поступить в лицей?",
        a: "Для поступления необходимо в установленные сроки зарегистрироваться на портале my.edu.uz и успешно пройти вступительные тестовые испытания.",
      },
      {
        q: "Ученики какого класса принимаются?",
        a: "В лицей принимаются выпускники 9-х классов общеобразовательных школ, имеющие аттестат об общем среднем образовании.",
      },
      {
        q: "Сколько длится обучение?",
        a: "Срок обучения в лицее составляет 2 года (10 и 11 классы).",
      },
      {
        q: "Существуют ли льготы?",
        a: "Да, льготы предусмотрены для победителей республиканских и международных олимпиад (1-3 места), а также для обладателей языковых сертификатов уровня B2 и выше.",
      },
      {
        q: "Есть ли общежитие?",
        a: "В лицее общежития нет.",
      },
      {
        q: "Какие направления существуют?",
        a: "В лицее открыты 2 направления: Точные науки (Техника: математика, физика) и Точные науки (Экономика: математика, английский язык).",
      },
    ],

    ach_title: "Достижения и награды",
    ach_subtitle:
      "Результаты наших учеников на международных и республиканских олимпиадах",

    news_title: "Последние новости",
    news_all: "Все новости",
    news_read: "Подробнее",

    contact_title: "Контакты",
    contact_address: "Адрес",
    contact_address_val: "Ташкент, Юнусабадский район, улица Богишамол, 112 (Ориентир: станция метро «Бодомзор»)",
    contact_phone: "Телефон",
    contact_phone_val: "+998 71 235-03-69",
    contact_phone_mobile: "Быстрая связь",
    contact_phone_mobile_val: "+998 93 103-32-45",
    contact_email: "Эл. почта",
    contact_email_val: "info@tatual.uz",
    contact_schedule: "Режим работы",
    contact_schedule_val: "Понедельник – Суббота: 8:30 – 16:00",
    contact_send: "Написать нам",
    contact_name: "Ваше имя",
    contact_msg: "Сообщение",
    contact_submit: "Отправить",

    // Footer
    footer_links: "Быстрые ссылки",
    footer_contact: "Контакты",
    footer_copy: "Все права защищены.",
    footer_buses: "Автобусы: 19, 38, 50, 63, 115",

    maintenance_notice:
      "Внимание: на сайте проводятся профилактические и технические работы. Некоторые сервисы могут быть временно недоступны. Телефоны для связи: +998 71 235-03-69, +998 93 103-32-45.",
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_about_short: "Brief Information",
    nav_leadership: "Leadership",
    nav_teachers: "Teaching Staff",
    nav_strategy: "Strategic Development",
    nav_admissions: "Admissions",
    nav_directions: "Directions",
    nav_departments: "Departments",
    nav_rules: "Admission",
    nav_docs: "Documents & Deadlines",
    nav_faq: "FAQ",
    nav_science: "Science & Achievements",
    nav_achievements: "Achievements",
    nav_news: "News",
    nav_gallery: "Gallery",
    nav_contact: "Contact",

    brand_title: "Muhammad al-Khwarizmi",
    brand_subtitle: "TUIT Academic Lyceum",

    header_admin: "Lyceum administration",
    header_hours: "Monday – Saturday, 8:30 – 16:00",

    hero_badge: "Tashkent University of Information Technologies",
    hero_title: "Muhammad al-Khwarizmi Academic Lyceum under TUIT",
    hero_subtitle:
      "Since 2006, we provide in-depth academic education in exact sciences (technical and economics tracks) for talented youth with an emphasis on research and intellectual growth.",
    hero_cta: "Admissions",
    hero_cta2: "About the Lyceum",

    about_title: "About the Lyceum",
    about_p1:
      "Muhammad al-Khwarizmi Academic Lyceum is a prestigious state educational institution operating under Tashkent University of Information Technologies (TUIT). Founded in 2006, it is located on Bogishamol Street, Yunusabad District, Tashkent.",
    about_p2:
      "The lyceum's core mission is to unlock the full intellectual potential of ambitious and talented students, providing advanced fundamental education and preparing them for prestigious universities worldwide.",
    about_p3:
      "The lyceum faculty includes experienced educators, PhDs and Doctors of Science in mathematics, physics, IT, foreign languages, and social sciences.",

    dir_title: "Academic Directions",
    dir_subtitle: "The lyceum offers the following specialized academic tracks",
    dir1_name: "Exact Sciences (Technical)",
    dir1_desc:
      "In-depth mathematics and physics curriculum. Focused preparation for engineering and technical universities.",
    dir2_name: "Exact Sciences (Economics)",
    dir2_desc:
      "Specialization in mathematics and English. Modern academic curriculum preparing students for economic disciplines.",

    adm_title: "Admission Process",
    adm_subtitle: "Follow these official steps to apply to the academic lyceum",
    adm_step1_title: "Online Registration",
    adm_step1_desc:
      "Register online via the official educational services portal at my.edu.uz and enter the required details.",
    adm_step2_title: "Document Submission",
    adm_step2_desc:
      "Submit electronic application and required photos between June 10 and July 10.",
    adm_step3_title: "Entrance Testing",
    adm_step3_desc:
      "Take part in entrance examinations conducted in July by the Knowledge Assessment Agency.",
    adm_step4_title: "Results & Enrollment",
    adm_step4_desc:
      "Examination results are published via my.edu.uz and official lyceum communication channels.",

    docs_title: "Required Information for Online Application",
    docs_list: [
      "Applicant ID card or birth certificate details (PINFL)",
      "1 color photo (3.5x4.5 cm in digital format)",
      "9th grade graduation certificate (automatically integrated via digital database)",
      "Olympiad winner certificate (if applicable for quota privileges)",
      "Language certificate (IELTS, TOEFL, CEFR level B2 or higher, if available)",
    ],
    docs_deadline: "Application Deadline:",
    docs_deadline_val: "Annually from June 10 to July 10 (via my.edu.uz)",
    docs_exam: "Entrance Examinations:",
    docs_exam_val: "In July (exact dates scheduled by Knowledge Assessment Agency)",

    faq_title: "Frequently Asked Questions",
    faq_items: [
      {
        q: "How can I apply to the lyceum?",
        a: "To apply, register online at my.edu.uz during the designated period and take the entrance examinations conducted by the Knowledge Assessment Agency.",
      },
      {
        q: "Which grade students are eligible?",
        a: "Students who have successfully graduated from the 9th grade of secondary schools are eligible to apply.",
      },
      {
        q: "How long is the study period?",
        a: "The study duration is 2 years (grades 10 and 11).",
      },
      {
        q: "Are there admission privileges?",
        a: "Yes, winners of national and international olympiads (1st-3rd place) and holders of eligible language proficiency certificates (B2+) receive established legal privileges.",
      },
      {
        q: "Is dormitory accommodation available?",
        a: "No, the lyceum does not provide dormitory facilities.",
      },
      {
        q: "What academic tracks are available?",
        a: "There are 2 academic tracks: Exact Sciences (Technical: Math, Physics) and Exact Sciences (Economics: Math, English).",
      },
    ],

    ach_title: "Achievements & Awards",
    ach_subtitle: "Our students' achievements in national and international arenas",

    news_title: "Latest News",
    news_all: "All News",
    news_read: "Read More",

    contact_title: "Contact Us",
    contact_address: "Address",
    contact_address_val: "112 Bogishamol Street, Yunusabad District, Tashkent (Landmark: 'Bodomzor' metro station)",
    contact_phone: "Phone",
    contact_phone_val: "+998 71 235-03-69",
    contact_phone_mobile: "Quick contact",
    contact_phone_mobile_val: "+998 93 103-32-45",
    contact_email: "Email",
    contact_email_val: "info@tatual.uz",
    contact_schedule: "Working Hours",
    contact_schedule_val: "Monday – Saturday: 8:30 – 16:00",
    contact_send: "Send Us a Message",
    contact_name: "Your Name",
    contact_msg: "Message",
    contact_submit: "Send",

    // Footer
    footer_links: "Quick Links",
    footer_contact: "Contact",
    footer_copy: "All rights reserved.",
    footer_buses: "Buses: 19, 38, 50, 63, 115",

    maintenance_notice:
      "Notice: Scheduled maintenance is in progress. Some services and channels may be temporarily limited. For urgent inquiries: +998 71 235-03-69 or +998 93 103-32-45.",
  },
};

export type TranslationKey = keyof TranslationStructure;
