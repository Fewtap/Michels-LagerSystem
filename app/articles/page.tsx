"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Database, JoinedArticle } from "@/Types/database.types";
import { createClient } from "@/utils/browserclient";
import Link from "next/link";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function Articles() {
    const [articles, setArticles] = useState<JoinedArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const supabase: SupabaseClient<Database> = createClient();
        const fetchArticles = async () => {
            const { data, error } = await supabase
                .from("Articles")
                .select("*,inventories(*)")
                .order("article_id", { ascending: true });

            if (error) {
                console.error("Error fetching articles:", error);
                setArticles([]);
            } else {
                let newData: JoinedArticle[] = data as unknown as JoinedArticle[];
                newData = newData.sort((a, b) => b.inventories.length - a.inventories.length);
                setArticles(newData);
            }
            setLoading(false);
        };

        fetchArticles();
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl p-4">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : articles.length > 0 ? (
                    articles.map((article) => (
                        <Card key={article.article_id} onClick={() => redirect(`/articles/${article.article_id}`)}>
                            <h2 className="text-xl font-semibold mb-2">{article.Name}</h2>
                            <p className="text-gray-700 mb-2">EAN: {article.EAN}</p>
                            <p className="text-gray-700 mb-2">PCS: {article.PCS}</p>
                            <p className="text-gray-700 mb-2">Size: {article.Size}</p>
                            <p className="text-gray-700 mb-2">Unit: {article.Unit}</p>
                            <p className="text-gray-700 mb-2">Article ID: {article.article_id}</p>
                            <h4 className="text-gray-700 mb-2">
                                {article.inventories.length > 0
                                    ? `✅ Locations: ${article.inventories.length}`
                                    : "⛔ No locations found"}
                            </h4>
                            
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No articles found.</p>
                )}
            </div>
        </div>
    );
}
