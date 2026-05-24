"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  passengerSchema,
  PassengerSchema,
} from "@/validations/passenger-schema";

import { createBooking } from "@/services/flights";

import { useFlightStore } from "@/store/flight-store";

interface PassengerFormProps {
  flightId: string;
  price: number;
}

export default function PassengerForm({
  flightId,
  price,
}: PassengerFormProps) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    selectedSeatId,
    resetBooking,
  } = useFlightStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerSchema>({
    resolver:
      zodResolver(passengerSchema),
  });

  const onSubmit = async (
    values: PassengerSchema
  ) => {

    if (!selectedSeatId) {
      alert("Please select a seat");
      return;
    }

    try {

      setLoading(true);

      const booking =
        await createBooking({
          userId:
            "00000000-0000-0000-0000-000000000001",

          flightId,

          seatId: selectedSeatId,

          totalPrice:
            price + 999,

          passenger: values,
        });

      resetBooking();

      router.push(
        `/booking-confirmation/${booking.id}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Booking failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <div>

          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            {...register("fullName")}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Passport Number
          </label>

          <input
            {...register("passportNo")}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Nationality
          </label>

          <input
            {...register("nationality")}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Date of Birth
          </label>

          <input
            type="date"
            {...register("dob")}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-blue-500"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : "Confirm Booking"}
        </button>

      </form>

    </div>
  );
}