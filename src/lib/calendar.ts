import type { WeddingSettings } from "@/lib/types";

export function createGoogleCalendarLink(settings: WeddingSettings) {
  const start = `${settings.wedding_date.replaceAll("-", "")}T${settings.wedding_time.replace(":", "")}00`;
  const [hours, minutes] = settings.wedding_time.split(":").map(Number);
  const endDate = new Date(`${settings.wedding_date}T${settings.wedding_time}:00+05:30`);
  endDate.setHours(hours + 4, minutes, 0, 0);
  const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, "0")}${String(
    endDate.getDate(),
  ).padStart(2, "0")}T${String(endDate.getHours()).padStart(2, "0")}${String(endDate.getMinutes()).padStart(
    2,
    "0",
  )}00`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Wedding Reception of Muhammad Musharraf & Fathima Noorja",
    dates: `${start}/${end}`,
    details: "We look forward to celebrating this special day with you.",
    location: settings.venue_name,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
