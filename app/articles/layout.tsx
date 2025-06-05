'use server'
import Siderbar from "@/components/Sidebar";
import { createClient } from "@/utils/serverclient";
import { SupabaseClient } from "@supabase/supabase-js";
import { create } from "domain";
import { Database, JoinedArticle } from "@/Types/database.types";

export default async function Layout(){

    const supabase: SupabaseClient<Database> = await createClient();
    const Articles: JoinedArticle[] | null = (await supabase.from('Articles').select('*, inventories(*, Article:Articles(*), Location:Locations(*))')).data;


    return(
        <Siderbar JoinedItems={Articles ? Articles : []}>
            {Articles?.map((article) => (
                <div key={article.article_id}>
                    <h2>{article.Name}</h2>
                    <p>{article.EAN}</p>
                    <p>{article.PCS}</p>
                    <p>{article.Size}</p>
                    <p>{article.Unit}</p>
                    <p>{article.article_id}</p>
                </div>
            ))}
        </Siderbar>
    )
}