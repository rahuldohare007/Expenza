import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;

