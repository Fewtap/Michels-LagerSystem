"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AddItem } from "./AddUtils";
import { useInventoryData } from "./hooks/useInventoryData";
import { useLocationInventory } from "./hooks/useLocationInventory";

import type { Article, JoinedInventory } from "@/Types/database.types";
import { ArticleSelector } from "./components/ArticleSelector";
import { LocationSelector } from "./components/LocationSelector";
import { AddItemModal } from "./components/AddItemModal";
import { InventoryList } from "./components/InventoryList";
import { useArticleExistence } from "./hooks/useArticleExistence";
import { useEffect } from "react";


export default function Add() {
  const { articles, locations, loading: dataLoading, refetch } = useInventoryData();
  const { selectedLocation, inventories, setLocation } = useLocationInventory();
  
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(100);

  const articleExists = useArticleExistence(selectedArticle, selectedLocation, inventories);

  // Initialize with first items when data loads
  // Initialize with first items when data loads

  useEffect(() => {
    if (articles.length > 0 && !selectedArticle) {
      setSelectedArticle(articles[0]);
    }
    if (locations.length > 0 && !selectedLocation) {
      setLocation(locations[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, locations]);

  const handleInventoryUpdate = async () => {
    if (!selectedArticle || !selectedLocation) return;

    try {
      if (articleExists) {
        const inventory = inventories.find(
          (inv) =>
            inv.article_id === selectedArticle.article_id &&
            inv.location_id === selectedLocation.location_id
        );
        await AddItem(selectedArticle, selectedLocation, amount, inventory);
      } else {
        await AddItem(selectedArticle, selectedLocation, amount);
      }

      toast.success("Item added successfully!");
      await refetch();
      await setLocation(selectedLocation)
    } catch (error) {
      toast.error("Failed to add item");
      console.error("Error adding item:", error);
    }
  };

  if (dataLoading) {
    return (
      <main>
        <div className="flex justify-center items-center h-64">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Toaster />
      <section>
        <div className="flex flex-col justify-center items-center gap-5">
          <ArticleSelector
            articles={articles}
            selectedArticle={selectedArticle}
            onArticleChange={setSelectedArticle}
          />
          
          <div className="flex gap-2">
            <LocationSelector
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={setLocation}
            />
            <button
              className="px-4 py-2 bg-[#A8763E] text-white rounded shadow hover:bg-[#3A5A40] disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              onClick={() => setShowModal(true)}
              disabled={!selectedArticle || !selectedLocation}
            >
              Add Article to location...
            </button>
          </div>

          <AddItemModal
            open={showModal}
            onClose={() => setShowModal(false)}
            selectedArticle={selectedArticle}
            selectedLocation={selectedLocation}
            amount={amount}
            onAmountChange={setAmount}
            onConfirm={handleInventoryUpdate}
          />

          <InventoryList
            inventories={inventories}
            selectedArticle={selectedArticle}
          />
        </div>
      </section>
    </main>
  );
}

