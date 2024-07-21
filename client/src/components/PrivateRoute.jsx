import { Navigate } from 'react-router-dom';

// A component to protect private routes
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
