import { Metadata } from 'next';
import { MessageCircle, Mail, Instagram } from 'lucide-react';
import { getSiteSettings } from '@/lib/api';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQAccordion } from '@/components/contact/FAQAccordion';

export const metadata: Metadata = { title:'Contact Us', description:'Get in touch with LoopedWithLove for custom orders, queries, or just to say hello!' };
export const revalidate = 3600;

export default async function ContactPage() {
  const s = await getSiteSettings();
  const waUrl = `https://wa.me/${s.whatsapp_number.replace(/\D/g,'')}?text=${encodeURIComponent("Hi LoopedWithLove! I have a question about your products 🧶")}`;
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container-max text-center">
          <span className="text-primary font-semibold text-sm block mb-3">Let's Connect</span>
          <h1 className="section-title text-5xl mb-4">Get in Touch 💬</h1>
          <p className="section-subtitle max-w-xl mx-auto">Have a question, want a custom order, or just want to say hi? We'd love to hear from you!</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="font-playfair text-2xl font-bold text-text-primary dark:text-dark-text">Reach Out Directly</h2>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-[#EDFFF4] dark:bg-[#25D366]/10 rounded-3xl border-2 border-[#25D366]/30 hover:border-[#25D366] group transition-all shadow-soft hover:shadow-card-hover">
                <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform"><MessageCircle size={26} className="text-white" /></div>
                <div><p className="font-playfair font-bold text-lg text-[#25D366]">Chat on WhatsApp</p><p className="text-sm text-text-secondary">Fastest response! Usually reply within 1–2 hours</p><p className="text-xs font-semibold text-[#25D366] mt-1">{s.whatsapp_number} →</p></div>
              </a>
              {s.email&&<a href={`mailto:${s.email}`} className="flex items-center gap-4 p-5 card-base hover:shadow-card-hover group transition-all"><div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary"><Mail size={22}/></div><div><p className="font-semibold text-text-primary dark:text-dark-text">Email Us</p><p className="text-sm text-primary">{s.email}</p></div></a>}
              {s.instagram_url&&<a href={s.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 card-base hover:shadow-card-hover group transition-all"><div className="w-12 h-12 bg-[#E1306C]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E1306C] group-hover:text-white transition-all text-[#E1306C]"><Instagram size={22}/></div><div><p className="font-semibold text-text-primary dark:text-dark-text">Instagram DM</p><p className="text-sm text-[#E1306C]">@loopedwithlove</p></div></a>}
            </div>
            <div><h2 className="font-playfair text-2xl font-bold text-text-primary dark:text-dark-text mb-6">Send a Message</h2><ContactForm email={s.email} /></div>
          </div>
          <div className="mt-20"><div className="text-center mb-12"><h2 className="section-title">FAQs ❓</h2><p className="section-subtitle">Everything you need to know</p></div><FAQAccordion /></div>
        </div>
      </section>
    </div>
  );
}
