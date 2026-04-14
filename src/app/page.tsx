import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { AboutSection } from "@/components/sections/AboutSection";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Features />
      <AboutSection />
      <NewsGrid />
      <AdmissionCTA />
      
      {/* Short Map/Contact Recap */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-brand-primary text-sm font-black uppercase tracking-[0.2em]">Manzilimiz</h2>
                <h3 className="text-4xl font-display text-slate-900">Bizni Topish Oson</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <p className="font-bold text-slate-900 mb-1">Markaziy Bino</p>
                  <p className="text-slate-500 text-sm">Toshkent 100084, Amir Temur shox ko‘chasi 108 uy</p>
                </div>
                
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <p className="font-bold text-slate-900 mb-1">Transport</p>
                  <p className="text-slate-500 text-sm">Jamoat transportlari: 19, 38, 50, 63, 115</p>
                </div>

                <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <p className="font-bold text-slate-900 mb-1">Ish Grafigi</p>
                  <p className="text-slate-500 text-sm">Dushanba - Shanba: 8:30 - 16:00</p>
                </div>
              </div>
           </div>
           
           <div className="rounded-[2.5rem] overflow-hidden h-[450px] shadow-2xl border-8 border-white bg-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.945802878696!2d69.2844838765439!3d41.331818900115045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b544372e9d3%3A0xc023d8376ee17804!2sToshkent%20axborot%20texnologiyalari%20universiteti%20akademik%20litseyi!5e0!3m2!1suz!2s!4v1713075000000!5m2!1suz!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
           </div>
        </div>
      </section>
    </div>
  );
}
