export type Lang = "uz" | "ru" | "en";

export const translations = {
  uz: {
    // Nav
    nav_home: "Bosh sahifa",
    nav_about: "Litsey haqida",
    nav_about_short: "Litsey haqida qisqa ma'lumot",
    nav_leadership: "Rahbariyat",
    nav_teachers: "Pedagog xodimlar",
    nav_base: "Moddiy-texnik baza",
    nav_admissions: "Abituriyentlar",
    nav_directions: "Yo'nalishlar",
    nav_rules: "Kirish qoidalari",
    nav_docs: "Hujjatlar va muddatlar",
    nav_faq: "Ko'p beriladigan savollar",
    nav_science: "Ilmiy hayot",
    nav_partners: "Hamkorlik",
    nav_achievements: "Yutuqlar",
    nav_news: "Yangiliklar",
    nav_contact: "Bog'lanish",

    header_admin: "Litsey ma'muriyati",
    header_hours: "Dushanba - Shanba, 8:30 - 16:00",
    header_transport: "Jamoat transportlari: 19, 38, 50, 63, 115",

    // Hero
    hero_badge: "Toshkent axborot texnologiyalari universiteti",
    hero_title: "Muhammad al-Xorazmiy Akademik Litseyi",
    hero_subtitle:
      "Bilim, ilm va kelajak — barchasi bir joyda. Zamonaviy ta'lim muhitida yuqori sifatli akademik ta'lim.",
    hero_cta: "Qabul haqida",
    hero_cta2: "Litsey haqida",
    hero_stat1: "O'quvchi",
    hero_stat2: "Pedagog",
    hero_stat3: "Yo'nalish",
    hero_stat4: "Yil tajriba",

    // About section
    about_title: "Litsey haqida",
    about_p1:
      "Muhammad al-Xorazmiy nomidagi Akademik Litsey – Toshkent axborot texnologiyalari universiteti (TATU) huzurida faoliyat yurituvchi davlat akademik litseyi hisoblanadi. Litsey 1993-yilda tashkil etilgan bo'lib, Toshkent shahri Bog'ishamol ko'chasida joylashgan.",
    about_p2:
      "Litsey o'z oldiga qo'ygan asosiy maqsad — iqtidorli yoshlarni aniqlash, ularni zamonaviy bilim va ko'nikmalar bilan qurollantirish hamda oliy o'quv yurtlariga munosib tayyorgarlik ko'rishga yordam berishdir.",
    about_p3:
      "Litseyda matematika, fizika, kimyo, biologiya, tarix, chet tillari va boshqa fanlar bo'yicha yuqori malakali pedagog xodimlar dars o'tishadi.",

    // Directions
    dir_title: "Ta'lim yo'nalishlari",
    dir_subtitle: "Litseyda quyidagi akademik yo'nalishlar mavjud",
    dir1_name: "Aniq fanlar – 1",
    dir1_desc:
      "Matematika, fizika va informatika fanlari chuqurlashtirilgan holda o'rgatiladi. Texnik oliy ta'lim muassasalariga tayyorlash.",
    dir2_name: "Aniq fanlar – 2",
    dir2_desc:
      "Matematika, ingliz tili va iqtisodiyot yo'nalishi. Xalqaro iqtisodiyot, moliya va biznes sohasiga yo'naltirish.",
    dir3_name: "Tabiiy fanlar",
    dir3_desc:
      "Biologiya, kimyo va tibbiyot yo'nalishi. Tibbiyot va farmatsevtika oliy o'quv yurtlariga tayyorgarlik.",
    dir4_name: "Ijtimoiy-gumanitar fanlar",
    dir4_desc:
      "Tarix, huquq, falsafa va ijtimoiy fanlar. Huquqshunoslik va gumanitar oliy ta'limga yo'naltirish.",

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
        a: "Litsey ta'limi 3 yil davom etadi (10, 11, 12-sinflar).",
      },
      {
        q: "Imtiyozlar mavjudmi?",
        a: "Ha, xalqaro, viloyat va shahar olimpiadalari g'oliblari (1-3 o'rin) va IELTS/TOEFL/Cambridge sertifikatlariga ega abituriyentlar uchun imtiyozlar belgilangan.",
      },
      {
        q: "Litseyda yotoqxona bormi?",
        a: "Litsey tomonidan yotoqxona xizmati taqdim etiladi. Batafsil ma'lumot uchun litseyga murojaat qiling.",
      },
      {
        q: "Qanday yo'nalishlar mavjud?",
        a: "Litseyda 4 ta akademik yo'nalish mavjud: Aniq fanlar-1, Aniq fanlar-2, Tabiiy fanlar va Ijtimoiy-gumanitar fanlar.",
      },
    ],

    // Partners
    partners_title: "Hamkorlar",
    partners_subtitle:
      "Litsey turli xalqaro va mahalliy tashkilotlar bilan faol hamkorlik qiladi",

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
    contact_phone_val: "+998 71 235 03 69",
    contact_email: "Elektron pochta",
    contact_email_val: "info@tatual.uz",
    contact_schedule: "Ish vaqti",
    contact_schedule_val: "Dushanba – Shanba: 8:30 – 16:00",
    contact_send: "Xabar yuborish",
    contact_name: "Ismingiz",
    contact_msg: "Xabar",
    contact_submit: "Yuborish",

    // Footer
    footer_desc:
      "TATU huzuridagi Muhammad al-Xorazmiy nomidagi Akademik Litsey — yuqori sifatli akademik ta'lim markazi.",
    footer_links: "Tezkor havolalar",
    footer_contact: "Aloqa",
    footer_copy: "Barcha huquqlar himoyalangan.",
  },

  ru: {
    nav_home: "Главная",
    nav_about: "О лицее",
    nav_about_short: "Краткая информация",
    nav_leadership: "Руководство",
    nav_teachers: "Педагогический состав",
    nav_base: "Материально-техническая база",
    nav_admissions: "Абитуриентам",
    nav_directions: "Направления",
    nav_rules: "Правила приёма",
    nav_docs: "Документы и сроки",
    nav_faq: "Часто задаваемые вопросы",
    nav_science: "Научная жизнь",
    nav_partners: "Сотрудничество",
    nav_achievements: "Достижения",
    nav_news: "Новости",
    nav_contact: "Контакты",

    header_admin: "Администрация лицея",
    header_hours: "Понедельник - Суббота, 8:30 - 16:00",
    header_transport: "Общественный транспорт: 19, 38, 50, 63, 115",

    hero_badge: "Ташкентский университет информационных технологий",
    hero_title: "Академический лицей имени Мухаммада аль-Хорезми",
    hero_subtitle:
      "Знания, наука и будущее — всё в одном месте. Качественное академическое образование в современной среде.",
    hero_cta: "Поступление",
    hero_cta2: "О лицее",
    hero_stat1: "Учеников",
    hero_stat2: "Педагогов",
    hero_stat3: "Направлений",
    hero_stat4: "Лет опыта",

    about_title: "О лицее",
    about_p1:
      "Академический лицей имени Мухаммада аль-Хорезми — государственный академический лицей при Ташкентском университете информационных технологий (ТУИТ). Лицей основан в 1993 году и расположен на улице Богишамол в Ташкенте.",
    about_p2:
      "Основная цель лицея — выявление талантливых молодых людей, вооружение их современными знаниями и навыками, а также подготовка к поступлению в ведущие высшие учебные заведения.",
    about_p3:
      "В лицее преподают высококвалифицированные педагоги по математике, физике, химии, биологии, истории, иностранным языкам и другим предметам.",

    dir_title: "Образовательные направления",
    dir_subtitle: "В лицее представлены следующие академические направления",
    dir1_name: "Точные науки – 1",
    dir1_desc:
      "Углублённое изучение математики, физики и информатики. Подготовка к техническим высшим учебным заведениям.",
    dir2_name: "Точные науки – 2",
    dir2_desc:
      "Математика, английский язык и экономика. Подготовка в сфере международной экономики, финансов и бизнеса.",
    dir3_name: "Естественные науки",
    dir3_desc:
      "Биология, химия и медицинское направление. Подготовка к медицинским и фармацевтическим вузам.",
    dir4_name: "Социально-гуманитарные науки",
    dir4_desc:
      "История, право, философия и социальные науки. Подготовка к гуманитарному высшему образованию.",

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
        a: "Обучение в лицее длится 3 года (10, 11, 12 классы).",
      },
      {
        q: "Существуют ли льготы?",
        a: "Да, льготы предусмотрены для победителей международных, областных и городских олимпиад (1-3 места), а также для обладателей сертификатов IELTS/TOEFL/Cambridge.",
      },
      {
        q: "Есть ли общежитие?",
        a: "Лицей предоставляет услуги общежития. Для получения подробной информации обратитесь в лицей.",
      },
      {
        q: "Какие направления существуют?",
        a: "В лицее доступны 4 академических направления: Точные науки-1, Точные науки-2, Естественные науки и Социально-гуманитарные науки.",
      },
    ],

    partners_title: "Партнёры",
    partners_subtitle:
      "Лицей активно сотрудничает с различными международными и отечественными организациями",

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
    contact_phone_val: "+998 71 235 03 69",
    contact_email: "Эл. почта",
    contact_email_val: "info@tatual.uz",
    contact_schedule: "Режим работы",
    contact_schedule_val: "Понедельник – Суббота: 8:30 – 16:00",
    contact_send: "Написать нам",
    contact_name: "Ваше имя",
    contact_msg: "Сообщение",
    contact_submit: "Отправить",

    footer_desc:
      "Академический лицей имени Мухаммада аль-Хорезми при ТУИТ — центр качественного академического образования.",
    footer_links: "Быстрые ссылки",
    footer_contact: "Контакты",
    footer_copy: "Все права защищены.",
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_about_short: "Brief Information",
    nav_leadership: "Leadership",
    nav_teachers: "Teaching Staff",
    nav_base: "Facilities",
    nav_admissions: "Admissions",
    nav_directions: "Directions",
    nav_rules: "Admission Rules",
    nav_docs: "Documents & Deadlines",
    nav_faq: "FAQ",
    nav_science: "Academic Life",
    nav_partners: "Partners",
    nav_achievements: "Achievements",
    nav_news: "News",
    nav_contact: "Contact",

    header_admin: "Lyceum administration",
    header_hours: "Monday - Saturday, 8:30 - 16:00",
    header_transport: "Public transport: 19, 38, 50, 63, 115",

    hero_badge: "Tashkent University of Information Technology",
    hero_title: "Muhammad al-Khwarizmi Academic Lyceum",
    hero_subtitle:
      "Knowledge, science, and the future — all in one place. High-quality academic education in a modern environment.",
    hero_cta: "Apply Now",
    hero_cta2: "About Us",
    hero_stat1: "Students",
    hero_stat2: "Teachers",
    hero_stat3: "Directions",
    hero_stat4: "Years of Experience",

    about_title: "About the Lyceum",
    about_p1:
      "The Muhammad al-Khwarizmi Academic Lyceum is a state academic lyceum operating under the Tashkent University of Information Technology (TUIT). Founded in 1993, it is located on Bogishamol Street in Tashkent.",
    about_p2:
      "The lyceum's primary mission is to identify talented young people, equip them with modern knowledge and skills, and help them prepare for admission to leading higher education institutions.",
    about_p3:
      "The lyceum employs highly qualified teachers in mathematics, physics, chemistry, biology, history, foreign languages, and other subjects.",

    dir_title: "Academic Directions",
    dir_subtitle: "The lyceum offers the following academic tracks",
    dir1_name: "Exact Sciences – 1",
    dir1_desc:
      "In-depth study of mathematics, physics, and computer science. Preparation for technical universities.",
    dir2_name: "Exact Sciences – 2",
    dir2_desc:
      "Mathematics, English, and economics. Preparation for international economics, finance, and business.",
    dir3_name: "Natural Sciences",
    dir3_desc:
      "Biology, chemistry, and medical track. Preparation for medical and pharmaceutical higher education.",
    dir4_name: "Social & Humanitarian Sciences",
    dir4_desc:
      "History, law, philosophy, and social sciences. Preparation for humanities higher education.",

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
        a: "The lyceum education lasts 3 years (grades 10, 11, 12).",
      },
      {
        q: "Are there any privileges?",
        a: "Yes, privileges are provided for winners of international, regional, and city olympiads (1st–3rd place), as well as holders of IELTS/TOEFL/Cambridge certificates.",
      },
      {
        q: "Is there a dormitory?",
        a: "The lyceum provides dormitory services. Contact the lyceum for details.",
      },
      {
        q: "What directions are available?",
        a: "The lyceum offers 4 academic directions: Exact Sciences-1, Exact Sciences-2, Natural Sciences, and Social & Humanitarian Sciences.",
      },
    ],

    partners_title: "Partners",
    partners_subtitle:
      "The lyceum actively cooperates with various international and local organizations",

    ach_title: "Achievements & Awards",
    ach_subtitle: "Our students' results at international and national level",

    news_title: "Latest News",
    news_all: "All News",
    news_read: "Read More",

    contact_title: "Contact Us",
    contact_address: "Address",
    contact_address_val: "112 Bogishamol Street, Tashkent",
    contact_phone: "Phone",
    contact_phone_val: "+998 71 235 03 69",
    contact_email: "Email",
    contact_email_val: "info@tatual.uz",
    contact_schedule: "Working Hours",
    contact_schedule_val: "Monday – Saturday: 8:30 – 16:00",
    contact_send: "Send Us a Message",
    contact_name: "Your Name",
    contact_msg: "Message",
    contact_submit: "Send",

    footer_desc:
      "Muhammad al-Khwarizmi Academic Lyceum at TUIT — a center of quality academic education.",
    footer_links: "Quick Links",
    footer_contact: "Contact",
    footer_copy: "All rights reserved.",
  },
} as const;

export type TranslationKey = keyof typeof translations.uz;
