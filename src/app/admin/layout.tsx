import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (hasSupabaseEnv) {
    const supabase = await createClient();
    const { data } = await supabase!.auth.getUser();
    const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((email) => email.trim());
    if (!data.user || !adminEmails.includes(data.user.email ?? "")) redirect("/login");
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 border-b border-gold-300/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#8f6c35]">Wedding Admin</p>
          <h1 className="font-serif text-3xl text-[#423126]">Dashboard</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          <Link href="/admin">
            <Button variant="ghost">Overview</Button>
          </Link>
          <Link href="/admin/guests">
            <Button variant="ghost">Guests</Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="ghost">Analytics</Button>
          </Link>
          {hasSupabaseEnv ? (
            <form action={signOut}>
              <Button variant="outline" type="submit">
                Sign out
              </Button>
            </form>
          ) : null}
        </nav>
      </header>
      {children}
    </main>
  );
}
