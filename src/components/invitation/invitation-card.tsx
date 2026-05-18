import { CalendarDays, MapPin } from "lucide-react";
import { Countdown } from "@/components/invitation/countdown";
import { DefaultRsvpPanel } from "@/components/invitation/default-rsvp-panel";
import { RsvpPanel } from "@/components/invitation/rsvp-panel";
import { StickyCta } from "@/components/invitation/sticky-cta";
import { Card } from "@/components/ui/card";
import { invitationCopy } from "@/lib/constants";
import { formatWeddingDate, formatWeddingTime, formatWeddingWeekday } from "@/lib/utils";
import type { InviteRecord, WeddingSettings } from "@/lib/types";

export function InvitationCard({
  invite,
  settings,
}: {
  invite?: InviteRecord;
  settings: WeddingSettings;
}) {
  const existingRsvp = invite?.rsvps?.[0];
  const salutation = invite
    ? invite.family_name
      ? `${invite.guest_name} & ${invite.family_name}`
      : invite.guest_name
    : "Our Beloved Guests";

  return (
    <>
      <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-28 pt-6 sm:px-6 sm:pt-10">
        <section className="paper-card floral-corner relative overflow-hidden rounded-[2rem] border border-[#b78a55]/25 p-4 sm:p-6">
          <div className="arch-frame relative overflow-hidden px-5 pb-6 pt-8 text-center sm:px-10 sm:pb-10 sm:pt-14">
            <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-[#b78a55]/50 to-transparent" />
            <div className="floating-petal absolute left-5 top-10 h-10 w-10 rounded-full border border-[#b78a55]/25 opacity-70" />
            <div className="floating-petal absolute right-7 top-20 h-7 w-7 rounded-full border border-[#b78a55]/20 opacity-60 [animation-delay:1.2s]" />
            <p className="font-serif text-xl text-[#6f5538]">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            <p className="mt-5 text-xs uppercase tracking-[0.4em] text-[#8f6c35]">Assalamu Alaikum</p>
            <h1 className="mt-3 font-serif text-2xl text-[#423126] sm:text-5xl">{salutation}</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#685646]">
              With gratitude to Allah, we warmly invite you to celebrate our wedding reception.
            </p>
            <div className="mt-6">
              <h2 className="soft-highlight mx-auto w-fit font-serif text-4xl text-[#423126]">{invitationCopy.couple.bridegroom}</h2>
              <p className="mt-1 text-sm text-[#7a6959]">{invitationCopy.couple.bridegroomFamily}</p>
              <p className="my-4 font-serif text-2xl text-[#8f6c35]">&</p>
              <h2 className="soft-highlight mx-auto w-fit font-serif text-4xl text-[#423126]">{invitationCopy.couple.bride}</h2>
              <p className="mt-1 text-sm text-[#7a6959]">{invitationCopy.couple.brideFamily}</p>
            </div>
            <p className="ornament-rule mx-auto mt-6 w-fit text-xs uppercase tracking-[0.35em] text-[#8f6c35]">
              {formatWeddingDate(settings.wedding_date)}
            </p>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          <Card className="paper-card p-6 text-center sm:p-8">
            <p className="mx-auto max-w-xl text-sm leading-7 text-[#685646]">{invitationCopy.quranVerse}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#8f6c35]">{invitationCopy.quranRef}</p>
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#b78a55]/40 to-transparent" />
            <p className="text-sm leading-7 text-[#685646]">{invitationCopy.blessing}</p>
          </Card>

          <Card className="paper-card p-6 text-center sm:p-8">
            <p className="text-sm leading-7 text-[#685646]">{invitationCopy.invitation}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="soft-highlight rounded-2xl border border-[#b78a55]/20 bg-white/50 p-4">
                <CalendarDays className="mx-auto h-5 w-5 text-[#8f6c35]" />
                <p className="mt-3 font-serif text-2xl text-[#423126]">{formatWeddingDate(settings.wedding_date)}</p>
                <p className="font-serif text-2xl text-[#423126]">{formatWeddingWeekday(settings.wedding_date)}</p>
                <p className="text-sm text-[#7a6959]">{formatWeddingTime(settings.wedding_time)}</p>
              </div>
              <a
                className="soft-highlight block rounded-2xl border border-[#b78a55]/20 bg-white/50 p-4 transition hover:bg-white/70"
                href={settings.venue_link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${settings.venue_name} in Google Maps`}
              >
                <MapPin className="mx-auto h-5 w-5 text-[#8f6c35]" />
                <p className="mt-3 font-serif text-2xl text-[#423126]">{settings.venue_name}</p>
                <span className="text-sm text-[#8f6c35] underline-offset-4">Open in Google Maps</span>
              </a>
            </div>
          </Card>

          {invite ? (
            <RsvpPanel inviteCode={invite.invite_code} settings={settings} existingRsvp={existingRsvp} />
          ) : (
            <DefaultRsvpPanel settings={settings} />
          )}

          <Card className="paper-card p-6 text-center sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">Countdown</p>
            <div className="mt-4">
              <Countdown date={settings.wedding_date} time={settings.wedding_time} />
            </div>
          </Card>
        </section>
      </main>
      <StickyCta venueLink={settings.venue_link} />
    </>
  );
}
