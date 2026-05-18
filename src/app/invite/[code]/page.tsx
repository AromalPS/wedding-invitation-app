import { notFound } from "next/navigation";
import { InvitationCard } from "@/components/invitation/invitation-card";
import { LoadingScreen } from "@/components/invitation/loading-screen";
import { getInviteByCode, getSettings, markInviteOpened } from "@/services/invites";

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const [invite, settings] = await Promise.all([getInviteByCode(code), getSettings()]);
  if (!invite) notFound();
  await markInviteOpened(invite);

  return (
    <>
      <LoadingScreen variant="arch" />
      <InvitationCard invite={invite} settings={settings} />
    </>
  );
}
