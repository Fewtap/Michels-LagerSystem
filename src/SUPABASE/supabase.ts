
import { createClient, SupabaseClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ciflzdtzoiawmkfuwmux.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZmx6ZHR6b2lhd21rZnV3bXV4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzE1NTk2MiwiZXhwIjoyMDYyNzMxOTYyfQ.I5hCxKDJ2PxWcKhQdTVBgvD0151R5bWUTmpIVH9BCW8"





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
export default class Database {

    public db!: SupabaseClient
    static Instance: Database

    /**
     * The constructor is private to prevent direct instantiation of the class.
     * It initializes the Supabase client and sets the singleton instance.
     */
    private constructor() {
        // Prevent instantiation
        if (Database.Instance) {
            throw new Error("Use Database.getInstance() to get the single instance of this class.")
        }

        // Initialize the Supabase client
        this.connect()
        Database.Instance = this
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
            this.db = createClient(supabaseUrl, supabaseKey)
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
    static getInstance(): Database {
        if(!Database.Instance) {
            Database.Instance = new Database()
        }

        return Database.Instance;
    }
    /**
     * Fetches all items from the specified table in the Supabase database.
     * 
     * @param table - The name of the table to fetch data from.
     * @returns A promise that resolves to an array of items or null if an error occurs.
     */
    async getItems(table: string): Promise<any[] | null> {
        const { data, error } = await this.db
            .from(table).select('*')
        if (error) {
            console.error("Error fetching data:", error)
            return null
        }
        if (data) {
            return data
        } else {
            console.error("No data found")
            return null
        }
    }
}

