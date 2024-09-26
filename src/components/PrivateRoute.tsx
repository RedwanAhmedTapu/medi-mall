'use client'
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Import your RootState type

interface PrivateRouteProps {
  WrappedComponent: ComponentType<any>; // The component being wrapped
}

// A higher-order component (HOC) for protecting routes
const PrivateRoute = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token); // Get the token from Redux
    console.log(token,"token")

    useEffect(() => {
      if (!token) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [token, router]);

    if (token) {
      return <WrappedComponent {...props} />;
    }

    // Optionally, show a loading spinner or some message while checking authentication
    return <div>Loading...</div>;
  };

  return ProtectedComponent;
};

export default PrivateRoute;
