'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Jika sudah pernah login, langsung ke dashboard
    if (sessionStorage.getItem('accessGranted') === 'true') {
      router.replace('/dashboard');
      return;
    }

    // Redirect ke access key setelah animasi selesai
    const = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => router.push('/access'), 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      {/* Glow ambient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.6, 0.4], scale: 1.4 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
      />

      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, scale: 0.3, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-gradient-to-b from-white via-emerald-200 to-emerald-500 bg-clip-text text-[120px] font-bold text-transparent md:text-[160px]"
        >
          Y
        </motion.h1>

        {/* Ring dekoratif */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { delay: 1, duration: 1 },
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-[-30px] rounded-full border border-emerald-500/30"
        >
          <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-16 text-xs font-light tracking-[0.5em] text-zinc-500 uppercase"
      >
        Trading Bot Dashboard
      </motion.p>

      {/* Exit animation saat pindah halaman */}
      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black"
        />
      )}
    </main>
  );
}
