import Database from "../SUPABASE/supabase";

export type LocationType = "receiving" | "storage" | "picking" | "shipping";


export class Location {
    locationId: number;
    locationCode: string;
    warehouse: string;
    zone: string;
    aisle: string | null;
    rack: string | null;
    shelf: string | null;
    bin: string | null;
    locationType: LocationType;
    maxCapacity: number;

    constructor(
        locationId: number,
        locationCode: string,
        warehouse: string,
        zone: string,
        locationType: LocationType,
        maxCapacity: number,
        aisle: string | null = null,
        rack: string | null = null,
        shelf: string | null = null,
        bin: string | null = null
    ) {
        this.locationId = locationId;
        this.locationCode = locationCode;
        this.warehouse = warehouse;
        this.zone = zone;
        this.aisle = aisle;
        this.rack = rack;
        this.shelf = shelf;
        this.bin = bin;
        this.locationType = locationType;
        this.maxCapacity = maxCapacity;
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

        return await Database.getInstance().db.from("Locations").select("*").then((response) => {
            if (response.error) {
                console.error("Error fetching locations:", response.error);
                return [];
            } else {
                const locations: Location[] = response.data.map((loc: any) => {
                    return new Location(
                        loc.location_id,
                        loc.location_code,
                        loc.warehouse,
                        loc.zone,
                        loc.location_type,
                        loc.max_capacity,
                        loc.aisle,
                        loc.rack,
                        loc.shelf,
                        loc.bin
                    );
                });
                return locations;
            }
        });

    }

    public async getArticles(){
        let instance = Database.getInstance();
        let inventories = await instance.db.from("inventory").select("*").eq("locationId", this.locationId).then((response) => {
            if(response.error){
                throw Error("Could not fetch articles: " + response.error)
            }
            else{
                
            }
        })
        
    }



}