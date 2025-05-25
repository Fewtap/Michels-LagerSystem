

import Card from "@/components/Card";
import { Database, JoinedLocation, Location } from "@/Types/database.types";
import { createClient } from "@/utils/serverclient";
import { SupabaseClient } from "@supabase/supabase-js";


export default async function Locations() {

    const supabase: SupabaseClient<Database> = await createClient();
    
    let locations: JoinedLocation[] | null = null;

    const { data, error } = await supabase
        .from("Locations")
        .select("*,inventories(*,Articles(*),Locations(*))");
    if (error) {
        console.error("Error fetching locations:", error);
        return <div>Error loading locations</div>;
    } else {
        locations = data as unknown as JoinedLocation[];
        
    }


   

    return (
        <div>
            <div>
                <h1>Locations</h1>
                <h2>Filter</h2>
                <select className="border border-gray-300 rounded p-2 mb-4">
                    <option value="">All Locations</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations!.map((location) => (
                    <Card key={location.location_id}>
                        <h1>{location.location_code}</h1>
                        {location.inventories.length == 0 ? (
                            <h2>Location is Empty</h2>
                        ): <h2>Amount of Articles: {location.inventories.length}</h2>}
                    </Card>
                ))}
            </div>
        </div>
    );
}
