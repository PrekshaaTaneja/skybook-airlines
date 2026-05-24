interface BookingStatusBadgeProps {
  status: string;
}

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {

  const styles = {
    confirmed:
      "bg-green-100 text-green-700",

    cancelled:
      "bg-red-100 text-red-700",

    rescheduled:
      "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-1 text-sm font-medium ${
        styles[
          status as keyof typeof styles
        ]
      }`}
    >
      {status}
    </span>
  );
}