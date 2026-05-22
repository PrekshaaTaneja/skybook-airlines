import { Button } from "@/components/ui/button";
import Container from "../shared/container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-24 text-white">
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            ✈ Modern Flight Booking Experience
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Book Flights
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Experience seamless flight booking, realtime seat selection,
            instant rescheduling, and premium travel management —
            all in one modern platform.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-8 text-base"
            >
              Search Flights
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 border-white/20 bg-white/10 px-8 text-base text-white hover:bg-white/20"
            >
              Explore Features
            </Button>
          </div>

        </div>
      </Container>
    </section>
  );
}