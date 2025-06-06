import { JoinedInventory } from '@/Types/database.types'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/Types/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export enum Table {
  ARTICLE_ID = "article_id",
  LOCATION_ID = "location_id"
}

export async function GetServerInventories(table: Table, id: string): Promise<JoinedInventory[]>{
  const supabase: SupabaseClient<Database> = await createClient()

  console.log("Table: ", table.valueOf())

  const response = await supabase.from("inventories").select("*, Location:Locations(*),Article:Articles(*)").filter(table.toString(),"eq",id)

  return response.data ? response.data as JoinedInventory[] : []
}