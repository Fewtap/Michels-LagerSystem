import type {
  
    Database,
    JoinedArticle,
    JoinedInventory,
} from "@/Types/database.types";
import { createClient } from "@/utils/serverclient";
import { SupabaseClient } from "@supabase/supabase-js";
import { error } from "console";
import { toast, Toaster } from "react-hot-toast";

export default async function ArticleDetails({ params }: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
        throw new Error("Invalid Article ID: " + id);
        return null;
    }

    const fetchArticle = async (id: Number) => {
        const supabase: SupabaseClient<Database> = await createClient();
        const { data, error } = await supabase
            .from("Articles")
            .select(
                "*, inventories(*, Article:Articles(*),Location:Locations(*))"
            )
            .filter("article_id","eq", id).single()
           

        if (error) {
            console.error("There was an error fetching the article: ", error.message);
            return null;
        }

        console.log(data)

        return data;


    };

    const article: JoinedArticle = await fetchArticle(id) as unknown as JoinedArticle

    if (!article) {
        return <div className="p-4">Article not found.</div>;
    }

    return (
        <div className="p-4 m-top flex justify-center flex-col gap-3">
            <Toaster></Toaster>
            <h1 className="text-2xl font-bold mb-4">{article.Name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                {/* Article Details */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">
                        Article Details
                    </h2>
                    <p className="mb-2">
                        <strong>EAN:</strong> {article.EAN}
                    </p>
                    <p className="mb-2">
                        <strong>PCS:</strong> {article.PCS}
                    </p>
                    <p className="mb-2">
                        <strong>Size:</strong> {article.Size}
                    </p>
                    <p className="mb-2">
                        <strong>Unit:</strong> {article.Unit}
                    </p>
                    <p className="mb-2">
                        <strong>Article ID:</strong> {article.article_id}
                    </p>
                </div>

                {/* Location Inventory */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">
                        Inventory by Location
                    </h2>
                    {article.inventories && article.inventories.length > 0
                        ? (
                            <div className="space-y-3">
                                {article.inventories.map((i) => (
                                    <div
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
                                                    Zone:{" "}
                                                    {i.Location
                                                        ?.zone || "N/A"} | Rack:
                                                    {" "}
                                                    {i.Location
                                                        ?.rack || "N/A"}{" "}
                                                    | Shelf:{" "}
                                                    {i.Location
                                                        ?.shelf || "N/A"}
                                                </p>
                                                {i.Location?.bin && (
                                                    <p className="text-sm text-gray-600">
                                                        Bin:{" "}
                                                        {i.Location
                                                            .bin}
                                                    </p>
                                                )}

                                                <p>{`Location Code: ${i.Location.location_code}`}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Last Updated:{" "}
                                                    {new Date(
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
                                    </div>
                                ))}

                                {/* Total Inventory Summary */}
                                <div className="border-t pt-3 mt-4">
                                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                        <span className="font-semibold">
                                            Total Inventory:
                                        </span>
                                        <span className="text-xl font-bold text-blue-600">
                                            {article.inventories.reduce(
                                                (total: number, inv: any) =>
                                                    total + (inv.quantity || 0),
                                                0,
                                            )} units
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Available in{" "}
                                        {article.inventories.length}{" "}
                                        location{article.inventories.length !==
                                                1
                                            ? "s"
                                            : ""}
                                    </p>
                                </div>
                            </div>
                        )
                        : (
                            <div className="text-center py-4 text-gray-500">
                                <p>No inventory found for this article</p>
                            </div>
                        )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit Article
                </button>
                <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete Article
                </button>
                <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Add Inventory
                </button>
            </div>
        </div>
    );
}
