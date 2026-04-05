'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactForm({ email }: { email: string }) {
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r=>setTimeout(r,600));
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    setDone(true); setLoading(false);
  };

  if (done) return (
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="card-base p-10 text-center">
      <CheckCircle size={56} className="text-success mx-auto mb-4" />
      <h3 className="font-playfair text-2xl font-bold text-text-primary dark:text-dark-text mb-2">Message Sent! 🎉</h3>
      <p className="text-text-secondary">Thank you for reaching out! We'll get back to you soon. 💝</p>
      <button onClick={()=>{setDone(false);setForm({name:'',email:'',subject:'',message:''});}} className="mt-6 text-primary font-semibold text-sm hover:underline">Send another message</button>
    </motion.div>
  );

  return (
    <form onSubmit={submit} className="card-base p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-1.5">Your Name *</label>
          <input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Priya Sharma" className="input-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-1.5">Email *</label>
          <input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="priya@example.com" className="input-base" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-1.5">Subject *</label>
        <select required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="input-base">
          <option value="">Select a topic...</option>
          <option>Custom Order Enquiry</option><option>Product Question</option>
          <option>Order Status</option><option>Bulk / Wholesale Order</option>
          <option>Return / Exchange</option><option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-1.5">Message *</label>
        <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us how we can help you..." className="input-base resize-none" />
      </div>
      <Button type="submit" loading={loading} icon={<Send size={16}/>} iconPosition="right" className="w-full justify-center" size="lg">Send Message</Button>
    </form>
  );
}
