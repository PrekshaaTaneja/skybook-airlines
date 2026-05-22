"use client";

// import { useState } from "react";

import Seat from "./seat";
import SeatLegend from "./seat-legend";
import { useFlightStore } from "@/store/flight-store";

interface SeatData {
  id: string;
  seat_number: string;
  class: string;
  is_available: boolean;
}

interface SeatMapProps {
  seats: SeatData[];
}

export default function SeatMap({
  seats,
}: SeatMapProps) {

  const {
    selectedSeatId,
    setSelectedSeat,
    } = useFlightStore();

  const groupedSeats = {
    first: seats.filter(
      (seat) => seat.class === "first"
    ),

    business: seats.filter(
      (seat) => seat.class === "business"
    ),

    economy: seats.filter(
      (seat) => seat.class === "economy"
    ),
  };

  return (
    <div className="space-y-10">

      <SeatLegend />

      {Object.entries(groupedSeats).map(
        ([seatClass, seats]) => (
          <div key={seatClass}>

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-2xl font-bold capitalize">
                {seatClass} Class
              </h2>

              <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium">
                {seats.length} Seats
              </span>

            </div>

            <div className="overflow-x-auto rounded-3xl bg-white p-6 shadow-lg">

              <div className="grid min-w-[500px] grid-cols-6 gap-4">

                {seats.map((seat) => (
                  <Seat
                    key={seat.id}
                    seatNumber={seat.seat_number}
                    occupied={!seat.is_available}
                    selected={
                        selectedSeatId === seat.id
                    }
                    onClick={() =>
                        setSelectedSeat(
                            seat.id,
                            seat.seat_number
                        )
                    }
                  />
                ))}

              </div>

            </div>

          </div>
        )
      )}

    </div>
  );
}