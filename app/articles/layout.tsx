import React from "react";
import Link from "next/link";
import { Database, JoinedArticle } from "@/Types/database.types";
import { createClient } from "@/utils/serverclient";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function ArticlesLayout({ children }: { children: React.ReactNode }) {
  const supabase: SupabaseClient<Database> = await createClient();
  let articles: JoinedArticle[] = [];
  const { data, error } = await supabase
    .from("Articles")
    .select("*,inventories(*)");
  if (!error && data) {
    articles = data as unknown as JoinedArticle[];
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-0">
      {/* Sidebar */}
      <aside
        className="w-max md:w-72 shrink-0 border-r bg-muted p-4 flex md:flex-col min-h-0 overflow-x-auto md:overflow-y-auto shadow-md"
        style={{ maxHeight: 'calc(100vh - 4rem - 2rem)' }}
      >
        <h2 className="text-lg font-bold mb-4 hidden md:block">Articles</h2>
        <ul className="flex flex-row md:flex-col gap-2 w-full">
          {articles.map((article) => (
            <li
              key={article.article_id}
              className="bg-white dark:bg-card rounded-lg shadow-md border p-2 transition hover:shadow-lg hover:bg-gray-50 dark:hover:bg-muted"
            >
              <Link
                href={`/articles/${article.article_id}`}
                className="block text-sm font-medium break-words whitespace-normal text-gray-900 dark:text-gray-100"
                title={article?.Name as string}
              >
                {article.Name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-0 p-4 overflow-auto">{children}</main>
    </div>
  );
}
