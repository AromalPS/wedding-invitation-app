"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoaderVariant = "floral" | "arch" | "seal";

export function LoadingScreen({ variant = "seal" }: { variant?: LoaderVariant }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="loader-wash fixed inset-0 z-50 grid place-items-center bg-[#f6f1e8]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {variant === "floral" ? <FloralLoader /> : null}
      {variant === "arch" ? <ArchLoader /> : null}
      {variant === "seal" ? <SealLoader /> : null}
    </motion.div>
  );
}

function FloralLoader() {
  return (
    <div className="relative grid h-44 w-44 place-items-center">
      <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full text-[#9a7131]" initial="hidden" animate="visible">
        <motion.path
          d="M60 22C64 38 79 39 88 30C87 45 96 57 104 60C92 64 88 78 93 92C79 88 67 95 60 108C53 95 41 88 27 92C32 78 28 64 16 60C24 57 33 45 32 30C41 39 56 38 60 22Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
          }}
        />
      </motion.svg>
      <motion.div className="absolute inset-0 rounded-full border border-[#b78a55]/20" animate={{ rotate: 360, scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      <div className="font-serif text-5xl tracking-[0.2em] text-[#8f6c35]">MN</div>
    </div>
  );
}

function ArchLoader() {
  return (
    <div className="relative grid h-48 w-48 place-items-center overflow-hidden">
      <motion.svg viewBox="0 0 160 180" className="absolute inset-0 h-full w-full text-[#9a7131]" initial="hidden" animate="visible">
        <motion.path
          d="M28 158V82C28 42 53 20 80 20C107 20 132 42 132 82V158"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1, transition: { duration: 1.35, ease: "easeInOut" } },
          }}
        />
      </motion.svg>
      <motion.div
        className="absolute h-20 w-28 rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.4, delay: 1.1, ease: "easeInOut" }}
      />
      <motion.div
        className="font-serif text-5xl tracking-[0.2em] text-[#8f6c35]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
      >
        MN
      </motion.div>
    </div>
  );
}

function SealLoader() {
  return (
    <div className="relative grid h-44 w-44 place-items-center">
      <motion.div
        className="absolute inset-2 rounded-full border border-[#b78a55]/35 bg-[#f3e2cf]"
        initial={{ scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-5 rounded-full border border-[#8f6c35]/30"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.22 }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ boxShadow: "0 0 0 rgba(143,108,53,0)" }}
        animate={{ boxShadow: "0 0 28px rgba(143,108,53,0.2)" }}
        transition={{ duration: 1.1, delay: 0.4 }}
      />
      <motion.div
        className="font-serif text-5xl tracking-[0.2em] text-[#8f6c35]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.98] }}
        transition={{ duration: 2.7, times: [0, 0.15, 0.82, 1], delay: 0.12, ease: "easeInOut" }}
      >
        MN
      </motion.div>
    </div>
  );
}
