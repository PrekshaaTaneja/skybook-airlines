"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FlightSearchSchema,
  flightSearchSchema,
} from "@/validations/flight-search-schema";

import { AIRPORTS } from "@/constants/flights";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "../shared/container";

export default function FlightSearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightSearchSchema>({
    resolver: zodResolver(flightSearchSchema),

    defaultValues: {
      passengers: 1,
    },
  });

  const onSubmit = (values: FlightSearchSchema) => {
    const params = new URLSearchParams({
      origin: values.origin,
      destination: values.destination,
      departureDate: values.departureDate,
      passengers: values.passengers.toString(),
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <Container className="-mt-20 relative z-20">
      <Card className="rounded-3xl border-0 bg-white p-6 shadow-2xl">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 lg:grid-cols-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium">
              Origin
            </label>

            <select
              {...register("origin")}
              className="h-12 w-full rounded-xl border px-4"
            >
              <option value="">
                Select Origin
              </option>

              {AIRPORTS.map((airport) => (
                <option
                  key={airport}
                  value={airport}
                >
                  {airport}
                </option>
              ))}
            </select>

            {errors.origin && (
              <p className="mt-1 text-sm text-red-500">
                {errors.origin.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Destination
            </label>

            <select
              {...register("destination")}
              className="h-12 w-full rounded-xl border px-4"
            >
              <option value="">
                Select Destination
              </option>

              {AIRPORTS.map((airport) => (
                <option
                  key={airport}
                  value={airport}
                >
                  {airport}
                </option>
              ))}
            </select>

            {errors.destination && (
              <p className="mt-1 text-sm text-red-500">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Departure Date
            </label>

            <input
              type="date"
              {...register("departureDate")}
              className="h-12 w-full rounded-xl border px-4"
            />

            {errors.departureDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Passengers
            </label>

            <input
              type="number"
              min={1}
              max={5}
              {...register("passengers", {
                valueAsNumber: true,
              })}
              className="h-12 w-full rounded-xl border px-4"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl text-base"
            >
              Search Flights
            </Button>
          </div>

        </form>

      </Card>
    </Container>
  );
}