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