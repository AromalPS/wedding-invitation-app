import { demoMetrics } from "@/lib/demo-data";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Guest, Metrics, RSVP } from "@/lib/types";

export async function getMetrics(): Promise<Metrics> {
  const supabase = createAdminClient();
  if (!supabase) return demoMetrics;

  const [{ count: totalGuests }, { count: totalInvitationOpens }, { data: rsvps }] = await Promise.all([
    supabase.from("guests").select("*", { count: "exact", head: true }),
    supabase.from("analytics").select("*", { count: "exact", head: true }).eq("event_type", "invitation_opened"),
    supabase.from("rsvps").select("*"),
  ]);

  const typedRsvps = (rsvps ?? []) as RSVP[];
  const totalConfirmed = typedRsvps.filter((rsvp) => rsvp.attending).length;
  const totalDeclined = typedRsvps.filter((rsvp) => !rsvp.attending).length;
  const totalMembersAttending = typedRsvps
    .filter((rsvp) => rsvp.attending)
    .reduce((sum, rsvp) => sum + rsvp.total_members, 0);
  const guestCount = totalGuests ?? 0;
  const pendingGuests = Math.max(guestCount - typedRsvps.length, 0);

  return {
    totalGuests: guestCount,
    totalInvitationOpens: totalInvitationOpens ?? 0,
    totalConfirmed,
    totalDeclined,
    pendingGuests,
    totalMembersAttending,
    conversionRate: guestCount ? Math.round((typedRsvps.length / guestCount) * 100) : 0,
  };
}

export async function getGuests(): Promise<Array<Guest & { rsvps: RSVP[] | null }>> {
  const supabase = createAdminClient();
  if (!supabase) return [];

  const { data } = await supabase.from("guests").select("*, rsvps(*)").order("created_at", { ascending: false });
  return (data ?? []) as Array<Guest & { rsvps: RSVP[] | null }>;
}
