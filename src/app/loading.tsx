export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase">
        Loading workouts…
      </p>
    </div>
  );
}