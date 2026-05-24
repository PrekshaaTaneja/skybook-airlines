import Link from "next/link";

import Container from "../shared/container";

import { createClient } from "@/lib/supabase/server";

import { logout } from "@/actions/auth";

export default async function Navbar() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">

      <Container>

        <div className="flex h-16 items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-blue-600"
          >
            SkyBook
          </Link>

          <nav className="hidden items-center gap-8 md:flex">

            <Link
              href="/"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/search"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              Flights
            </Link>

            {user && (
              <Link
                href="/my-bookings"
                className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
              >
                My Bookings
              </Link>
            )}

          </nav>

          <div className="flex items-center gap-3">

            {user ? (
              <form action={logout}>

                <button
                  type="submit"
                  className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Logout
                </button>

              </form>
            ) : (
              <>
                <Link href="/login">

                  <button className="rounded-xl border px-5 py-2 text-sm font-medium">
                    Login
                  </button>

                </Link>

                <Link href="/signup">

                  <button className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white">
                    Get Started
                  </button>

                </Link>
              </>
            )}

          </div>

        </div>

      </Container>

    </header>
  );
}