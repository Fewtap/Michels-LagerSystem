"use client";

import { Inventory, JoinedInventory } from "@/Types/database.types";
import { Paper } from "@mui/material";

interface CardProps {
    i: JoinedInventory;
}

export default function ArticleCard({ i }: CardProps) {
    return (
        <Paper
            key={i.inventory_id}
            className="flex items-center justify-between p-4 rounded-lg bg-white shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer"
            elevation={2}
        >
            <div>
                <h2 className="m-0 text-xl font-semibold">
                    {i.Article.Name}
                </h2>
            </div>
            <h3 className="m-0 text-lg font-medium text-blue-700">
                {i.quantity}
            </h3>
        </Paper>
    );
}
