"use client";

import { Article, Location, JoinedInventory, Database } from "@/Types/database.types";
import { createClient } from "@/utils/browserclient";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";


export default function Add() {
    //fetched from the db
    const [Articles, setArticles] = useState<Article[] | null>();
    const [Locations, setLocations] = useState<Location[] | null>();
    //values from the DOM selections
    const [selectedArticle, setselectedArticle] = useState<Article>();
    const [selectedLocation, setselectedLocation] = useState<Location>();
    const [SelectedLocationInventories, setSelectedLocationInventories] = useState<JoinedInventory[]>();

    useEffect(() => {
        const fetchData = async () => {
            const supabase: SupabaseClient<Database> = await createClient();
            const [articlesResponse, locationsResponse] = await Promise.all([
                supabase.from("Articles").select("*"),
                supabase.from("Locations").select("*"),
            ]);

            if (articlesResponse.error) {
                console.error(
                    "Could not fetch articles: ",
                    articlesResponse.error.message
                );
            }

            if (locationsResponse.error) {
                console.error(
                    "Could not fetch locations:",
                    locationsResponse.error.message
                );
            }

            let articles = (articlesResponse.data as Article[]).sort(
                (a, b) => a.article_id - b.article_id
            );
            let locations = (locationsResponse.data as Location[]).sort((
                a,
                b
            ) => (a.location_code ?? "").localeCompare(b.location_code ?? ""));

            setArticles(articles);
            setLocations(locations);

            if (articles.length > 0) {
                setselectedArticle(articles[0]); // ✅ set after fetched
            }
        };

        fetchData();
    }, []);

    // Handle select change
    const handleArticleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        if (selectedValue === "") {
            setselectedArticle(undefined);
            return;
        }

        const selectedId = parseInt(selectedValue);
        const article = Articles?.find((a) => a.article_id === selectedId);
        setselectedArticle(article);
        console.log("Selected article:", article); // Add this to debug
    };

    const HandleLocationChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const location = Locations?.find((l) => l.location_id == e.target.value
        );

        setselectedLocation(location);

        const supabase: SupabaseClient<Database> = createClient();

        const { data, error } = await (await supabase.from("inventories").select(
            "*, Location:Locations(*),Article:Articles(*)"
        ).filter("location_id", "eq", location?.location_id));

        if (error) {
            console.error("Error fetching the inventories:", error.message);
        }



        setSelectedLocationInventories(data as JoinedInventory[]);
    };

    return (
        <main>
            <section>
                {!Articles
                    ? (
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    )
                    : (
                        <div className="flex flex-col justify-center items-center gap-5">
                            <div className="flex gap-2">
                                <label>Article</label>
                                <select
                                    className="text-black px-5"
                                    id="articles"
                                    value={selectedArticle?.article_id}
                                    onChange={handleArticleChange}
                                >
                                    {Articles.map((article) => (
                                        <option
                                            key={article.article_id}
                                            value={article.article_id}
                                        >
                                            {`${article.article_id}: ${article.Name}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <label>Location</label>
                                <select
                                    name="locations"
                                    id="locations"
                                    value={selectedLocation?.location_id}
                                    className="px-3"
                                    onChange={HandleLocationChange}
                                >
                                    {Locations
                                        ? (
                                            Locations.map((location) => (
                                                <option
                                                    value={location.location_id}
                                                    key={location.location_id}
                                                    className="px-3"
                                                >
                                                    {`${location.location_code}`}
                                                </option>
                                            ))
                                        )
                                        : (
                                            <div>
                                                <p>No Locations found</p>
                                            </div>
                                        )}
                                </select>
                            </div>
                            <div>
                                <h1>Articles in location:</h1>
                                <ul className="mt-5">
                                    {(SelectedLocationInventories?.length)! > 0
                                        ? (
                                            SelectedLocationInventories!.map((
                                                inventory
                                            ) => (
                                                <li
                                                    key={inventory.inventory_id}
                                                >
                                                    {selectedArticle
                                                        ?.article_id ==
                                                        inventory.article_id
                                                        ? `✅${inventory.Article.Name}`
                                                        : `⛔${inventory.Article.Name} `}
                                                    <br />
                                                    {`Quantity: ${inventory.quantity}`}
                                                </li>
                                            ))
                                        )
                                        : <h2>No Articles found in location
                                        </h2>}
                                </ul>
                            </div>
                        </div>
                    )}
            </section>
        </main>
    );
}
