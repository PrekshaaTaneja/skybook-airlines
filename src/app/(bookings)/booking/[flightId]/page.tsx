import { notFound } from "next/navigation";

import PassengerForm from "@/components/booking/passenger-form";

import { getFlightById } from "@/services/flights";

interface BookingPageProps {
  params: {
    flightId: string;
  };
}

export default async function BookingPage({
  params,
}: BookingPageProps) {

  const flight =
    await getFlightById(
      params.flightId
    );

  if (!flight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">

          <h1 className="text-3xl font-bold">
            Passenger Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your booking for{" "}
            {flight.origin} → {flight.destination}
          </p>

        </div>

        <PassengerForm
          flightId={flight.id}
          price={flight.base_price}
        />

      </div>

    </main>
  );
}