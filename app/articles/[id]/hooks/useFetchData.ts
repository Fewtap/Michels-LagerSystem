import { Article, JoinedArticle } from "@/Types/database.types";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/browserclient";

export default function useFetchData(id: number){
    const [articleData, setArticleData] = useState<JoinedArticle | null>(null);

    useEffect(() => {


        const fetchArticle = async (articleId: number) => {
        
            const supabase = createClient();
            const { data, error } = await supabase
                .from("Articles")
                .select(
                    "*, inventories(*, Article:Articles(*), Location:Locations(*))"
                )
                .eq("article_id", articleId)
                .single();

            if (error) {
                console.error("Error fetching article:", error.message);
                return null;
            }

            return data as JoinedArticle;
        };

        if (id) {
            fetchArticle(id).then(setArticleData);
        }
    }, [id]);

    

    
    

    return articleData;
     
}