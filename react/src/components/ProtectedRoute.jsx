import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      toast.error('Your session has expired — please log in again.');
    }
    setChecking(false);
  }, [authenticated]);

  if (checking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;