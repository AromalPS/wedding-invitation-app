import { demoMetrics } from "@/lib/demo-data";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Guest, Metrics, RSVP } from "@/lib/types";

export async function getMetrics(): Promise<Metrics> {
  const supabase = createAdminClient();
  if (!supabase) return demoMetrics;

  const [{ count: totalGuests }, { count: totalInvitationOpens }, { data: rsvps, error: rsvpError }] = await Promise.all([
    supabase.from("guests").select("*", { count: "exact", head: true }),
    supabase.from("analytics").select("*", { count: "exact", head: true }).eq("event_type", "invitation_opened"),
    supabase.from("rsvps").select("id, guest_id, attending, total_members, responded_at"),
  ]);

  if (rsvpError) {
    throw new Error(`Unable to load RSVP metrics: ${rsvpError.message}`);
  }

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

  const [{ data: guests, error: guestError }, { data: rsvps, error: rsvpError }] = await Promise.all([
    supabase.from("guests").select("*").order("created_at", { ascending: false }),
    supabase.from("rsvps").select("id, guest_id, attending, total_members, responded_at"),
  ]);

  if (guestError) throw new Error(`Unable to load guests: ${guestError.message}`);
  if (rsvpError) throw new Error(`Unable to load guest RSVPs: ${rsvpError.message}`);

  const rsvpsByGuest = new Map<string, RSVP[]>();
  for (const rsvp of (rsvps ?? []) as RSVP[]) {
    const existing = rsvpsByGuest.get(rsvp.guest_id) ?? [];
    existing.push(rsvp);
    rsvpsByGuest.set(rsvp.guest_id, existing);
  }

  return ((guests ?? []) as Guest[]).map((guest) => ({
    ...guest,
    rsvps: rsvpsByGuest.get(guest.id) ?? [],
  }));
}
