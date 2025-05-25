'use client';

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import Logout from "@/app/logout/logoutaction";
import GoBackButton from "@/Client Components/GoBackButton";
import { useState } from "react";

interface NavbarProps {
  user: User | null;
  isInHomePage?: boolean;
}

const Navbar = ({ user, isInHomePage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = user !== null && user !== undefined;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-purple-950 border-b border-purple-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section - Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <GoBackButton />
              <div className="flex-shrink-0">
                <h1 className="text-white text-lg font-semibold hidden sm:block">
                  Welcome to my WMS
                </h1>
                <h1 className="text-white text-sm font-semibold sm:hidden">
                  WMS
                </h1>
              </div>
            </div>

            {/* Center section - Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/inventory"
                  className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Inventory
                </Link>
                <Link
                  href="/articles"
                  className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Articles
                </Link>
                <Link
                  href="/locations"
                  className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Locations
                </Link>
                <Link
                  href="/help"
                  className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Help
                </Link>
              </div>
            </div>

            {/* Right section - User info and actions */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300 text-sm">
                      Welcome, {user.email?.split('@')[0]}
                    </span>
                    <Link
                      href="/profile"
                      className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <form action={Logout}>
                      <button
                        type="submit"
                        className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="text-gray-300 hover:bg-purple-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-900 border-t border-purple-800">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/inventory"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Inventory
            </Link>
            <Link
              href="/articles"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Articles
            </Link>
            <Link
              href="/locations"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Locations
            </Link>
            <Link
              href="/help"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Help
            </Link>
            
            {/* Mobile user section */}
            <div className="border-t border-purple-700 pt-4">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-gray-300 text-sm">
                    Welcome, {user.email?.split('@')[0]}
                  </div>
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <form action={Logout}>
                    <button
                      type="submit"
                      onClick={closeMobileMenu}
                      className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;