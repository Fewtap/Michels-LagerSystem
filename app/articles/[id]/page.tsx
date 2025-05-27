"use client";
import type {
    Database,
    JoinedArticle,
    JoinedInventory,
} from "@/Types/database.types";
import { createClient } from "@/utils/serverclient";
import { SupabaseClient } from "@supabase/supabase-js";
import { error } from "console";
import { toast, Toaster } from "react-hot-toast";
import ArticleInformation from "./components/ArticleInformation";
import { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import React from "react";
import InventoryInformation from "./components/InventoryInformation";

export default function ArticleDetails(
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = React.use(params);
    const article = useFetchData(parseInt(id, 10));

    return (
        <div className="p-4 m-top flex justify-center flex-col gap-3">
            <Toaster />
            {article
                ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="md:grid md:grid-cols-2 gap-3 sm:flex-col w-full">
                            <ArticleInformation
                                article={{
                                    Name: article.Name,
                                    EAN: article.EAN,
                                    PCS: article.PCS,
                                    Size: article.Size,
                                    Unit: article.Unit,
                                    article_id: article.article_id,
                                }}
                                className="md:col-auto min-w-[100%] mb-2"
                            />
                            <InventoryInformation
                                inventories={article.inventories}
                                className="md:col-auto text-black mb-2"
                            />
                        </div>
                    </div>
                )
                : <h1>Loading...</h1>}
            {/* Action Buttons */}
            <div className="flex gap-2 mt-6 justify-start items-start">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() =>
                        toast.error("These buttons don't do anything yet")}
                >
                    Edit Article
                </button>
                <button
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() =>
                        toast.error("These buttons don't do anything yet")}
                >
                    Delete Article
                </button>
                <button
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() =>
                        toast.error("These buttons don't do anything yet")}
                >
                    Add Inventory
                </button>
            </div>
        </div>
    );
}
