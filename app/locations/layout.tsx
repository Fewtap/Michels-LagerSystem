import React from "react";
import Link from "next/link";
import { Database, JoinedLocation } from "@/Types/database.types";
import { createClient } from "@/utils/serverclient";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function LocationsLayout({ children }: { children: React.ReactNode }) {
  const supabase: SupabaseClient<Database> = await createClient();
  let locations: JoinedLocation[] = [];
  const { data, error } = await supabase
    .from("Locations")
    .select("*,inventories(*,Articles(*),Locations(*))");
  if (!error && data) {
    locations = data as unknown as JoinedLocation[];
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-0">
      {/* Sidebar */}
      <aside
        className="w-full md:w-64 shrink-0 border-r bg-muted p-4 flex md:flex-col min-h-0 overflow-x-auto md:overflow-y-auto shadow-md"
        style={{ maxHeight: 'calc(100vh - 4rem - 2rem)' }}
      >
        <h2 className="text-lg font-bold mb-4 hidden md:block">Locations</h2>
        <ul className="flex flex-row md:flex-col gap-2 w-full">
          {locations.map((location) => (
            <li key={location.location_id} className="min-w-max">
              <Link href={`/locations/${location.location_id}`} className="block rounded px-2 py-1 hover:bg-accent transition-colors">
                {location.location_code}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-0 p-4 overflow-auto">{children}</main>
    </div>
  );
}
