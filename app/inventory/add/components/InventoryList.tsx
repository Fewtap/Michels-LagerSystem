import type { Article, JoinedInventory } from '@/Types/database.types';

interface InventoryListProps {
  inventories: JoinedInventory[];
  selectedArticle?: Article;
}

export function InventoryList({ inventories, selectedArticle }: InventoryListProps) {
  if (!inventories.length) {
    return (
      <div>
        <h1>Articles in location:</h1>
        <h2 className="mt-5">No Articles found in location</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Articles in location:</h1>
      <ul className="mt-5">
        {inventories.map((inventory) => (
          <li key={inventory.inventory_id}>
            {selectedArticle?.article_id === inventory.article_id
              ? `✅${inventory.Article.Name}`
              : `⛔${inventory.Article.Name}`}
            <br />
            {`Quantity: ${inventory.quantity}`}
          </li>
        ))}
      </ul>
    </div>
  );
}