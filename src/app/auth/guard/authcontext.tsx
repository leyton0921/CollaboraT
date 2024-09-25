"use client"; // Indicates that this component can use client-side features.

import { useEffect, useState } from 'react'; // Import hooks from React.
import { useRouter } from 'next/navigation'; // Import useRouter to handle navigation in Next.js.

interface AdminGuardProps {
  children: React.ReactNode; // Define the type for children prop.
}

// Higher-Order Component that protects a wrapped component.
const withAdminGuard = (WrappedComponent: React.ComponentType) => {
  // This function returns a new component that checks for admin access.
  return function AdminGuardedComponent(props: any) {
    // State to track if the user is authorized.
    const [isAuthorized, setIsAuthorized] = useState(false);
    // State to track if the loading is still in progress.
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); // Get the router object for navigation.

    useEffect(() => {
      // Function to check if the user is authorized.
      const checkAuthorization = () => {
        const token = localStorage.getItem('token'); // Get the token from local storage.
        if (!token) {
          router.push('/login'); // If no token, redirect to login page.
          return; // Stop the function here.
        }


        // Check if the user has an admin role (this is a simulation).

        const isAdmin = localStorage.getItem('role') === 'admin';
        
        if (!isAdmin) {
          router.push('/user'); // If not an admin, redirect to user page.
          return; // Stop the function here.
        }

        // If the user is an admin, set the authorization state to true.
        setIsAuthorized(true);
        setIsLoading(false); // Set loading to false since the check is complete.
      };

      checkAuthorization(); // Call the function to check authorization.
    }, [router]); // Run this effect when the component mounts.

    // If still loading, show a loading message.
    if (isLoading) {
      return <p>Loading...</p>;
    }

    // If not authorized, show a redirecting message.
    if (!isAuthorized) {
      return <p>Redirecting...</p>;
    }

    // If everything is fine, render the wrapped component with its props.
    return <WrappedComponent {...props} />;
  };
};

export default withAdminGuard; // Export the AdminGuard HOC for use in other components.
