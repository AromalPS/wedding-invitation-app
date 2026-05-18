import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("luxury-border rounded-3xl bg-white/60 shadow-gold backdrop-blur-sm", className)} {...props} />;
}
