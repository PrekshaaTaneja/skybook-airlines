import { createClient } from "@/lib/supabase/client";

export async function searchFlights(
  origin: string,
  destination: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("origin", origin)
    .eq("destination", destination)
    .eq("status", "scheduled")
    .order("departs_at", {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFlightById(
  flightId: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("flights")
    .select(`
      *,
      seats (*)
    `)
    .eq("id", flightId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

function generatePNR() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
}

export async function createBooking({
  userId,
  flightId,
  seatId,
  totalPrice,
  passenger,
}: {
  userId: string;

  flightId: string;

  seatId: string;

  totalPrice: number;

  passenger: {
    fullName: string;
    passportNo: string;
    nationality: string;
    dob: string;
  };
}) {

  const supabase = createClient();

  const pnrCode = generatePNR();

  const { data: booking, error } =
    await supabase
      .from("bookings")
      .insert({
        user_id: userId,

        flight_id: flightId,

        seat_id: seatId,

        total_price: totalPrice,

        pnr_code: pnrCode,
      })

      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  const {
    error: passengerError,
  } = await supabase
    .from("passengers")
    .insert({
      booking_id: booking.id,

      full_name:
        passenger.fullName,

      passport_no:
        passenger.passportNo,

      nationality:
        passenger.nationality,

      dob: passenger.dob,
    });

  if (passengerError) {
    throw new Error(
      passengerError.message
    );
  }

  const {
    error: seatError,
  } = await supabase
    .from("seats")
    .update({
      is_available: false,
    })
    .eq("id", seatId);

  if (seatError) {
    throw new Error(
      seatError.message
    );
  }

  return booking;
}

export async function getBookingById(
  bookingId: string
) {

  const supabase = createClient();

  const { data, error } =
    await supabase
      .from("bookings")
      .select(`
        *,
        flights (*),
        passengers (*),
        seats (*)
      `)
      .eq("id", bookingId)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}