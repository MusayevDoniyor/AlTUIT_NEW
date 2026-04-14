export interface Stat {
  year: string;
  rate: string;
  graduates: number;
  admitted: number;
}

export interface AdminMember {
  role: string;
  name: string;
  title: string;
  image: string;
}

export interface Department {
  name: string;
  icon: string;
}

export interface TeacherStats {
  total: number;
  phd: number;
  lead: number;
  superior: number;
  senior: number;
  partTime: number;
}

export interface Subject {
  name: string;
  questions: number;
  weight: number;
}

export interface Track {
  name: string;
  subjects: Subject[];
  maxScore: number;
}

export interface RegulatoryDoc {
  title: string;
  desc: string;
}

export const SITE_DATA = {
  institution: "Muhammad al-Xorazmiy nomidagi TATU akademik litseyi",
  stats: [
    { year: "2021", rate: "81%", graduates: 239, admitted: 194 },
    { year: "2022", rate: "85%", graduates: 211, admitted: 190 },
    { year: "2023", rate: "90%", graduates: 390, admitted: 370 },
  ] as Stat[],
  administration: [
    {
      role: "Direktor",
      name: "Sultanov Djamshid Baxodirovich",
      title: "Texnika fanlari doktori, dotsent",
      image: "",
    },
    {
      role: "Ijrochi direktor",
      name: "Madraximov Alisher Xasanovich",
      title: "",
      image: "",
    },
    {
      role: "Ma'naviy-maarifiy ishlar bo'yicha birinchi o'rinbosar",
      name: "Xudayarova Iroda Boltaboyevna",
      title: "",
      image: "",
    },
    {
      role: "O'quv ishlari bo'yicha direktor o'rinbosari",
      name: "Tashmetova Nadima Yusupovna",
      title: "",
      image: "",
    },
  ] as AdminMember[],
  departments: [
    { name: "Aniq fanlar kafedrasi", icon: "Calculator" },
    { name: "Tabiiy fanlar kafedrasi", icon: "Flask" },
    { name: "Xorijiy tillar kafedrasi", icon: "Languages" },
    { name: "Gumanitar fanlar kafedrasi", icon: "History" },
  ] as Department[],
  teacherStats: {
    total: 36,
    phd: 2,
    lead: 6,
    superior: 15,
    senior: 7,
    partTime: 3,
  } as TeacherStats,
  admission: {
    period: "10-iyunidan 10-iyuliga qadar",
    platform: "my.edu.uz",
    tracks: [
      {
        name: "Aniq fanlar 1 (Texnika)",
        subjects: [
          { name: "Matematika", questions: 20, weight: 3.1 },
          { name: "Fizika", questions: 20, weight: 3.1 },
          { name: "IQ test", questions: 20, weight: 1.1 },
        ],
        maxScore: 146,
      },
      {
        name: "Aniq fanlar 2 (Iqtisod)",
        subjects: [
          { name: "Matematika", questions: 20, weight: 3.1 },
          { name: "Ingliz tili", questions: 20, weight: 3.1 },
          { name: "IQ test", questions: 20, weight: 1.1 },
        ],
        maxScore: 146,
      },
    ] as Track[],
  },
  documents: [
    {
      title: "IQTIDORLI YOSHLARNI SARALAB OLISH TIZIMI VA AKADEMIK LITSEYLAR FAOLIYATINI TAKOMILLASHTIRISH CHORA-TADBIRLARI TO'G'RISIDA",
      desc: "O'ZBEKISTON RESPUBLIKASI PREZIDENTINING QARORI (PQ-4910)",
    },
    {
      title: "AKADEMIK LITSEYLARGA O'QUVCHILARINI TANLAB OLISH, O'QISHGA QABUL QILISH TARTIBI",
      desc: "O'ZBEKISTON RESPUBLIKASI VAZIRLAR MAHKAMASINING QARORI (VM-212)",
    },
    {
      title: "MUHAMMAD AL-XORAZMIY NOMIDAGI TATU AKADEMIK LITSEYI NIZOMI",
      desc: "LITSEY NIZOMI",
    },
    {
      title: "AKADEMIK LITSEY ODOB-AXLOQ KODEKSI",
      desc: "YUKLAB OLISH",
    },
  ] as RegulatoryDoc[],
};
