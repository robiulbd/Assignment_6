import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-black text-[#ccff00] uppercase mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white uppercase mb-4">PAGE NOT FOUND</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-md">
        The lift or page you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
      >
        Back to Library
      </Link>
    </div>
  );
}