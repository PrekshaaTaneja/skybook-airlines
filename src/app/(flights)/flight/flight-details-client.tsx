"use client";

import { useEffect } from "react";

import SeatMap from "@/components/seatmap/seat-map";

import BookingSummary from "@/app/(bookings)/booking-summary";

import { useFlightStore } from "@/store/flight-store";

import { Flight } from "@/types/database";

interface FlightDetailsClientProps {
  flight: Flight & {
    seats: any[];
  };
}

export default function FlightDetailsClient({
  flight,
}: FlightDetailsClientProps) {

  const setSelectedFlight =
    useFlightStore(
      (state) =>
        state.setSelectedFlight
    );

  useEffect(() => {
    setSelectedFlight(flight);
  }, [flight, setSelectedFlight]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

      <SeatMap seats={flight.seats} />

      <BookingSummary
        price={flight.base_price}
      />

    </div>
  );
}