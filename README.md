# Noor Wedding Invite

Premium mobile-first Muslim wedding invitation app built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, Shadcn-style UI primitives, and Supabase.

## What is included

- Personalized invite routes like `/invite/ABX92K`
- RSVP flow with deadline locking, edit-before-deadline support, premium confirmation modal, and calendar links
- Mobile sticky CTA bar for venue + RSVP
- Invitation-open and RSVP analytics
- Protected admin area with overview, guest management, CSV import/export, and WhatsApp sharing
- Supabase schema in `supabase/schema.sql`
- Graceful demo mode when Supabase env vars are absent

## Setup

1. Copy `.env.example` to `.env.local`
2. Add your Supabase project URL, publishable key, service role key, site URL, and admin emails
3. Run the SQL in `supabase/schema.sql`
4. Install dependencies and start the app

```bash
npm install
npm run dev
```

## Supabase notes

- The app uses the publishable key for SSR auth and the service-role key only on the server for protected mutations and analytics writes.
- The schema enables RLS on all exposed tables, matching Supabase guidance for public schemas.
- `settings` is modeled as a singleton row so the deadline and venue remain backend-configurable.

## Content seed from supplied draft

- Couple: Mohammed Musharraf & Fathima Noorja
- Wedding date: 15 June 2026
- Quranic verse: Qur’an 30:21
