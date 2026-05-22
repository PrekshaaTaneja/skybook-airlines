import Link from "next/link";
import Container from "../shared/container";
import { Button } from "@/components/ui/button";

export default function Navbar() {
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

            <Link
              href="/my-bookings"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              My Bookings
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden md:flex"
            >
              Login
            </Button>

            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}