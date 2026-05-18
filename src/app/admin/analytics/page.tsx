import { MetricCard } from "@/components/admin/metric-card";
import { getMetrics } from "@/services/admin";

export default async function AnalyticsPage() {
  const metrics = await getMetrics();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard label="Invitation Opens" value={metrics.totalInvitationOpens} />
      <MetricCard label="RSVP Conversion" value={`${metrics.conversionRate}%`} />
      <MetricCard label="Confirmed Guests" value={metrics.totalConfirmed} />
      <MetricCard label="Declines" value={metrics.totalDeclined} />
      <MetricCard label="Pending Guests" value={metrics.pendingGuests} />
      <MetricCard label="Total Members Attending" value={metrics.totalMembersAttending} />
    </section>
  );
}
