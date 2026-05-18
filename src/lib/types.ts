export type Guest = {
  id: string;
  invite_code: string;
  guest_name: string;
  family_name: string | null;
  phone: string | null;
  invitation_opened: boolean;
  opened_at: string | null;
  created_at: string;
};

export type PublicRsvp = {
  guestName: string;
  familyName: string;
  attending: boolean;
  totalMembers: number;
};

export type RSVP = {
  id: string;
  guest_id: string;
  attending: boolean;
  total_members: number;
  responded_at: string;
};

export type WeddingSettings = {
  wedding_date: string;
  wedding_time: string;
  venue_name: string;
  venue_link: string;
  rsvp_deadline: string;
};

export type InviteRecord = Guest & {
  rsvps: RSVP[] | null;
};

export type Metrics = {
  totalGuests: number;
  totalInvitationOpens: number;
  totalConfirmed: number;
  totalDeclined: number;
  pendingGuests: number;
  totalMembersAttending: number;
  conversionRate: number;
};
