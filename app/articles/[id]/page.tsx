import type { Database,Article, Inventory } from "@/Types/database.types";
import { createClient } from "@supabase/supabase-js";
import { error } from "console";

export default async function ArticleDetails({params}: {
    params: Promise<{id: string}>
}) {

    type JoinedArticle = Article & {
        inventories: Inventory[]
    }

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    );

    const id = parseInt((await params).id)

    if(isNaN(id)){
        throw new Error("Invalid Article ID: " + id)
        return null;
    }
    const fetchArticle = async (id: Number) => {
        const { data, error } = await supabase
            .from("Articles")
            .select("*, inventories(*)")
            .eq("article_id", Number(id)).single();
        console.log("Fetched article:", data);

        if (error) {
            console.error("Error fetching article:", error);
            return null;
        }
        return data;
    };
    const article: JoinedArticle | null =
        await fetchArticle(id);
    if (!article) {
        return <div className="p-4">Article not found.</div>;
    }

    return (
        <div className="p-4 m-top flex justify-center flex-col gap-3">
            <h1 className="text-2xl font-bold mb-4">{article.Name}</h1>
            <p className="mb-2">
                <strong>EAN:</strong> {article.EAN}
            </p>
            <p className="mb-2">
                <strong>PCS:</strong> {article.PCS}
            </p>
            <p className="mb-2">
                <strong>Size:</strong> {article.Size}
            </p>
            <p className="mb-2">
                <strong>Unit:</strong> {article.Unit}
            </p>
            <p className="mb-2">
                <strong>Article ID:</strong> {article.article_id}
            </p>
            
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit Article
            </button>
            <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete Article
            </button>
        </div>
    );
}
