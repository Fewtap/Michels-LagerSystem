import type { Article } from "../Classes/Article"
import type { Location } from "../Classes/Location"

export type Inventory = {
    inventory_id: string,
    article_id: number,
    location_id: string,
    quantity: number,
    last_updated: string
}

export type JoinedInventory = Inventory & {
    Article: Article
    Location: Location
}


