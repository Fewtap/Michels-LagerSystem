import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-white ">
        
        <h1 className="text-4xl font-bold mb-4 ">Welcome to My WMS</h1>
        <p className="text-lg mb-6">
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
