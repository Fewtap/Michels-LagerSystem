import { useState, useEffect } from 'react';
import { createClient } from '@/utils/browserclient';
import type { Article, Database, JoinedInventory, Location } from '@/Types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

export function useInventoryData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const supabase: SupabaseClient<Database> = createClient();
    
    const [articlesResponse, locationsResponse] = await Promise.all([
      supabase.from("Articles").select("*"),
      supabase.from("Locations").select("*"),
    ]);

    if (articlesResponse.error) {
      console.error("Could not fetch articles: ", articlesResponse.error.message);
    }

    if (locationsResponse.error) {
      console.error("Could not fetch locations:", locationsResponse.error.message);
    }

    const sortedArticles = (articlesResponse.data as Article[])?.sort(
      (a, b) => a.article_id - b.article_id
    ) || [];
    
    const sortedLocations = (locationsResponse.data as Location[])?.sort(
      (a, b) => (a.location_code ?? "").localeCompare(b.location_code ?? "")
    ) || [];
    
    setArticles(sortedArticles);
    setLocations(sortedLocations);
    setLoading(false);
  };

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("schema-db-changes")
      .on("postgres_changes", {
        event: '*',
        schema: 'public'
      }, (payload) => {
        console.log("Database change: ", payload);
        fetchData(); // Refresh data on changes
      })
      .subscribe();

    fetchData();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { articles, locations, loading, refetch: fetchData };
}