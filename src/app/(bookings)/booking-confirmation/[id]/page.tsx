import { getBookingById } from "@/services/flights";

interface ConfirmationPageProps {
  params: {
    id: string;
  };
}

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {

  const { id } = params;

  const booking =
    await getBookingById(id);

  return (
    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <div className="mb-8 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✈
            </div>

            <h1 className="mt-6 text-4xl font-bold text-slate-900">
              Booking Confirmed
            </h1>

            <p className="mt-3 text-slate-500">
              Your flight has been booked successfully.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-50 p-6">

              <h2 className="text-lg font-semibold">
                Flight Details
              </h2>

              <div className="mt-4 space-y-3">

                <p>
                  <span className="font-medium">
                    Flight:
                  </span>{" "}
                  {
                    booking.flights
                      .flight_no
                  }
                </p>

                <p>
                  <span className="font-medium">
                    Route:
                  </span>{" "}
                  {
                    booking.flights
                      .origin
                  }{" "}
                  →
                  {
                    booking.flights
                      .destination
                  }
                </p>

                <p>
                  <span className="font-medium">
                    Seat:
                  </span>{" "}
                  {
                    booking.seats
                      .seat_number
                  }
                </p>

              </div>

            </div>

            <div className="rounded-2xl bg-slate-50 p-6">

              <h2 className="text-lg font-semibold">
                Passenger Details
              </h2>

              <div className="mt-4 space-y-3">

                <p>
                  <span className="font-medium">
                    Name:
                  </span>{" "}
                  {
                    booking.passengers[0]
                      .full_name
                  }
                </p>

                <p>
                  <span className="font-medium">
                    Nationality:
                  </span>{" "}
                  {
                    booking.passengers[0]
                      .nationality
                  }
                </p>

                <p>
                  <span className="font-medium">
                    PNR:
                  </span>{" "}
                  {
                    booking.pnr_code
                  }
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

