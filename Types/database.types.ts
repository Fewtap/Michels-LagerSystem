export type Article = Database["public"]["Tables"]["Articles"]["Row"]
export type Inventory = Database["public"]["Tables"]["inventories"]["Row"]
export type Location = Database["public"]["Tables"]["Locations"]["Row"]

export type ArticleInsert = Database["public"]["Tables"]["Articles"]

export type JoinedInventory = Inventory & {
  Article: Article,
  Location: Location
}

export type JoinedLocation = Location & {
  inventories: JoinedInventory[]

}

export type JoinedArticle = Article & {
        inventories: Inventory[]
    }




export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Articles: {
        Row: {
          article_id: number
          EAN: number | null
          Name: string | null
          PCS: number | null
          Size: string | null
          Unit: string | null
        }
        Insert: {
          article_id: number
          EAN?: number | null
          Name?: string | null
          PCS?: number | null
          Size?: string | null
          Unit?: string | null
        }
        Update: {
          article_id?: number
          EAN?: number | null
          Name?: string | null
          PCS?: number | null
          Size?: string | null
          Unit?: string | null
        }
        Relationships: []
      }
      inventories: {
        Row: {
          article_id: number | null
          inventory_id: string
          last_updated: string | null
          location_id: string
          quantity: number
        }
        Insert: {
          article_id?: number | null
          inventory_id?: string
          last_updated?: string | null
          location_id: string
          quantity: number
        }
        Update: {
          article_id?: number | null
          inventory_id?: string
          last_updated?: string | null
          location_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventory_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "inventory_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "Locations"
            referencedColumns: ["location_id"]
          },
        ]
      }
      Locations: {
        Row: {
          aisle: string | null
          bin: string | null
          location_code: string | null
          location_id: string
          location_type: string | null
          max_capacity: number | null
          rack: string | null
          shelf: string | null
          warehouse: string | null
          zone: string | null
        }
        Insert: {
          aisle?: string | null
          bin?: string | null
          location_code?: string | null
          location_id?: string
          location_type?: string | null
          max_capacity?: number | null
          rack?: string | null
          shelf?: string | null
          warehouse?: string | null
          zone?: string | null
        }
        Update: {
          aisle?: string | null
          bin?: string | null
          location_code?: string | null
          location_id?: string
          location_type?: string | null
          max_capacity?: number | null
          rack?: string | null
          shelf?: string | null
          warehouse?: string | null
          zone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
