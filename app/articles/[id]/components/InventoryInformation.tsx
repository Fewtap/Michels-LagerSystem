"use client";
import { JoinedInventory } from "@/Types/database.types";
import { Paper } from "@mui/material";
import { useState } from "react";

interface InventoryInformationProps {
    inventories: JoinedInventory[];
    className?: string;
}

export default function InventoryInformation(
    { inventories, className }: InventoryInformationProps,
) {

    const mouseoverElevation = 24
    const [CardWithMouseOver, setCardWithMouseOver] = useState<string | null>(null);

    return (
        <div className={`bg-white p-4 rounded-lg shadow text-black${className ?? ""}`}>
            <h2 className="text-lg font-semibold mb-3">
                Inventory by Location
            </h2>
            {inventories && inventories.length > 0
                ? (
                    <div className="space-y-3 ">
                        {inventories.map((i) => (
                            <Paper
                            onMouseOver={() => setCardWithMouseOver(i.inventory_id)}
                            onMouseLeave={() => setCardWithMouseOver(null)}
                            
                            elevation={CardWithMouseOver == i.inventory_id ? mouseoverElevation : 2 }
                                key={i.inventory_id}
                                className="border border-gray-200 rounded p-3"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">
                                            {i.Location
                                                ?.warehouse ||
                                                "Unknown Location"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Zone: {i.Location
                                                ?.zone || "N/A"} | Rack:{" "}
                                            {i.Location
                                                ?.rack || "N/A"} | Shelf:{" "}
                                            {i.Location
                                                ?.shelf || "N/A"}
                                        </p>
                                        {i.Location?.bin && (
                                            <p className="text-sm text-gray-600">
                                                Bin: {i.Location
                                                    .bin}
                                            </p>
                                        )}

                                        <p>
                                            {`Location Code: ${i.Location.location_code}`}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Last Updated: {new Date(
                                                i.last_updated!,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-green-600">
                                            {i.quantity}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            units
                                        </p>
                                    </div>
                                </div>
                            </Paper>
                        ))}

                        {/* Total Inventory Summary */}
                        <Paper elevation={8} className="border-t pt-3 mt-4 p-3">
                            <Paper elevation={2} variant="elevation" className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                <span className="font-semibold">
                                    Total Inventory:
                                </span>
                                <span className="text-xl font-bold text-blue-600">
                                    {inventories.reduce(
                                        (total: number, inv: any) =>
                                            total + (inv.quantity || 0),
                                        0,
                                    )} units
                                </span>
                            </Paper>
                            <p className="text-sm text-gray-600 mt-2">
                                Available in {inventories.length}{" "}
                                location{inventories.length !==
                                        1
                                    ? "s"
                                    : ""}
                            </p>
                        </Paper>
                    </div>
                )
                : (
                    <div className="text-center py-4 text-gray-500">
                        <p>No inventory found for this article</p>
                    </div>
                )}
        </div>
    );
}
