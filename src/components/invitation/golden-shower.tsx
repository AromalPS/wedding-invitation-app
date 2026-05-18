"use client";

import { motion } from "framer-motion";

export function GoldenShower({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 22 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-gold-200 shadow-gold"
          style={{ left: `${(index * 13) % 100}%`, top: "-5%" }}
          animate={{ y: "110vh", opacity: [0, 1, 0], scale: [0.6, 1, 0.8] }}
          transition={{ duration: 1.5, delay: index * 0.03, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
