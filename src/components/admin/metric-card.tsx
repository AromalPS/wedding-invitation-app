import { Card } from "@/components/ui/card";

export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-[#8f6c35]">{label}</p>
      <p className="mt-3 font-serif text-3xl text-[#423126]">{value}</p>
    </Card>
  );
}
