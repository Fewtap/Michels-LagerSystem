// NavbarWrapper.tsx (Server Component)
import { createClient } from "@/utils/browserclient";
import { User } from "@supabase/supabase-js";
import { headers } from "next/headers";
import ResponsiveNavbar from "./navbar"; // The client component above

interface NavbarWrapperProps {
  user: User | null;
}

const NavbarWrapper = async ({ user }: NavbarWrapperProps) => {
  const isInHomePage = await headers().then((headerslist) => {
    const url = headerslist.get("x-url");
    return url === "/" ? true : false;
  });

  return <ResponsiveNavbar user={user} isInHomePage={isInHomePage} />;
};

export default NavbarWrapper;