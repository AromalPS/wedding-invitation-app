"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getInviteByCode, getSettings } from "@/services/invites";

export async function submitRsvp(inviteCode: string, attending: boolean, totalMembers: number) {
  const [invite, settings] = await Promise.all([getInviteByCode(inviteCode), getSettings()]);
  if (!invite) return { ok: false, message: "Invitation not found." };

  if (new Date() >= new Date(settings.rsvp_deadline)) {
    return { ok: false, message: "RSVP submissions are now closed." };
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return { ok: true, message: attending ? "Demo RSVP saved." : "Demo decline saved." };
  }

  const existing = invite.rsvps?.[0];
  if (existing) {
    await supabase
      .from("rsvps")
      .update({
        attending,
        total_members: attending ? totalMembers : 0,
        responded_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("rsvps").insert({
      guest_id: invite.id,
      attending,
      total_members: attending ? totalMembers : 0,
    });
  }

  await supabase.from("analytics").insert({
    guest_id: invite.id,
    event_type: "rsvp_submitted",
  });

  revalidatePath(`/invite/${inviteCode}`);
  return { ok: true, message: "RSVP saved." };
}
