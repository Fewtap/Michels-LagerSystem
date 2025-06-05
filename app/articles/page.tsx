"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Database, JoinedArticle } from "@/Types/database.types";
import { createClient } from "@/utils/browserclient";
import Link from "next/link";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Button } from "@mui/material";
import { FaBookOpen } from "react-icons/fa";

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
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6">
            <div className="bg-white dark:bg-card rounded-xl shadow-lg border max-w-xl w-full flex flex-col items-center p-8">
                <div className="flex items-center gap-3 mb-2">
                  <FaBookOpen className="text-primary-600 dark:text-primary-400 text-3xl" aria-label="Articles Icon" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Articles</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-2 text-center text-base">Select an article to view its details.</p>
            </div>
        </div>
    );
}
