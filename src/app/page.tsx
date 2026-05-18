import { InvitationCard } from "@/components/invitation/invitation-card";
import { LoadingScreen } from "@/components/invitation/loading-screen";
import { getSettings } from "@/services/invites";

export default async function Home() {
  const settings = await getSettings();
  return (
    <>
      <LoadingScreen variant="seal" />
      <InvitationCard settings={settings} />
    </>
  );
}
