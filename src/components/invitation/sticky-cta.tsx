import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCta({ venueLink }: { venueLink: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#a67a44]/15 bg-[#fbf7ef]/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a className="flex-1" href={venueLink} target="_blank" rel="noreferrer">
          <Button variant="outline" className="w-full gap-2" aria-label="View venue on Google Maps">
            <MapPin className="h-4 w-4" />
            View Venue
          </Button>
        </a>
        <a className="flex-1" href="#rsvp">
          <Button className="w-full">RSVP</Button>
        </a>
      </div>
    </div>
  );
}
