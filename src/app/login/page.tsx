import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-200/75">Admin</p>
        <h1 className="mt-3 font-serif text-4xl">Sign in</h1>
        <form action={signIn} className="mt-6 grid gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="h-12 rounded-2xl border border-gold-300/15 bg-white/[0.03] px-4 outline-none focus:border-gold-300/40"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="h-12 rounded-2xl border border-gold-300/15 bg-white/[0.03] px-4 outline-none focus:border-gold-300/40"
            required
          />
          <Button type="submit">Sign in</Button>
        </form>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </Card>
    </main>
  );
}
