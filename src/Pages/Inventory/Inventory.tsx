import { useEffect, useState, useRef } from "react";
import DatabaseClient from "../../SUPABASE/DatabaseClient";
import { Location } from "../../Classes/Location";
import { Article } from "../../Classes/Article";
import "./Inventory.css"
import type { JoinedInventory } from "../../Interfaces/Inventory";



export const Inventory: React.FC = () => {

    const [locations, setLocations] = useState<Location[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(100);

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [inventoriesInLocation, setInventoriesInLocation] = useState<JoinedInventory[]>([]);
    const effectRan = useRef(false);


    /**
     * 
     * @param e
     * @returns
     * 
     * This function handles the change event for the location selection dropdown.
     */
    async function OnLocationSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = e.target.value;

        setSelectedLocation(locations.find((l) => l.locationId == selectedId) ?? null);
        console.log("Selected location:", selectedLocation?.toString());

        

        console.log("Selected location ID:", selectedId);



        



    }

    /**
     * 
     * @param e
     * @returns
     * 
     * This function handles the change event for the article selection dropdown.
     */
    function OnArticleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = parseInt(e.target.value);
        const selectedArticle = articles.find((a) => a.article_id == selectedId);
        if (selectedArticle) {
            setSelectedArticle(selectedArticle);
            console.log("Selected article:", selectedArticle.toString());
        } else {
            console.error("Article not found");
        }
    }

    /**
     * 
     * @param e
     * @returns
     * 
     * This function handles the change event for the quantity input field.
     */
    function OnQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
        const quantity = parseInt(e.target.value);
        if (!isNaN(quantity)) {
            setSelectedQuantity(quantity);
            console.log("Selected quantity:", quantity);
        } else {
            console.error("Invalid quantity");
        }
    }

async function AddArticleToInventory() {
    if (selectedLocation && selectedArticle && selectedQuantity) {
        try {
            await selectedLocation.insertProduct(selectedArticle, selectedQuantity);
            console.log("Added article to inventory:", selectedArticle.toString(), "Quantity:", selectedQuantity);
            GetInventories();
        } catch (error) {
            console.error("Error adding article to inventory:", error);
        }
    } else {
        console.error("Missing required data to add article to inventory");
    }
}

    async function SetLocation(locationId: string) {
        const location = locations.find((l) => l.locationId == locationId);
        if (location) {
            setSelectedLocation(location);
            console.log("Selected location:", location.toString());
        } else {
            console.error("Location not found");
        }
    }

    async function GetInventories() {
        
        if (selectedLocation) {
            const inventories = await selectedLocation.getInventories();
            setInventoriesInLocation(inventories);
            console.log("Articles in selected location:", inventories);
        } else {
            console.error("Location not found");
        }
    }

    async function DeleteProduct(inventoryId: string) {
        Location.deleteProduct(inventoryId).then(() => {
            console.log("Deleted product with ID:", inventoryId);
            GetInventories();
        }
        ).catch((error) => {
            console.error("Error deleting product:", error);
        });
    }

    

    useEffect(() => {
        if (effectRan.current) return;

        // Fetch locations and articles when the component mounts
        console.log("Fetching locations...");
        Location.fetchLocations().then((locations) => {
            setLocations(locations);
            if (locations.length > 0) {
                setSelectedLocation(locations[0]);
               
            }
        }).catch((error) => {
            console.error("Error fetching locations:", error);
        });

        // Fetch articles when the component mounts
        console.log("Fetching articles...");
        DatabaseClient.fetchAllArticles().then((articles) => {
            setArticles(articles);
            if (articles.length > 0) {
                setSelectedArticle(articles[0]);
            }
        }).catch((error) => {
            console.error("Error fetching articles:", error);
        });

        

        return () => {
            effectRan.current = true;
        };
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            GetInventories();
        }
    }, [selectedLocation]);



    return (
        <>
        <div className="container">
            <h1>Inventory</h1>
            <select onChange={OnLocationSelectionChange} value={selectedLocation?.locationId}>
                {locations.map((location) => (
                    <option key={location.locationId} value={location.locationId}>
                        {location.locationCode}
                    </option>
                ))}
            </select>
            <h2>Add Article</h2>
            <select onChange={OnArticleSelectionChange} value={selectedArticle?.article_id}>
                {articles.map((article) => (
                    <option key={article.article_id} value={article.article_id}>
                        {article.Name}
                    </option>
                ))}
            </select>
            <input type="number" placeholder="Quantity" value={selectedQuantity} onChange={OnQuantityChange}/>
            <button onClick={AddArticleToInventory}>Add</button>
            <h2>Inventories in {selectedLocation?.locationCode}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Article ID</th>
                        <th>Article Name</th>
                        <th>Quantity</th>
                        <th>Location Code</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoriesInLocation.map((inventory) => (
                        <tr key={inventory.article_id}>
                            <td>{inventory.article_id}</td>
                            <td>{inventory.Article?.Name}</td>
                            <td>{inventory.quantity}</td>
                            <td>{inventory.Location?.locationCode}</td>
                            <td><button onClick={(e) => DeleteProduct(inventory.inventory_id)}>Delete</button></td>
                            
                        </tr>
                        
                    ))}
                    
                </tbody>
            </table>    

            
        </div>
        </>
    );
}