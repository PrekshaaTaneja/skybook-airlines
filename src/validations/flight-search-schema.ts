import { z } from "zod";

export const flightSearchSchema = z
  .object({
    origin: z.string().min(1),

    destination: z.string().min(1),

    departureDate: z.string().min(1),

    passengers: z.number().min(1).max(5),
  })

  .refine(
    (data) => data.origin !== data.destination,
    {
      message:
        "Origin and destination cannot be same",

      path: ["destination"],
    }
  );

export type FlightSearchSchema =
  z.infer<typeof flightSearchSchema>;