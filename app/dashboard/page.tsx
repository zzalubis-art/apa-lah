'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('accessGranted') !== 'true') {
      router.replace('/');
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) return null;

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-zinc-950 p-8"
    >
      <h1 className="text-2xl font-light tracking-widest text-white">
        DASHBOARD
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Selamat datang! Konten trading bot Anda di sini.
      </p>
    </motion.main>
  );
}
