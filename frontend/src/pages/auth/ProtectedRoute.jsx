import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/common/Loading.jsx';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return <Loading fullScreen text="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;