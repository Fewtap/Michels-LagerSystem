import { useState, useEffect } from 'react';
import { createClient } from '@/utils/browserclient';
import type { Database, JoinedInventory, Location } from '@/Types/database.types';

export function useLocationInventory() {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [inventories, setInventories] = useState<JoinedInventory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLocationInventories = async (location: Location) => {
    if (!location) return;
    
    setLoading(true);
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from("inventories")
      .select("*, Location:Locations(*), Article:Articles(*)")
      .eq("location_id", location.location_id);

    if (error) {
      console.error("Error fetching inventories:", error.message);
      setInventories([]);
    } else {
      setInventories(data as JoinedInventory[]);
    }
    
    setLoading(false);
  };

  const setLocation = async (location: Location) => {
    setSelectedLocation(location);
    await fetchLocationInventories(location);
  };

  return {
    selectedLocation,
    inventories,
    loading,
    setLocation,
    refetch: () => selectedLocation && fetchLocationInventories(selectedLocation)
  };
}

