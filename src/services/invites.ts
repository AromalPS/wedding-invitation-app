import { demoInvite, demoSettings } from "@/lib/demo-data";
import { createAdminClient } from "@/lib/supabase/admin";
import type { InviteRecord, WeddingSettings } from "@/lib/types";

export async function getSettings(): Promise<WeddingSettings> {
  const supabase = createAdminClient();
  if (!supabase) return demoSettings;

  const { data } = await supabase.from("settings").select("*").single();
  return data ?? demoSettings;
}

export async function getInviteByCode(inviteCode: string): Promise<InviteRecord | null> {
  const supabase = createAdminClient();
  if (!supabase) return inviteCode === demoInvite.invite_code ? demoInvite : null;

  const { data } = await supabase
    .from("guests")
    .select("*, rsvps(*)")
    .eq("invite_code", inviteCode)
    .maybeSingle();

  return data as InviteRecord | null;
}

export async function markInviteOpened(invite: InviteRecord) {
  const supabase = createAdminClient();
  if (!supabase || invite.invitation_opened) return;

  await supabase
    .from("guests")
    .update({ invitation_opened: true, opened_at: new Date().toISOString() })
    .eq("id", invite.id);

  await supabase.from("analytics").insert({
    guest_id: invite.id,
    event_type: "invitation_opened",
  });
}
