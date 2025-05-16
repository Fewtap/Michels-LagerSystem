import type { JoinedInventory } from "../Interfaces/Inventory";
import DatabaseClient from "../SUPABASE/DatabaseClient";
import { Article } from "./Article";
import { Conversion } from "./Conversion";
import type { Database } from "../Interfaces/types";

export type LocationType = "receiving" | "storage" | "picking" | "shipping";

type LocationRow = Database["public"]["Tables"]["Locations"]["Row"];

export class Location {
    public locationId: string;
    public locationCode: string | null;
    public aisle: string | null;
    public bin: string | null;
    public locationType: string | null;
    public maxCapacity: number | null;
    public rack: string | null;
    public shelf: string | null;
    public warehouse: string | null;
    public zone: string | null;

    constructor(
        Object: {
            locationId: string;
            locationCode: string;
            warehouse: string;
            zone: string;
            aisle: string | null;
            rack: string | null;
            shelf: string | null;
            bin: string | null;
            locationType: LocationType;
            maxCapacity: number;
        },
    ) {
        this.locationId = Object.locationId;
        this.locationCode = Object.locationCode;
        this.warehouse = Object.warehouse;
        this.zone = Object.zone;
        this.aisle = Object.aisle;
        this.rack = Object.rack;
        this.shelf = Object.shelf;
        this.bin = Object.bin;
        this.locationType = Object.locationType;
        this.maxCapacity = Object.maxCapacity;
    }

    static fromRow(row: LocationRow): Location {
        return new Location({
            locationId: row.location_id,
            locationCode: row.location_code!,
            warehouse: row.warehouse!,
            zone: row.zone!,
            aisle: row.aisle,
            rack: row.rack,
            shelf: row.shelf,
            bin: row.bin,
            locationType: row.location_type as LocationType,
            maxCapacity: row.max_capacity!,
        });
    }

    public toString(): string {
        return `Location ID: ${this.locationId}, Code: ${this.locationCode}, Warehouse: ${this.warehouse}, Zone: ${this.zone}, Aisle: ${this.aisle}, Rack: ${this.rack}, Shelf: ${this.shelf}, Bin: ${this.bin}, Type: ${this.locationType}, Max Capacity: ${this.maxCapacity}`;
    }

    /**
     * Fetches all locations from the database.
     *
     * @returns A promise that resolves to an array of `Location` instances.
     * If an error occurs during the fetch, an empty array is returned and the error is logged to the console.
     *
     * @example
     * const locations = await Location.fetchLocations();
     * console.log(locations);
     */
    public static async fetchLocations(): Promise<Location[]> {
        return await DatabaseClient.getInstance().db.from("Locations").select(
            "*",
        ).then((response) => {
            if (response.error) {
                console.error("Error fetching locations:", response.error);

                return [];
            } else {
                try {
                    let locations: Location[] = response.data.map(
                        (row: LocationRow) => {
                            return Location.fromRow(row);
                        },
                    );
                    console.log("Fetched locations:", locations);
                    return locations;
                } catch (error) {
                    console.error("Error converting locations:", error);
                    return [];
                }
            }
        });
    }

    public async getInventories(): Promise<JoinedInventory[]> {
        try {
            let instance = DatabaseClient.getInstance();

            // This is the corrected query

            console.log("This is the locationId: ", this.toString());

            const { data, error } = await instance.db
                .from("inventories")
                .select(`
                *,
                article: Articles(*),
                location: Locations(*)
            `)
                .filter("location_id", "eq", this.locationId);

            if (error) {
                throw new Error("Could not fetch articles: " + error.message);
            }

            const inventories: JoinedInventory[] = data.map((item: any) => {
                const article = Conversion.convertToArticle(item.article);

                const location = Location.fromRow(item.location);
                return {
                    article_id: item.article_id,
                    location_id: item.location_id,
                    Article: article,
                    Location: location,
                    quantity: item.quantity,
                    inventory_id: item.inventory_id,
                    last_updated: item.last_updated,
                } as JoinedInventory;
            });

            return inventories;
        } catch (error) {
            console.error("Error in getInventories:", error);
            throw error;
        }
    }

    async insertProduct(article: Article, quantity: number) {
        const instance = DatabaseClient.getInstance();
        //Check if the location already has the article
        const { data: existingInventory, error: fetchError } = await instance.db
            .from("inventories")
            .select("*")
            .eq("location_id", this.locationId)
            .eq("article_id", article.article_id);
        if (fetchError) {
            console.error("Error fetching existing inventory:", fetchError);
            return;
        }
        if (existingInventory.length > 0) {
            // If the article already exists, update the quantity
            const existingItem = existingInventory[0];
            const newQuantity = existingItem.quantity! + quantity;

            const { data, error } = await instance.db
                .from("inventories")
                .update({ quantity: newQuantity })
                .eq("inventory_id", existingItem.inventory_id)
                .select();
            if (error) {
                console.error("Error updating product:", error);
            }
            console.log("Updated product:", data);
            
        } else {
            // If the article does not exist, insert a new inventory item
            const { data, error } = await instance.db
                .from("inventories")
                .insert({
                    article_id: article.article_id,
                    location_id: this.locationId,
                    quantity: quantity,
                })
                .select();
            if (error) {
                console.error("Error inserting product:", error);
            } else {
                console.log("Inserted product:", data);
            }
        }
    }

    static async deleteProduct(inventoryID: string) {
        const instance = DatabaseClient.getInstance();
        const { data, error } = await instance.db
            .from("inventories")
            .delete()
            .eq("inventory_id", inventoryID)
            .select();

        if (error) {
            console.error("Error deleting product:", error);
        } else {
            console.log("Deleted product:", data);
        }
    }
}
