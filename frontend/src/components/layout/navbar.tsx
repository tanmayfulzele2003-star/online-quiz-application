import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import { Button, ButtonLink } from "@/components/ui/button";

export async function Navbar() {
  const session = await getSession();
  const homeHref = session ? (session.role === "ADMIN" ? "/admin" : "/participant") : "/";

  return (
    <header className="border-b border-border bg-card">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href={homeHref}
          prefetch={session ? false : undefined}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          QuizNest
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {session.fullName} · {session.role === "ADMIN" ? "Admin" : "Participant"}
              </span>
              <form action={logoutAction}>
                <Button type="submit" variant="secondary" size="sm">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Log in
              </Link>
              <ButtonLink href="/register" size="sm">
                Register
              </ButtonLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
