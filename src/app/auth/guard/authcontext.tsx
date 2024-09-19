"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminGuardProps {
  children: React.ReactNode;
}

const withAdminGuard = (WrappedComponent: React.ComponentType) => {
  return function AdminGuardedComponent(props: any) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuthorization = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Aquí deberías decodificar el token o hacer una llamada a la API
        // para verificar si el usuario es admin. Por ahora, simularemos esto:
        const isAdmin = localStorage.getItem('role') === 'admin';
        
        if (!isAdmin) {
          router.push('/user');
          return;
        }

        setIsAuthorized(true);
        setIsLoading(false);
      };

      checkAuthorization();
    }, [router]);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!isAuthorized) {
      return <p>Redirecting...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminGuard;