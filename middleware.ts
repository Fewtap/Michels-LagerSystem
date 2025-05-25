import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkAuth";
import { Database } from "@/Types/database.types";
import { createClient } from "./utils/serverclient";
import { User } from "@supabase/supabase-js";

export async function middleware(request: NextRequest) {
  //if the url ends with logout then redirect to login
  

  

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  

 

  const session: User | null = await checkAuth();
  console.log("Session:", session);
  if (!session  && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/register") {
    // If no session, redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|login).*)",
  ],
};
