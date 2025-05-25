import Link from "next/link";
import { createClient } from "@/utils/browserclient";
import { Database } from "@/Types/database.types";
import { headers } from "next/headers";

import { User } from "@supabase/supabase-js";
import Logout from "@/app/logout/logoutaction";
import GoBackButton from "../Client Components/GoBackButton";

const Navbar = async ({ user }: { user: User }) => {
  const isAuthenticated = user !== null && user !== undefined;
  const isInHomePage = await headers().then((headerslist) => {
    const url = headerslist.get("x-url");
    return url == "/" ? true : false;
  });

  return (
    <div>
      <div className="fixed w-full h-[5vh] bg-purple-950 grid grid-cols-3 items-center px-4 ">
        <div className="col-span-1 flex items-center space-x-4">
          <GoBackButton />
          <h1>Welcome to my WMS</h1>
        </div>

        <nav className="ml-4 justify-self-center">
          <ul className="flex space-x-4  text-white">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/inventory"}>Inventory</Link>
            </li>
            <li>
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li>
              <Link href={"/locations"}>Locations</Link>
            </li>
            <li>
              <Link href={"/help"}>Help</Link>
            </li>
          </ul>
        </nav>

        <div className="justify-self-end">
          {isAuthenticated
            ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user.email}</span>
                <Link href="/profile" className="text-white">Profile</Link>
                <form action={Logout}>
                  <button type="submit">Logout</button>
                </form>
              </div>
            )
            : <Link href="/login" className="text-white">Login</Link>}
        </div>
      </div>
      <div className="h-[5vh]"></div>
    </div>
  );
};

export default Navbar;
