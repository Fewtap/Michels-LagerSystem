'use client';
import { Database } from "@/Types/database.types";
import { createClient } from "@/utils/browserclient";
import { User, UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Profile(){

    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const fetchUser = async () => {
            let user: User | null = (await createClient().auth.getUser()).data.user;
            // You might want to set the user state here
            setUser(user);
        };
        fetchUser();
    }, []);

    return(
        <div>
            <h1>{user?.email}</h1>
            <h1>{}</h1>
        </div>
    )
}