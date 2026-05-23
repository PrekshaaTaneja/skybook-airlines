"use client";

import { useRouter } from "next/navigation";

import { createClient }
from "@/lib/supabase/client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  passengerSchema,
  PassengerSchema,
} from "@/validations/passenger-schema";

import { createBooking } from "@/services/flights";

import {
  useFlightStore,
} from "@/store/flight-store";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { toast } from "sonner";

export default function PassengerForm() {

  const router = useRouter();

  const {
    selectedFlight,
    selectedSeatId,
    selectedSeatNumber,
    setPassengerData,
  } = useFlightStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PassengerSchema>({
    resolver:
      zodResolver(
        passengerSchema
      ),
  });

  const onSubmit = async (
  values: PassengerSchema
) => {

  try {

    if (
      !selectedFlight ||
      !selectedSeatId
    ) {
      toast.error(
        "Please select a seat"
      );

      return;
    }

    // const supabase =
    //   createClient();

    // const {
    //   data: { user },
    // } =
    //   await supabase.auth.getUser();

    // if (!user) {

    //   toast.error(
    //     "Please login first"
    //   );

    //   return;
    // }

    setPassengerData(values);

    const booking =
      await createBooking({

        userId:"00000000-0000-0000-0000-000000000001",
        flightId:
          selectedFlight.id,

        seatId:
          selectedSeatId,

        totalPrice:
          (selectedFlight.base_price ?? 0) +
          999,

        passenger: values,
      });

    toast.success(
      "Booking confirmed"
    );

    router.push(
      `/booking-confirmation/${booking.id}`
    );

  } catch (error) {

    toast.error(
      "Booking failed"
    );

    console.error(error);
  }
};
  return (
    <Card className="rounded-3xl border-0 shadow-xl">

      <CardContent className="p-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Passenger Details
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your booking information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              {...register(
                "fullName"
              )}
              className="h-12 w-full rounded-xl border px-4"
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.fullName
                    .message
                }
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Passport Number
            </label>

            <input
              {...register(
                "passportNo"
              )}
              className="h-12 w-full rounded-xl border px-4"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Nationality
            </label>

            <input
              {...register(
                "nationality"
              )}
              className="h-12 w-full rounded-xl border px-4"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Date of Birth
            </label>

            <input
              type="date"
              {...register("dob")}
              className="h-12 w-full rounded-xl border px-4"
            />

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center justify-between">

              <span className="text-slate-500">
                Selected Seat
              </span>

              <span className="font-semibold">
                {
                  selectedSeatNumber
                }
              </span>

            </div>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-slate-500">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-blue-600">
                ₹
                {(selectedFlight?.base_price ?? 0) +
                999}
              </span>

            </div>

          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base"
          >
            {isSubmitting
              ? "Processing..."
              : "Confirm Booking"}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}