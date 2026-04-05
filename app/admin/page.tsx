'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

const AdminLogin = dynamic(()=>import('@/components/admin/AdminLogin').then(m=>m.AdminLogin), {ssr:false});
const AdminDashboard = dynamic(()=>import('@/components/admin/Dashboard').then(m=>m.AdminDashboard), {ssr:false,loading:()=><div className="max-w-7xl mx-auto px-4 py-16"><ProductGridSkeleton count={6}/></div>});

export default function AdminPage() {
  const [auth, setAuth] = useState<boolean|null>(null);
  useEffect(()=>{fetch('/api/admin/auth').then(r=>setAuth(r.ok)).catch(()=>setAuth(false));}, []);
  const logout = async ()=>{await fetch('/api/admin/auth',{method:'DELETE'});setAuth(false);};
  if (auth===null) return <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-bg"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"/></div>;
  if (!auth) return <AdminLogin onSuccess={()=>setAuth(true)} />;
  return <AdminDashboard onLogout={logout} />;
}
