import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-4xl font-bold mb-4 text-black">Welcome to My WMS</h1>
        <p className="text-lg text-gray-700 mb-6">
          A simple Warehouse Management System built with Next.js and Supabase.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/articles"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            View Articles
          </Link>
          <Link
            href="/inventory"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            View Inventory
          </Link>
          <Link
            href="/locations"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            View Locations
          </Link>
        </div>
      </div>
    </div>
  );
}
