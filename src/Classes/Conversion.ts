import { Article } from "./Article";
import DatabaseClient from "../SUPABASE/DatabaseClient";
import { Location } from "./Location";



/**
 * The `Conversion` class provides methods to convert data into Article objects.
 * It includes methods to convert a single data object and an array of data objects.
 * 
 * @example
 * ```typescript
 * const articleData = {
 *     Article: 1,
 *     Name: "Sample Article",
 *     Size: 100,
 *     Unit: "grams",
 *     PCS: 10,
 *     EAN: "1234567890123"
 * };
 * 
 * const article = Conversion.convertToArticle(articleData);
 * console.log(article.toString());
 * ```
 */
export class Conversion{

    static convertToArticle(data: any): Article {
        if (!data.Name || !data.Size || !data.Unit || !data.PCS || !data.EAN) {
            throw new Error("Invalid data");
        }
        return new Article(data);
    }

    static convertToArticles(data: any[]): Article[] {
        // Convert the array of data to an array of Article objects
        return data.map(item => this.convertToArticle(item));
    }

    static convertToLocation(data: any): Location {
        if (!data.location_id || !data.location_code) {
            throw new Error("Invalid data");
        }
        return new Location(data)
    }

    static convertToLocations(data: any[]): Location[] {
        // Convert the array of data to an array of Location objects
        return data.map(item => this.convertToLocation(item));
    }

}