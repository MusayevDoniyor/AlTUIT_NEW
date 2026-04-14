'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Directions from '@/components/Directions';
import Admission from '@/components/Admission';
import FAQ from '@/components/FAQ';
import Achievements from '@/components/Achievements';
import Partners from '@/components/Partners';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState<Lang>('uz');

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Stats lang={lang} />
      <Directions lang={lang} />
      <Admission lang={lang} />
      <FAQ lang={lang} />
      <Achievements lang={lang} />
      <Partners lang={lang} />
      <News lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
