import { MetricCard } from "@/components/admin/metric-card";
import { getMetrics } from "@/services/admin";

export default async function AdminOverviewPage() {
  const metrics = await getMetrics();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard label="Total Guests" value={metrics.totalGuests} />
      <MetricCard label="Invitation Opens" value={metrics.totalInvitationOpens} />
      <MetricCard label="Confirmed" value={metrics.totalConfirmed} />
      <MetricCard label="Declined" value={metrics.totalDeclined} />
      <MetricCard label="Pending Guests" value={metrics.pendingGuests} />
      <MetricCard label="Members Attending" value={metrics.totalMembersAttending} />
      <MetricCard label="RSVP Conversion" value={`${metrics.conversionRate}%`} />
    </section>
  );
}
