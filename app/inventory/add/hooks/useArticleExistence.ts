// hooks/useArticleExistence.ts
import { useState, useEffect } from 'react';
import type { Article, JoinedInventory, Location } from '@/Types/database.types';

export function useArticleExistence(
  selectedArticle: Article | undefined,
  selectedLocation: Location | undefined,
  inventories: JoinedInventory[]
) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!selectedArticle || !selectedLocation || !inventories.length) {
      setExists(false);
      return;
    }

    const articleExists = inventories.some(
      (inventory) =>
        inventory.article_id === selectedArticle.article_id &&
        inventory.location_id === selectedLocation.location_id
    );

    setExists(articleExists);
  }, [selectedArticle, selectedLocation, inventories]);

  return exists;
}