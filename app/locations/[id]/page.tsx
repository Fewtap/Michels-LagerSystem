"use server";

import {
    Database,
    JoinedInventory,
    JoinedLocation,
} from "@/Types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/serverclient";
import { data, param } from "motion/react-client";
import { GetServerInventories } from "@/utils/serverclient";
import { Table } from "@/utils/serverclient";
import { Paper } from "@mui/material";
import ArticleCard from "./Components/ArticleCard";

export default async function LocationInformation(
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id;

    const inventories = await GetServerInventories(Table.LOCATION_ID, id);

    if(!inventories){
        return(<h1>No inventories found</h1>)
    }

    console.log(inventories);

    return (
        <>
            <div className="max-w-xl mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-lg" >
                <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
                    {inventories[0].Location.location_code}
                </h1>
                <div className="flex flex-col gap-5">
                    {inventories.map((i) => (
                        <ArticleCard i={i} key={i.inventory_id}></ArticleCard>
                    ))}
                </div>
            </div>
        </>
    );
}
