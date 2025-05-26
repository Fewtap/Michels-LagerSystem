import { Article, Database, JoinedInventory, Location } from "@/Types/database.types";
import { createClient } from "@/utils/browserclient";
import { SupabaseClient } from "@supabase/supabase-js";

// Custom error classes for better error handling
export class InventoryError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'InventoryError';
  }
}

export class ValidationError extends InventoryError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// Type for the result of inventory operations
export interface InventoryOperationResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Validates input parameters for inventory operations
 */
function validateInventoryInputs(
  article: Article, 
  location: Location, 
  quantity: number
): void {
  if (!article?.article_id) {
    throw new ValidationError('Invalid article: article_id is required');
  }
  
  if (!location?.location_id) {
    throw new ValidationError('Invalid location: location_id is required');
  }
  
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    throw new ValidationError('Quantity must be a valid number');
  }
}

/**
 * Gets the current user ID with error handling
 */
async function getCurrentUserId(supabase: SupabaseClient<Database>): Promise<string> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new InventoryError(`Authentication error: ${error.message}`, 'AUTH_ERROR');
    }
    
    if (!user?.id) {
      throw new InventoryError('User not authenticated', 'NO_USER');
    }
    
    return user.id;
  } catch (error) {
    if (error instanceof InventoryError) {
      throw error;
    }
    throw new InventoryError('Failed to get current user', 'AUTH_FAILURE');
  }
}

/**
 * Creates a new inventory item
 */
async function createInventoryItem(
  article: Article,
  location: Location,
  quantity: number,
  supabase: SupabaseClient<Database>
): Promise<InventoryOperationResult> {
  try {
    const userId = await getCurrentUserId(supabase);
    
    const { data, error } = await supabase
      .from("inventories")
      .insert({
        location_id: location.location_id,
        quantity: quantity,
        article_id: article.article_id,
        created_by: userId
      })
      .select("*")
      .single();

    if (error) {
      throw new InventoryError(`Failed to create inventory item: ${error.message}`, 'CREATE_ERROR');
    }

    console.log("Inventory item created successfully:", data);
    return { success: true, data };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error creating inventory item:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Updates an existing inventory item quantity
 */
async function updateInventoryItem(
  inventory: JoinedInventory,
  quantityChange: number,
  supabase: SupabaseClient<Database>
): Promise<InventoryOperationResult> {
  try {
    if (!inventory.inventory_id) {
      throw new ValidationError('Invalid inventory: inventory_id is required');
    }

    const currentQuantity = inventory.quantity || 0;
    let newQuantity: number;

    if (quantityChange < 0) {
      // Removing items
      newQuantity = currentQuantity - Math.abs(quantityChange);
    } else {
      // Adding items
      newQuantity = currentQuantity + quantityChange;
    }

    // Prevent negative inventory
    if (newQuantity < 0) {
      throw new ValidationError(
        `Insufficient inventory. Current: ${currentQuantity}, Requested change: ${quantityChange}`
      );
    }

    const { data, error } = await supabase
      .from("inventories")
      .update({ quantity: newQuantity })
      .eq('inventory_id', inventory.inventory_id)
      .select("*")
      .single();

    if (error) {
      throw new InventoryError(`Failed to update inventory item: ${error.message}`, 'UPDATE_ERROR');
    }

    console.log("Inventory item updated successfully:", data);
    return { success: true, data };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error updating inventory item:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Main function to add or update inventory items
 * @param article - The article to add/update
 * @param location - The location where the item is stored
 * @param quantity - The quantity to add (positive) or remove (negative)
 * @param inventory - Existing inventory item (if updating)
 * @returns Promise<InventoryOperationResult>
 */
export async function addOrUpdateInventoryItem(
  article: Article,
  location: Location,
  quantity: number,
  inventory: JoinedInventory | null = null
): Promise<InventoryOperationResult> {
  try {
    // Early return for zero quantity when no existing inventory
    if (quantity === 0 && !inventory) {
      return { 
        success: false, 
        error: 'Cannot create inventory item with zero quantity' 
      };
    }

    // Validate inputs
    validateInventoryInputs(article, location, quantity);

    const supabase: SupabaseClient<Database> = createClient();

    // Update existing inventory
    if (inventory) {
      // Skip operation if trying to change by 0
      if (quantity === 0) {
        return { 
          success: true, 
          data: inventory,
          error: 'No change applied (quantity change was 0)' 
        };
      }
      
      return await updateInventoryItem(inventory, quantity, supabase);
    }

    // Create new inventory item (only for positive quantities)
    if (quantity > 0) {
      return await createInventoryItem(article, location, quantity, supabase);
    }

    // Cannot create inventory with negative or zero quantity
    return { 
      success: false, 
      error: 'Cannot create new inventory item with non-positive quantity' 
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error in addOrUpdateInventoryItem:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Backward compatibility wrapper (optional - you can remove this if you update all calling code)
export async function AddItem(
  article: Article,
  location: Location,
  quantity: number,
  inventory: JoinedInventory | null = null
): Promise<void> {
  const result = await addOrUpdateInventoryItem(article, location, quantity, inventory);
  
  if (!result.success) {
    console.error("AddItem operation failed:", result.error);
  }
}