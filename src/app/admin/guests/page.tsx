import { addGuest, deleteGuest, importGuests } from "@/actions/admin";
import { GuestActions } from "@/components/admin/guest-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteUrl } from "@/lib/utils";
import { getGuests } from "@/services/admin";

export default async function GuestsPage() {
  const guests = await getGuests();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-serif text-2xl">Add Guest</h2>
          <form action={addGuest} className="mt-4 grid gap-3">
            <input name="guest_name" placeholder="Guest name" required className="h-11 rounded-2xl border border-gold-300/15 bg-white/[0.03] px-4" />
            <input name="family_name" placeholder="Family name" className="h-11 rounded-2xl border border-gold-300/15 bg-white/[0.03] px-4" />
            <input name="phone" placeholder="Phone number" className="h-11 rounded-2xl border border-gold-300/15 bg-white/[0.03] px-4" />
            <Button type="submit">Add Guest</Button>
          </form>
        </Card>
        <Card className="p-5">
          <h2 className="font-serif text-2xl">Bulk CSV Import</h2>
          <p className="mt-2 text-sm text-[#685646]">Expected columns: guest name, phone number, family name</p>
          <form action={importGuests} className="mt-4 grid gap-3">
            <input name="file" type="file" accept=".csv" required className="text-sm" />
            <Button type="submit" variant="outline">
              Upload CSV
            </Button>
          </form>
          <a href="/admin/export" className="mt-4 inline-block text-sm text-gold-100 underline-offset-4 hover:underline">
            Export responses as CSV
          </a>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/50 text-left text-[#6f5538]">
              <tr>
                {["Guest Name", "Status", "Members", "Invitation Opened", "RSVP Status", "Actions"].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => {
                const rsvp = guest.rsvps?.[0];
                const link = `${siteUrl()}/invite/${guest.invite_code}`;
                const message = encodeURIComponent(
                  `Assalamu Alaikum ☺️You are warmly invited to our wedding celebration.\n\nInvitation Link:\n${link}`,
                );
                return (
                  <tr key={guest.id} className="border-t border-[#b78a55]/10 text-[#423126]">
                    <td className="px-4 py-3">{guest.guest_name}</td>
                    <td className="px-4 py-3">{rsvp ? "Responded" : "Pending"}</td>
                    <td className="px-4 py-3">{rsvp?.total_members ?? "—"}</td>
                    <td className="px-4 py-3">{guest.invitation_opened ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{rsvp ? (rsvp.attending ? "Attending" : "Declined") : "Pending"}</td>
                    <td className="px-4 py-3">
                      <GuestActions
                        inviteLink={link}
                        whatsappHref={`https://wa.me/?text=${message}`}
                        deleteAction={deleteGuest.bind(null, guest.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
