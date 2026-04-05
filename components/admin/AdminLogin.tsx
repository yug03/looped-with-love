'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { YarnIcon } from '@/components/ui/Icons';

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr('');
    try {
      const res = await fetch('/api/admin/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:pw}) });
      if (res.ok) { onSuccess(); } else { setErr('Incorrect password. Please try again.'); setPw(''); }
    } catch { setErr('Something went wrong. Please try again.'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center px-4">
      <motion.div initial={{opacity:0,y:30,scale:0.95}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.4}} className="w-full max-w-md">
        <div className="card-base p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4"><YarnIcon className="w-9 h-9 text-primary" /></div>
            <h1 className="font-playfair text-2xl font-bold text-text-primary dark:text-dark-text">Admin Panel</h1>
            <p className="text-text-secondary text-sm mt-1">LoopedWithLove Management</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-2">Admin Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                <input type={show?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter admin password" className="input-base pl-10 pr-10" required autoFocus />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {err && <motion.p initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} className="text-sm text-danger bg-danger/10 px-4 py-2.5 rounded-xl">{err}</motion.p>}
            <Button type="submit" loading={loading} icon={<Shield size={16} />} className="w-full justify-center" size="lg">Access Dashboard</Button>
          </form>
          <p className="text-xs text-center text-text-secondary mt-6">🔒 Secure admin access. Session expires in 24 hours.</p>
        </div>
      </motion.div>
    </div>
  );
}
