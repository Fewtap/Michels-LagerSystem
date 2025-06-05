import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { createClient } from "@/utils/serverclient";
import { Database } from "@/Types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import ThemeRegistry from "@/components/ThemeRegistry";


// Configure Inter font with variable font support
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warehouse Management System",
  description: "Efficiently manage your warehouse inventory and locations",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase: SupabaseClient<Database> = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeRegistry>
          <div className="relative flex flex-col min-h-0">
            <Navbar user={session?.user ? session.user : null} />
            <main className="flex-1 min-h-0">
              <div className="container">
                {children}
              </div>
            </main>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
