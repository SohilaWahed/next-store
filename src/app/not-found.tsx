import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">
       The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go back Home
      </Link>
    </div>
  );
}
