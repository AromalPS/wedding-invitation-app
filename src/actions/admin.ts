"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { makeInviteCode } from "@/lib/utils";

async function uniqueInviteCode() {
  const supabase = createAdminClient();
  if (!supabase) return makeInviteCode();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = makeInviteCode();
    const { data } = await supabase.from("guests").select("id").eq("invite_code", code).maybeSingle();
    if (!data) return code;
  }
  throw new Error("Could not generate unique invite code.");
}

export async function addGuest(formData: FormData) {
  const supabase = createAdminClient();
  if (!supabase) return;

  await supabase.from("guests").insert({
    invite_code: await uniqueInviteCode(),
    guest_name: String(formData.get("guest_name") ?? ""),
    family_name: String(formData.get("family_name") ?? "") || null,
    phone: String(formData.get("phone") ?? "") || null,
  });
  revalidatePath("/admin/guests");
}

export async function deleteGuest(id: string) {
  const supabase = createAdminClient();
  if (!supabase) return;
  await supabase.from("guests").delete().eq("id", id);
  revalidatePath("/admin/guests");
}

export async function importGuests(formData: FormData) {
  const supabase = createAdminClient();
  const file = formData.get("file");
  if (!supabase || !(file instanceof File)) return;

  const rows = (await file.text())
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(1)
    .map((line) => {
      const [guest_name, phone, family_name] = line.split(",").map((value) => value.trim());
      return { guest_name, phone: phone || null, family_name: family_name || null };
    })
    .filter((row) => row.guest_name);

  const payload = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      invite_code: await uniqueInviteCode(),
    })),
  );

  if (payload.length) await supabase.from("guests").insert(payload);
  revalidatePath("/admin/guests");
}
