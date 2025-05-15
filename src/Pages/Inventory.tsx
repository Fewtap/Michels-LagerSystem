import { useEffect, useState } from "react";
import Database from "../SUPABASE/supabase";
import { Location } from "../Classes/Location";



export const Inventory: React.FC = () => {

    const [locations, setLocations] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<number | null>(null);


    function OnSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = parseInt(e.target.value);
        setSelectedLocation(selectedId);
        console.log("Selected location ID:", selectedId);



    }

    

    useEffect(() => {
        Location.fetchLocations().then((locations) => {
            setLocations(locations);
            if (locations.length > 0) {
                setSelectedLocation(locations[0].locationId);
            }
        }).catch((error) => {
            console.error("Error fetching locations:", error);
        });
    }, []);



    return (
        <div>
            <h1>Inventory</h1>
       <select name="locations" id="locations" onChange={(e) => OnSelectionChange(e)} value={selectedLocation || ""}>
            {locations && locations.map((location) => (
                <option key={location.locationId} value={location.locationId} >
                    {location.locationCode}
                </option>
            ))}
            </select>

            {}
        </div>
    );
}