import { redirect } from "next/navigation";
import { createClient } from "./serverclient";
import { Redirect } from "next";

export async function checkAuth() {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
        return null;
    }

    return session.user;
}


