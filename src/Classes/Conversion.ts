import { Article } from "./Article";
import Database from "../SUPABASE/supabase";



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
        return new Article(
            data.Article,
            data.Name,
            data.Size,
            data.Unit,
            data.PCS,
            data.EAN
        );
    }

    static convertToArticles(data: any[]): Article[] {
        // Convert the array of data to an array of Article objects
        return data.map(item => this.convertToArticle(item));
    }

}