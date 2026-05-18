import { fallbackSettings } from "@/lib/constants";
import type { InviteRecord, Metrics } from "@/lib/types";

export const demoInvite: InviteRecord = {
  id: "demo-guest",
  invite_code: "ABX92K",
  guest_name: "Ameen",
  family_name: "Family",
  phone: null,
  invitation_opened: true,
  opened_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  rsvps: [],
};

export const demoMetrics: Metrics = {
  totalGuests: 120,
  totalInvitationOpens: 92,
  totalConfirmed: 61,
  totalDeclined: 11,
  pendingGuests: 48,
  totalMembersAttending: 228,
  conversionRate: 60,
};

export const demoSettings = fallbackSettings;
