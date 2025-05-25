'use client'; // This directive makes this file a Client Component

import { useRouter, usePathname } from 'next/navigation'; // Correct import for App Router
import { useEffect, useState } from 'react';

export default function GoBackButton() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path from the URL
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Check if the current path is not the root path ("/")
    // usePathname directly gives you the path, excluding query params and hash.
    // If you need to consider query params, use router.asPath from next/router in a Pages Router app,
    // or use a combination of usePathname and useSearchParams in an App Router app.
    // For a simple root check, usePathname is generally sufficient.
    setShowButton(pathname !== '/');
  }, [pathname]); // Re-run effect when pathname changes

  const handleGoBack = () => {
    router.back();
  };

  if (!showButton) {
    return null; // Don't render the button if we are on the root path
  }

  return (
    
      <button
        onClick={handleGoBack}
        className="px-4 py-2 w-1/4  bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go Back
      </button>
 
  );
}

