import { searchFlights } from "@/services/flights";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SearchPageProps {
  searchParams: {
    origin?: string;
    destination?: string;
  };
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {

  const params = searchParams;

  const flights = await searchFlights(
    params.origin || "",
    params.destination || ""
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold">
          Available Flights
        </h1>

        <div className="space-y-6">

          {flights.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">

              <h2 className="text-2xl font-semibold">
                No Flights Found
              </h2>

              <p className="mt-2 text-slate-500">
                Try another route.
              </p>

            </div>
          ) : (
            flights.map((flight) => (
              <div
                key={flight.id}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      {flight.flight_no}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {flight.origin} → {flight.destination}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      {flight.aircraft_type}
                    </p>
                  </div>

                  <div className="flex gap-12">

                    <div>
                      <p className="text-sm text-slate-500">
                        Departure
                      </p>

                      <p className="text-lg font-semibold">
                        {new Date(
                          flight.departs_at
                        ).toLocaleTimeString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Arrival
                      </p>

                      <p className="text-lg font-semibold">
                        {new Date(
                          flight.arrives_at
                        ).toLocaleTimeString()}
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-slate-500">
                      Starting From
                    </p>

                    <p className="mt-1 text-3xl font-bold text-blue-600">
                      ₹{flight.base_price}
                    </p>
                    <Link href={`/flight/${flight.id}`}>
                        <Button className="mt-4">
                            Select Flight
                        </Button>
                    </Link>
                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </main>
  );
}