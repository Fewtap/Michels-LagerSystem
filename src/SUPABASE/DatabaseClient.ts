
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../Interfaces/types'
import type { Article } from '../Classes/Article'
import { Conversion } from '../Classes/Conversion'
const supabaseUrl = import.meta.env.VITE_API_URL
const supabaseKey = import.meta.env.VITE_LOCAL_API_KEY




/**
 * The `Database` class is a singleton that manages the connection to a Supabase database.
 * It ensures that only one instance of the database connection exists throughout the application.
 * 
 * Usage:
 * - Use `Database.connect()` to establish a connection to the Supabase database.
 * - Use `Database.getInstance()` to retrieve the single instance of the `Database` class.
 * 
 * @example
 * ```typescript
 * // Establish a connection to the database
 * Database.connect();
 * 
 * // Retrieve the singleton instance of the Database class
 * const dbInstance = Database.getInstance();
 * ```
 */
export default class DatabaseClient {

    public db!: SupabaseClient<Database>
    static Instance: DatabaseClient

    /**
     * The constructor is private to prevent direct instantiation of the class.
     * It initializes the Supabase client and sets the singleton instance.
     */
    private constructor() {
        // Prevent instantiation
        if (DatabaseClient.Instance) {
            throw new Error("Use Database.getInstance() to get the single instance of this class.")
        }

        // Initialize the Supabase client
        this.connect()
        DatabaseClient.Instance = this
        console.log("Supabase client initialized")
    }

    /**
     * Checks if the database connection is established.
     * 
     * @returns A boolean indicating whether the connection is established.
     */
    private isConnected(): boolean{
        if (this.db) {
            return true
        } else {
            return false
        }
    }

    /**
     * Establishes a connection to the Supabase database.
     * If the connection already exists, it does nothing.
     */
    private connect() {
        if (!this.db) {
            this.db = createClient<Database>(supabaseUrl, supabaseKey)
            console.log("Connected to Supabase")
        } else {
            console.log("Already connected to Supabase")
        }
    }

    /**
     * Returns the singleton instance of the `Database` class.
     * If the instance does not exist, it creates a new one.
     * 
     * @returns The singleton instance of the `Database` class.
     */
    static getInstance(): DatabaseClient {
        if(!DatabaseClient.Instance) {
            DatabaseClient.Instance = new DatabaseClient()
        }

        return DatabaseClient.Instance;
    }

    static async fetchAllArticles(): Promise<Article[]> {
        const { data, error } = await DatabaseClient.getInstance().db
            .from("Articles")
            .select("*")

        if (error) {
            console.error("Error fetching articles:", error)
            return []
        } else {
            let articles: Article[] = Conversion.convertToArticles(data)
            console.log("Fetched articles:", articles)
            return articles
        }
    }
    
}

