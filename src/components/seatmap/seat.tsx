interface SeatProps {
  seatNumber: string;
  selected?: boolean;
  occupied?: boolean;
  onClick?: () => void;
}

export default function Seat({
  seatNumber,
  selected,
  occupied,
  onClick,
}: SeatProps) {

  return (
    <button
      onClick={onClick}
      disabled={occupied}
      className={`
        h-12 w-12 rounded-xl text-sm font-semibold transition-all

        ${
          occupied
            ? "cursor-not-allowed bg-red-500 text-white"
            : selected
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-slate-200 hover:bg-slate-300"
        }
      `}
    >
      {seatNumber}
    </button>
  );
}