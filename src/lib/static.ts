import { Calculator, Globe } from "lucide-react";

export const dirColors = [
  { bg: "linear-gradient(135deg,#0f2347,#1a3a6e)", accent: "#c8a96e" },
  { bg: "linear-gradient(135deg,#1a3a6e,#2d5bb5)", accent: "#dfc08a" },
];

export const dirIcons = [Calculator, Globe];

export const dirSubjects = {
  uz: [
    ["Matematika", "Fizika"],
    ["Matematika", "Ingliz tili"],
  ],
  ru: [
    ["Математика", "Физика"],
    ["Математика", "Английский"],
  ],
  en: [
    ["Mathematics", "Physics"],
    ["Mathematics", "English"],
  ],
};

export const ABOUT_DEPARTMENTS = [
  {
    nameUz: "Matematika va fizika",
    nameRu: "Математика и физика",
    nameEn: "Mathematics & Physics",
    color: "#1a3a6e",
    keywords: ["matematik", "fizik", "algebra", "geometri"],
  },
  {
    nameUz: "Informatika va texnologiya",
    nameRu: "Информатика и технологии",
    nameEn: "Informatics & Technology",
    color: "#2d5bb5",
    keywords: ["informatik", "texnolog", "dasturlash", "kompyuter"],
  },
  {
    nameUz: "Kimyo va biologiya",
    nameRu: "Химия и биология",
    nameEn: "Chemistry & Biology",
    color: "#1d7a55",
    keywords: ["kimyo", "biologi"],
  },
  {
    nameUz: "Tarix va ijtimoiy fanlar",
    nameRu: "История и обществознание",
    nameEn: "History & Social Studies",
    color: "#c8a96e",
    keywords: ["tarix", "ijtimoiy", "huquq", "iqtisod"],
  },
  {
    nameUz: "Chet tillari",
    nameRu: "Иностранные языки",
    nameEn: "Foreign Languages",
    color: "#6032bf",
    keywords: ["ingliz", "chet tili", "nemis", "fransuz"],
  },
  {
    nameUz: "Ona tili va adabiyot",
    nameRu: "Родной язык и литература",
    nameEn: "Native Language & Literature",
    color: "#b91c1c",
    keywords: ["ona tili", "adabiyot"],
  },
];

export const CONTACT_DEPARTMENTS = [
  {
    titleUz: "Qabul bo'limi",
    titleRu: "Приёмная комиссия",
    titleEn: "Admissions Office",
    phone: "+998 71 235-03-69",
    email: "qabul@tatual.uz",
    color: "#1a3a6e",
  },
  {
    titleUz: "O'quv ishlari bo'limi",
    titleRu: "Учебный отдел",
    titleEn: "Academic Department",
    phone: "+998 93 222-06-11",
    email: "akademik@tatual.uz",
    color: "#2d5bb5",
  },
  {
    titleUz: "Moddiy-texnik bo'lim",
    titleRu: "Хозяйственный отдел",
    titleEn: "Facilities Department",
    phone: "+998 93 222-06-11",
    email: "texnik@tatual.uz",
    color: "#1d7a55",
  },
];
