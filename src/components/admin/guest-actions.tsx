"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GuestActions({
  inviteLink,
  whatsappHref,
  deleteAction,
}: {
  inviteLink: string;
  whatsappHref: string;
  deleteAction: () => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={copyLink}>
        {copied ? "Copied" : "Copy Link"}
      </Button>
      <a href={whatsappHref} target="_blank" rel="noreferrer">
        <Button size="sm" variant="outline">
          WhatsApp
        </Button>
      </a>
      <form action={deleteAction}>
        <Button size="sm" variant="ghost" type="submit">
          Delete
        </Button>
      </form>
    </div>
  );
}
