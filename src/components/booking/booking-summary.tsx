"use client";
import { useFlightStore } from "@/store/flight-store";
const selectedSeatNumber =
  useFlightStore(
    (state) =>
      state.selectedSeatNumber
  );

  <div className="flex items-center justify-between">
  <span className="text-slate-500">
    Selected Seat
  </span>

  <span className="font-semibold">
    {selectedSeatNumber || "None"}
  </span>
</div>