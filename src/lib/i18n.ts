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
  nav_admissions: string;
  nav_directions: string;
  nav_rules: string;
  nav_docs: string;
  nav_faq: string;
  nav_science: string;
  nav_achievements: string;
  nav_news: string;
  nav_contact: string;

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
    nav_admissions: "Abituriyentlar",
    nav_directions: "Yo'nalishlar",
    nav_rules: "Qabul",
    nav_docs: "Hujjatlar va muddatlar",
    nav_faq: "Ko'p beriladigan savollar",
    nav_science: "Yutuqlar",
    nav_achievements: "Yutuqlar",
    nav_news: "Yangiliklar",
    nav_contact: "Bog'lanish",

    header_admin: "Litsey ma'muriyati",
    header_hours: "Dushanba - Shanba, 8:30 - 16:00",

    // Hero
    hero_badge: "Toshkent axborot texnologiyalari universiteti",
    hero_title: "Muhammad al-Xorazmiy Akademik Litseyi",
    hero_subtitle:
      "Biz 2006-yildan beri iqtidorli oʻquvchilarni amaliy fanlarga tayyorlaymiz. Ilmiy yoʻnalishlar va shaxsiy rivojlanishga alohida eʼtibor qaratiladi.",
    hero_cta: "Qabul haqida",
    hero_cta2: "Litsey haqida",

    // About section
    about_title: "Litsey haqida",
    about_p1:
      "Muhammad al-Xorazmiy nomidagi Akademik Litsey – Toshkent axborot texnologiyalari universiteti (TATU) huzurida faoliyat yurituvchi davlat akademik litseyi hisoblanadi. Litsey 2006-yilda tashkil etilgan bo'lib, Toshkent shahri Bog'ishamol ko'chasida joylashgan.",
    about_p2:
      "Litsey o'z oldiga qo'ygan asosiy maqsad — iqtidorli yoshlarni aniqlash, ularni zamonaviy bilim va ko'nikmalar bilan qurollantirish hamda oliy o'quv yurtlariga munosib tayyorgarlik ko'rishga yordam berishdir.",
    about_p3:
      "Litseyda matematika, fizika, kimyo, biologiya, tarix, chet tillari va boshqa fanlar bo'yicha yuqori malakali pedagog xodimlar dars o'tishadi.",

    // Directions
    dir_title: "Ta'lim yo'nalishlari",
    dir_subtitle: "Litseyda quyidagi akademik yo'nalishlar mavjud",
    dir1_name: "Matematika, Fizika",
    dir1_desc:
      "Matematika va fizika fanlari chuqurlashtirilgan holda o'rgatiladi. Texnik oliy ta'lim muassasalariga tayyorlash.",
    dir2_name: "Matematika, Ingliz tili",
    dir2_desc:
      "Matematika va ingliz tili fanlariga ixtisoslashgan yo'nalish. Xalqaro standartlar asosida o'qitish.",

    // Admission
    adm_title: "Qabul jarayoni",
    adm_subtitle:
      "Litseyga o'qishga kirish uchun quyidagi tartib-qoidalarga amal qiling",
    adm_step1_title: "Ro'yxatdan o'tish",
    adm_step1_desc:
      "my.edu.uz rasmiy sayti orqali onlayn ro'yxatdan o'ting va kerakli ma'lumotlarni kiriting.",
    adm_step2_title: "Hujjatlar topshirish",
    adm_step2_desc:
      "Belgilangan muddatda barcha talab etilgan hujjatlarni taqdim eting.",
    adm_step3_title: "Kirish imtihoni",
    adm_step3_desc:
      "Iyul oyida o'tkaziladigan kirish imtihonlarini muvaffaqiyatli topshiring.",
    adm_step4_title: "Natijalar",
    adm_step4_desc:
      "Imtihon natijalari rasmiy sayt orqali e'lon qilinadi va qabul ro'yxati tuziladi.",

    // Documents
    docs_title: "Talab etilgan hujjatlar",
    docs_list: [
      "Ariza (belgilangan namunada)",
      "Pasport nusxasi (ota-onasi va o'quvchining)",
      "9-sinf attestati va ilovasi (nusxasi)",
      "4 ta 3x4 o'lchamdagi rasm",
      "Tibbiy ma'lumotnoma (086-shakl)",
      "Imtiyozlar bo'lsa, tegishli hujjatlar",
    ],
    docs_deadline: "Hujjat qabul qilish muddati:",
    docs_deadline_val:
      "Har yili may-iyun oylarida (aniq sana my.edu.uz saytida)",
    docs_exam: "Kirish imtihoni:",
    docs_exam_val: "Iyul oyida (aniq sana qo'shimcha e'lon qilinadi)",

    // FAQ
    faq_title: "Ko'p beriladigan savollar",
    faq_items: [
      {
        q: "Litseyga qanday kirish mumkin?",
        a: "Litseyga kirish uchun my.edu.uz sayti orqali ro'yxatdan o'tish, hujjatlar topshirish va kirish imtihonlarini muvaffaqiyatli topshirish lozim.",
      },
      {
        q: "Qaysi sinf o'quvchilari qabul qilinadi?",
        a: "Litseyga 9-sinfni tugatgan va asosiy ta'lim sertifikatiga ega bo'lgan o'quvchilar qabul qilinadi.",
      },
      {
        q: "O'qish muddati qancha?",
        a: "Litsey ta'limi 2 yil davom etadi (10, 11-sinflar).",
      },
      {
        q: "Imtiyozlar mavjudmi?",
        a: "Ha, xalqaro, viloyat va shahar olimpiadalari g'oliblari (1-3 o'rin) va IELTS/TOEFL/Cambridge sertifikatlariga ega abituriyentlar uchun imtiyozlar belgilangan.",
      },
      {
        q: "Litseyda yotoqxona bormi?",
        a: "Litseyda yotoqxona mavjud emas.",
      },
      {
        q: "Qanday yo'nalishlar mavjud?",
        a: "Litseyda 2 ta akademik yo'nalish mavjud: Aniq fanlar (Texnika) va Aniq fanlar (Iqtisod).",
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
    contact_address_val: "Toshkent shahri, Bog'ishamol ko'chasi, 112-uy",
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

    maintenance_notice:
      "Diqqat: Sayt hozirda texnik ishlar olib borilmoqda. Ba'zi ma'lumotlar va aloqa kanallari vaqtincha to'liq ishlamasligi mumkin. Shoshilinch bog'lanish: +998 71 235-03-69 yoki +998 93 103-32-45.",
  },

  ru: {
    nav_home: "Главная",
    nav_about: "О лицее",
    nav_about_short: "Краткая информация",
    nav_leadership: "Руководство",
    nav_teachers: "Педагогический состав",
    nav_admissions: "Абитуриентам",
    nav_directions: "Направления",
    nav_rules: "Приём",
    nav_docs: "Документы и сроки",
    nav_faq: "Часто задаваемые вопросы",
    nav_science: "Достижения",
    nav_achievements: "Достижения",
    nav_news: "Новости",
    nav_contact: "Контакты",

    header_admin: "Администрация лицея",
    header_hours: "Понедельник - Суббота, 8:30 - 16:00",

    hero_badge: "Ташкентский университет информационных технологий",
    hero_title: "Академический лицей имени Мухаммада аль-Хорезми",
    hero_subtitle:
      "Знания, наука и будущее — всё в одном месте. Качественное академическое образование в современной среде.",
    hero_cta: "Поступление",
    hero_cta2: "О лицее",

    about_title: "О лицее",
    about_p1:
      "Академический лицей имени Мухаммада аль-Хорезми — государственный академический лицей при Ташкентском университете информационных технологий (ТУИТ). Лицей основан в 2006 году и расположен на улице Богишамол в Ташкенте.",
    about_p2:
      "Основная цель лицея — выявление талантливых молодых людей, вооружение их современными знаниями и навыками, а также подготовка к поступлению в ведущие высшие учебные заведения.",
    about_p3:
      "В лицее преподают высококвалифицированные педагоги по математике, физике, химии, биологии, истории, иностранным языкам и другим предметам.",

    dir_title: "Образовательные направления",
    dir_subtitle: "В лицее представлены следующие академические направления",
    dir1_name: "Математика, Физика",
    dir1_desc:
      "Углублённое изучение математики и физики. Подготовка к техническим высшим учебным заведениям.",
    dir2_name: "Математика, Английский язык",
    dir2_desc:
      "Специализация на математике и английском языке. Обучение по международным стандартам.",

    adm_title: "Процедура поступления",
    adm_subtitle: "Для поступления в лицей следуйте следующим правилам",
    adm_step1_title: "Регистрация",
    adm_step1_desc:
      "Зарегистрируйтесь онлайн через официальный сайт my.edu.uz и введите необходимые данные.",
    adm_step2_title: "Подача документов",
    adm_step2_desc:
      "Предоставьте все необходимые документы в установленные сроки.",
    adm_step3_title: "Вступительный экзамен",
    adm_step3_desc: "Успешно сдайте вступительные экзамены, проводимые в июле.",
    adm_step4_title: "Результаты",
    adm_step4_desc:
      "Результаты экзаменов публикуются на официальном сайте и составляется список принятых.",

    docs_title: "Необходимые документы",
    docs_list: [
      "Заявление (установленного образца)",
      "Копия паспорта (родителей и ученика)",
      "Аттестат 9-го класса и приложение (копия)",
      "4 фотографии 3х4 см",
      "Медицинская справка (форма 086)",
      "Документы о льготах (при наличии)",
    ],
    docs_deadline: "Срок приёма документов:",
    docs_deadline_val: "Ежегодно в мае-июне (точные даты на сайте my.edu.uz)",
    docs_exam: "Вступительный экзамен:",
    docs_exam_val: "В июле (точная дата объявляется дополнительно)",

    faq_title: "Часто задаваемые вопросы",
    faq_items: [
      {
        q: "Как поступить в лицей?",
        a: "Для поступления необходимо зарегистрироваться на сайте my.edu.uz, подать документы и успешно сдать вступительные экзамены.",
      },
      {
        q: "Ученики какого класса принимаются?",
        a: "В лицей принимаются ученики, окончившие 9 класс и имеющие аттестат об основном образовании.",
      },
      {
        q: "Сколько длится обучение?",
        a: "Обучение в лицее длится 2 года (10 и 11 классы).", // Fixed from 10-12
      },
      {
        q: "Существуют ли льготы?",
        a: "Да, льготы предусмотрены для победителей международных, областных и городских олимпиад (1-3 места), а также для обладателей сертификатов IELTS/TOEFL/Cambridge.",
      },
      {
        q: "Есть ли общежитие?",
        a: "В лицее общежития нет.",
      },
      {
        q: "Какие направления существуют?",
        a: "В лицее доступны 2 академических направления: Точные науки (Техника) и Точные науки (Экономика).",
      },
    ],

    ach_title: "Достижения и награды",
    ach_subtitle:
      "Результаты наших учеников на международном и республиканском уровне",

    news_title: "Последние новости",
    news_all: "Все новости",
    news_read: "Подробнее",

    contact_title: "Контакты",
    contact_address: "Адрес",
    contact_address_val: "Ташкент, улица Богишамол, 112",
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

    footer_links: "Быстрые ссылки",
    footer_contact: "Контакты",
    footer_copy: "Все права защищены.",

    maintenance_notice:
      "Внимание: сайт находится на техническом обслуживании. Некоторая информация и каналы связи могут временно работать неполно. Телефоны: +998 71 235-03-69, +998 93 103-32-45.",
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_about_short: "Brief Information",
    nav_leadership: "Leadership",
    nav_teachers: "Teaching Staff",
    nav_admissions: "Admissions",
    nav_directions: "Directions",
    nav_rules: "Admission",
    nav_docs: "Documents & Deadlines",
    nav_faq: "FAQ",
    nav_science: "Achievements",
    nav_achievements: "Achievements",
    nav_news: "News",
    nav_contact: "Contact",

    header_admin: "Lyceum administration",
    header_hours: "Monday - Saturday, 8:30 - 16:00",

    hero_badge: "Tashkent University of Information Technology",
    hero_title: "Muhammad al-Khwarizmi Academic Lyceum",
    hero_subtitle:
      "Knowledge, science, and the future — all in one place. High-quality academic education in a modern environment.",
    hero_cta: "Apply Now",
    hero_cta2: "About Us",

    about_title: "About the Lyceum",
    about_p1:
      "The Muhammad al-Khwarizmi Academic Lyceum is a state academic lyceum operating under the Tashkent University of Information Technology (TUIT). Founded in 2006, it is located on Bogishamol Street in Tashkent.",
    about_p2:
      "The lyceum's primary mission is to identify talented young people, equip them with modern knowledge and skills, and help them prepare for admission to leading higher education institutions.",
    about_p3:
      "The lyceum employs highly qualified teachers in mathematics, physics, chemistry, biology, history, foreign languages, and other subjects.",

    dir_title: "Academic Directions",
    dir_subtitle: "The lyceum offers the following academic tracks",
    dir1_name: "Mathematics, Physics",
    dir1_desc:
      "In-depth study of mathematics and physics. Preparation for technical universities.",
    dir2_name: "Mathematics, English",
    dir2_desc:
      "Specialization in mathematics and English. Teaching based on international standards.",
    adm_title: "Admission Process",
    adm_subtitle: "Follow these steps to apply to the lyceum",
    adm_step1_title: "Registration",
    adm_step1_desc:
      "Register online via the official my.edu.uz website and fill in the required information.",
    adm_step2_title: "Document Submission",
    adm_step2_desc:
      "Submit all required documents within the specified deadline.",
    adm_step3_title: "Entrance Exam",
    adm_step3_desc:
      "Successfully pass the entrance examinations conducted in July.",
    adm_step4_title: "Results",
    adm_step4_desc:
      "Exam results are published on the official website and the admission list is compiled.",

    docs_title: "Required Documents",
    docs_list: [
      "Application form (standard format)",
      "Copy of passport (parents and student)",
      "9th grade certificate and supplement (copy)",
      "4 photos (3x4 cm)",
      "Medical certificate (Form 086)",
      "Privilege documents (if applicable)",
    ],
    docs_deadline: "Document submission deadline:",
    docs_deadline_val: "Annually in May–June (exact dates at my.edu.uz)",
    docs_exam: "Entrance examination:",
    docs_exam_val: "In July (exact date announced separately)",

    faq_title: "Frequently Asked Questions",
    faq_items: [
      {
        q: "How can I apply to the lyceum?",
        a: "To apply, register on my.edu.uz, submit all required documents, and successfully pass the entrance examinations.",
      },
      {
        q: "Which grade students are accepted?",
        a: "Students who have completed 9th grade and hold a basic education certificate are accepted.",
      },
      {
        q: "How long is the study period?",
        a: "The study period is 2 years (grades 10 and 11).", // Fixed from 10-12
      },
      {
        q: "Are there any privileges?",
        a: "Yes, privileges are provided for winners of international, regional, and city olympiads (1st–3rd place), as well as holders of IELTS/TOEFL/Cambridge certificates.",
      },
      {
        q: "Is there a dormitory?",
        a: "There is no dormitory at the lyceum.",
      },
      {
        q: "What directions are available?",
        a: "The lyceum offers 2 academic directions: Exact Sciences (Technics) and Exact Sciences (Economics).",
      },
    ],

    ach_title: "Achievements & Awards",
    ach_subtitle: "Our students' results at international and national level",

    news_title: "Latest News",
    news_all: "All News",
    news_read: "Read More",

    contact_title: "Contact Us",
    contact_address: "Address",
    contact_address_val: "112 Bogishamol Street, Tashkent",
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

    footer_links: "Quick Links",
    footer_contact: "Contact",
    footer_copy: "All rights reserved.",

    maintenance_notice:
      "Notice: this website is under maintenance. Some information and contact channels may be temporarily unavailable. For urgent inquiries: +998 71 235-03-69 or +998 93 103-32-45.",
  },
};

export type TranslationKey = keyof TranslationStructure;
