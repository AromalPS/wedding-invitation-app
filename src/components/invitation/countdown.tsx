"use client";

import { useEffect, useState } from "react";

function formatCountdown(targetDate: string, targetTime: string) {
  const safeDate = targetDate.includes("T") ? targetDate.slice(0, 10) : targetDate;
  const safeTime = targetTime.length === 5 ? `${targetTime}:00` : targetTime;
  const target = new Date(`${safeDate}T${safeTime}+05:30`).getTime();
  if (Number.isNaN(target)) return "Date to be announced";
  const diff = target - Date.now();
  if (diff <= 0) return "The celebration has begun";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${days} Days • ${hours} Hours • ${String(minutes).padStart(2, "0")} Minutes`;
}

export function Countdown({ date, time }: { date: string; time: string }) {
  const [value, setValue] = useState(() => formatCountdown(date, time));

  useEffect(() => {
    const timer = setInterval(() => setValue(formatCountdown(date, time)), 60_000);
    return () => clearInterval(timer);
  }, [date, time]);

  return <p className="font-serif text-2xl tracking-wide text-[#423126] sm:text-3xl">{value}</p>;
}
