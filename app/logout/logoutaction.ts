'use server';

import { createClient } from "@/utils/serverclient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Logout(formata: FormData): Promise<void> {
  
  // Create a Supabase client and sign out the user
  
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({
      scope:"global"
    });
    if (error) {
        console.error("Error signing out:", error);
        // Optionally, you can handle the error (e.g., show a message to the user)
        return;
    }

    
    (await cookies()).getAll().forEach(async (cookie) => {
         (await cookies()).delete(cookie.name)});
    console.log(
"User logged out successfully, redirecting to login page.");
    //empty the local storage
    
    // Redirect to login page after successful logout
    redirect("/login")

  return; // This component does not render anything
}
