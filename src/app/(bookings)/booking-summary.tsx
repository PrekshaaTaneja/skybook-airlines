interface BookingSummaryProps {
  price: number;
}

export default function BookingSummary({
  price,
}: BookingSummaryProps) {

  return (
    <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="text-2xl font-bold">
        Booking Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Base Fare
          </span>

          <span className="font-semibold">
            ₹{price}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">
            Taxes
          </span>

          <span className="font-semibold">
            ₹999
          </span>
        </div>

        <div className="border-t pt-4">

          <div className="flex items-center justify-between">

            <span className="text-lg font-semibold">
              Total
            </span>

            <span className="text-2xl font-bold text-blue-600">
              ₹{price + 999}
            </span>

          </div>

        </div>

      </div>

      <button className="mt-8 h-12 w-full rounded-xl bg-blue-600 text-white transition hover:bg-blue-700">
        Continue Booking
      </button>

    </div>
  );
}