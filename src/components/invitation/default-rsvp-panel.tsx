"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { createGoogleCalendarLink } from "@/lib/calendar";
import { formatWeddingDate, formatWeddingTime } from "@/lib/utils";
import type { WeddingSettings } from "@/lib/types";

export function DefaultRsvpPanel({ settings }: { settings: WeddingSettings }) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const calendarLink = useMemo(() => createGoogleCalendarLink(settings), [settings]);

  return (
    <section id="rsvp" className="scroll-mt-8">
      <Card className="paper-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">RSVP</p>
        <h2 className="mt-3 font-serif text-3xl text-[#423126]">
          {confirmed ? "Thank you for your presence." : "Will you join us?"}
        </h2>
        {confirmed ? (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-[#685646]">
              Attendance noted for {members} {members === 1 ? "guest" : "guests"}.
            </p>
            <a href={calendarLink} target="_blank" rel="noreferrer">
              <Button>Add To Google Calendar</Button>
            </a>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            <Button size="lg" onClick={() => setOpen(true)}>
              Yes, InshaAllah
            </Button>
            <p className="text-sm leading-7 text-[#685646]">
              Shared invitation link? You can still RSVP here with your name.
            </p>
          </div>
        )}
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">Wonderful</p>
        <h3 className="mt-3 font-serif text-3xl text-[#423126]">We look forward to celebrating this special day with you.</h3>
        <div className="mt-5 grid gap-3">
          <input
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Your name"
            className="h-11 rounded-2xl border border-[#b78a55]/20 bg-white/70 px-4 text-[#423126] outline-none"
          />
          <input
            value={familyName}
            onChange={(event) => setFamilyName(event.target.value)}
            placeholder="Family name (optional)"
            className="h-11 rounded-2xl border border-[#b78a55]/20 bg-white/70 px-4 text-[#423126] outline-none"
          />
        </div>
        <p className="mt-5 text-sm leading-7 text-[#685646]">How many family members will attend including yourself?</p>
        <div className="mt-5 flex items-center justify-center gap-6">
          <Button variant="outline" size="sm" onClick={() => setMembers((value) => Math.max(1, value - 1))}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-10 text-center font-serif text-4xl text-[#423126]">{members}</span>
          <Button variant="outline" size="sm" onClick={() => setMembers((value) => Math.min(15, value + 1))}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid gap-3">
          <Button
            disabled={!guestName.trim()}
            onClick={() => {
              setConfirmed(true);
              setOpen(false);
            }}
          >
            Confirm Attendance
          </Button>
        </div>
      </Dialog>

      {confirmed ? (
        <Card className="paper-card mt-4 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">Confirmed</p>
          <div className="mt-4 grid gap-2 text-sm text-[#685646]">
            <p>{guestName}</p>
            {familyName ? <p>{familyName}</p> : null}
            <p>{formatWeddingDate(settings.wedding_date)}</p>
            <p>{formatWeddingTime(settings.wedding_time)}</p>
            <p>{settings.venue_name}</p>
          </div>
        </Card>
      ) : null}
    </section>
  );
}
