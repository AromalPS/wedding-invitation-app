"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { submitRsvp } from "@/actions/rsvp";
import { GoldenShower } from "@/components/invitation/golden-shower";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { createGoogleCalendarLink } from "@/lib/calendar";
import { formatWeddingDate, formatWeddingTime } from "@/lib/utils";
import type { RSVP, WeddingSettings } from "@/lib/types";

export function RsvpPanel({
  inviteCode,
  settings,
  existingRsvp,
}: {
  inviteCode: string;
  settings: WeddingSettings;
  existingRsvp?: RSVP;
}) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState(existingRsvp?.total_members || 4);
  const [status, setStatus] = useState<RSVP | undefined>(existingRsvp);
  const [celebrate, setCelebrate] = useState(false);
  const [declined, setDeclined] = useState(existingRsvp ? !existingRsvp.attending : false);
  const [pending, startTransition] = useTransition();
  const closed = new Date() >= new Date(settings.rsvp_deadline);
  const calendarLink = useMemo(() => createGoogleCalendarLink(settings), [settings]);

  function save(attending: boolean, totalMembers = members) {
    startTransition(async () => {
      const result = await submitRsvp(inviteCode, attending, totalMembers);
      if (!result.ok) return;
      const nextStatus = {
        id: status?.id ?? "local",
        guest_id: status?.guest_id ?? "local",
        attending,
        total_members: attending ? totalMembers : 0,
        responded_at: new Date().toISOString(),
      };
      setStatus(nextStatus);
      setDeclined(!attending);
      setOpen(false);
    });
  }

  return (
    <section id="rsvp" className="scroll-mt-8">
      <GoldenShower active={celebrate} />
      <Card className="paper-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">RSVP</p>
        <h2 className="mt-3 font-serif text-3xl text-[#423126]">
          {status?.attending ? "Thank you for your presence." : "Will you join us?"}
        </h2>
        {closed ? (
          <p className="mt-4 text-sm leading-7 text-[#685646]">
            RSVP submissions are now closed. We look forward to your prayers and blessings.
          </p>
        ) : status ? (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-[#685646]">
              {status.attending
                ? `Attendance confirmed for ${status.total_members} ${status.total_members === 1 ? "guest" : "guests"}.`
                : "We’ll miss your presence and keep you in our prayers."}
            </p>
            <div className="flex flex-wrap gap-3">
              {status.attending ? (
                <a href={calendarLink} target="_blank" rel="noreferrer">
                  <Button>Add To Google Calendar</Button>
                </a>
              ) : null}
              <Button variant="outline" onClick={() => setOpen(true)}>
                Edit RSVP
              </Button>
            </div>
          </div>
        ) : declined ? (
          <p className="mt-4 text-sm leading-7 text-[#685646]">We’ll miss your presence and keep you in our prayers.</p>
        ) : (
          <div className="mt-6 grid gap-3">
            <Button
              size="lg"
              onClick={() => {
                setCelebrate(true);
                setTimeout(() => {
                  setCelebrate(false);
                  setOpen(true);
                }, 1100);
              }}
            >
              Yes, InshaAllah
            </Button>
            <Button variant="outline" size="lg" onClick={() => save(false, 0)} disabled={pending}>
              Unfortunately, I Cannot Make It
            </Button>
          </div>
        )}
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">Wonderful</p>
        <h3 className="mt-3 font-serif text-3xl text-[#423126]">We look forward to celebrating this special day with you.</h3>
        <p className="mt-5 text-sm leading-7 text-[#685646]">How many family members will attend including yourself?</p>
        <div className="mt-6 flex items-center justify-center gap-6">
          <Button variant="outline" size="sm" onClick={() => setMembers((value) => Math.max(1, value - 1))} aria-label="Decrease members">
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-10 text-center font-serif text-4xl text-[#423126]">{members}</span>
          <Button variant="outline" size="sm" onClick={() => setMembers((value) => Math.min(15, value + 1))} aria-label="Increase members">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid gap-3">
          <Button onClick={() => save(true)} disabled={pending} className="gap-2">
            <Check className="h-4 w-4" />
            Confirm Attendance
          </Button>
        </div>
      </Dialog>

      {status?.attending ? (
        <Card className="paper-card mt-4 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">Confirmed</p>
          <div className="mt-4 grid gap-2 text-sm text-[#685646]">
            <p>{formatWeddingDate(settings.wedding_date)}</p>
            <p>{formatWeddingTime(settings.wedding_time)}</p>
            <p>{settings.venue_name}</p>
          </div>
        </Card>
      ) : null}
    </section>
  );
}
