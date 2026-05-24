"use client";

import { useState } from "react";

import {
  cancelBooking,
  rescheduleBooking,
} from "@/services/flights";

import BookingStatusBadge from "./booking-status-badge";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

interface BookingCardProps {
  booking: {
    id: string;
    flight_id: string;
    seat_id: string;
    status: string;
    pnr_code: string;
    flights: any;
    passengers: any[];
    seats: any;
  };
}

export default function BookingCard({
  booking,
}: BookingCardProps) {

  const [loading, setLoading] =
    useState(false);

  const handleCancel =
    async () => {

      try {

        setLoading(true);

        await cancelBooking(
          booking.id,
          booking.seat_id
        );

        toast.success(
          "Booking cancelled"
        );

        window.location.reload();

      } catch (error) {

        toast.error(
          "Cancellation failed"
        );

        console.error(error);

      } finally {
        setLoading(false);
      }
    };

  const handleReschedule =
    async () => {

      try {

        setLoading(true);

        const newFlightId =
          prompt(
            "Enter new flight ID"
          );

        if (!newFlightId) return;

        await rescheduleBooking({
          bookingId:
            booking.id,

          oldFlightId:
            booking.flight_id,

          newFlightId,
        });

        toast.success(
          "Flight rescheduled"
        );

        window.location.reload();

      } catch (error) {

        toast.error(
          "Reschedule failed"
        );

        console.error(error);

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <h2 className="text-2xl font-bold">
              {
                booking.flights
                  .origin
              }{" "}
              →
              {
                booking.flights
                  .destination
              }
            </h2>

            <BookingStatusBadge
              status={
                booking.status
              }
            />

          </div>

          <p className="mt-3 text-slate-500">
            Flight{" "}
            {
              booking.flights
                .flight_no
            }
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <div>
              <p className="text-sm text-slate-500">
                Passenger
              </p>

              <p className="font-semibold">
                {
                  booking
                    .passengers[0]
                    .full_name
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Seat
              </p>

              <p className="font-semibold">
                {
                  booking.seats
                    .seat_number
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                PNR
              </p>

              <p className="font-semibold">
                {
                  booking.pnr_code
                }
              </p>
            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <Button
            variant="outline"
            disabled={
              loading ||
              booking.status ===
                "cancelled"
            }
            onClick={
              handleReschedule
            }
          >
            Reschedule
          </Button>

          <Button
            variant="destructive"
            disabled={
              loading ||
              booking.status ===
                "cancelled"
            }
            onClick={
              handleCancel
            }
          >
            Cancel
          </Button>

        </div>

      </div>

    </div>
  );
}