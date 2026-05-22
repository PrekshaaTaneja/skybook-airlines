export default function SeatLegend() {
  return (
    <div className="flex flex-wrap gap-6">

      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-slate-200" />
        <span className="text-sm">
          Available
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-blue-600" />
        <span className="text-sm">
          Selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-red-500" />
        <span className="text-sm">
          Occupied
        </span>
      </div>

    </div>
  );
}