import { NextResponse } from "next/server";
import { getGuests } from "@/services/admin";

export async function GET() {
  const guests = await getGuests();
  const rows = [
    ["Guest Name", "Family Name", "Phone", "Invite Code", "Invitation Opened", "RSVP Status", "Members"],
    ...guests.map((guest) => {
      const rsvp = guest.rsvps?.[0];
      return [
        guest.guest_name,
        guest.family_name ?? "",
        guest.phone ?? "",
        guest.invite_code,
        guest.invitation_opened ? "Yes" : "No",
        rsvp ? (rsvp.attending ? "Attending" : "Declined") : "Pending",
        String(rsvp?.total_members ?? ""),
      ];
    }),
  ];
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="wedding-rsvps.csv"',
    },
  });
}
