

import { Database, JoinedLocation } from "@/Types/database.types"
import { createClient } from "@/utils/serverclient"
import { SupabaseClient } from "@supabase/supabase-js"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default async function Locations() {
  const supabase: SupabaseClient<Database> = await createClient();
  
  let locations: JoinedLocation[] | null = null;

  const { data, error } = await supabase
    .from("Locations")
    .select("*,inventories(*,Articles(*),Locations(*))");
    
  if (error) {
    console.error("Error fetching locations:", error);
    return (
      <div className="p-6">
        <div className="text-red-500">Error loading locations. Please try again later.</div>
      </div>
    );
  } else {
    locations = data as unknown as JoinedLocation[];
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Locations</h1>
      <p className="text-muted-foreground mb-8">Select a location from the sidebar to view its details.</p>
      <Button asChild>
        <Link href="/locations/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Location
        </Link>
      </Button>
    </div>
  );
}
