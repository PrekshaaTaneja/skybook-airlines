import BookingCard from "@/components/dashboard/booking-card";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  getUserBookings,
} from "@/services/flights";

export default async function MyBookingsPage() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

const bookings =
  await getUserBookings(user.id);

  return (
    <main className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your flights and bookings.
          </p>

        </div>

        <div className="space-y-6">

          {bookings.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

              <h2 className="text-2xl font-semibold">
                No bookings yet
              </h2>

              <p className="mt-3 text-slate-500">
                Your bookings will appear here.
              </p>

            </div>
          ) : (
            bookings.map(
              (booking) => (
                <BookingCard
                  key={
                    booking.id
                  }
                  booking={
                    booking
                  }
                />
              )
            )
          )}

        </div>

      </div>

    </main>
  );
}