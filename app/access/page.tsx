'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_KEY = '1708';

export default function AccessKeyPage() {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('accessGranted') === 'true')      router.replace('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === SECRET_KEY) {
      setSuccess(true);
      sessionStorage.setItem('accessGranted', 'true');
      // Fade out lalu masuk dashboard
      setTimeout(() => {
        document.getElementById('fade-out')?.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 700, fill: 'forwards' }
        );
        setTimeout(() => router.push('/dashboard'), 700);
      }, 800);
    } else {
      setError(true);
      setKey('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <motion.main
      id="fade-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: success ? 0 : 1 }}
      transition={{ duration: 0.7 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4"
    >
      {/* Grid futuristik di background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#34d399 1px, transparent1px), linear-gradient(90deg, #34d399 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <motion.form
        onSubmit={handleSubmit}
        animate={error ? { x: [0, -8, 8, -6, 6, -3, 0] } : {}}
        transition={error ? { duration: 0.4 } : {}}
        className="w-full max-w-sm space-y-8"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl font-light tracking-widest text-white"
          >
            ACCESS KEY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-2 text-xs tracking-[0.3em] text-zinc-500 uppercase"
          >
            Masukkan kunci untuk melanjutkan
          </motion.p>
        </div>

        <motion.input
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          type="password"
          inputMode="numeric"
          autoFocus
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="• • • •"
          className={`w-full rounded-xl border bg-zinc-900/60 px-5 py-4 text-center text-lg tracking-[0.6em] text-white backdrop-blur-md outline-none transition-all duration-300 ${
            error
              ? 'border-red-500/70 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
              : key
                ? 'border-emerald-400/60 shadow-[0_0_25px_rgba(52,211,153,0.15)]'
                : 'border-zinc-800 focus:border-emerald-400/60 focus:shadow-[0_0_25px_rgba(52,211,153,0.15)]'
          }`}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-xs tracking-widest text-red-400"
            >
              Invalid Access Key — Silakan coba lagi
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={!key || success}
          className="w-full rounded-xl border border-emerald-400/30 bg-emerald-500/10 py-4 text-sm font-medium tracking-[0.25em] text-emerald-300 uppercase transition-colors hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {success ? '✓ Granted' : 'Unlock'}
        </motion.button>
      </motion.form>

      {/* Overlay transisi ke dashboard */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-12 w-12 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
