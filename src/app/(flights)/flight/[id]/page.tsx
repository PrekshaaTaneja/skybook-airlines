import { notFound } from "next/navigation";

import SeatMap from "@/components/seatmap/seat-map";
import BookingSummary from "@/components/booking/booking-summary";

import { getFlightById } from "@/services/flights";
import FlightDetailsClient from "@/app/(flights)/flight/flight-details-client";    

interface FlightPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FlightPage({
  params,
}: FlightPageProps) {

  const { id } = await params;

  const flight = await getFlightById(id);

  if (!flight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm text-slate-500">
                {flight.flight_no}
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                {flight.origin} → {flight.destination}
              </h1>

              <p className="mt-3 text-slate-600">
                {flight.aircraft_type}
              </p>

            </div>

            <div className="flex gap-12">

              <div>

                <p className="text-sm text-slate-500">
                  Departure
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {new Date(
                    flight.departs_at
                  ).toLocaleTimeString()}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Arrival
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {new Date(
                    flight.arrives_at
                  ).toLocaleTimeString()}
                </p>

              </div>

            </div>

          </div>

        </div>

        <FlightDetailsClient
            flight={flight}
            />

      </div>

    </main>
  );
}