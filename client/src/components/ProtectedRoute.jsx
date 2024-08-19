import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? children : <Navigate to="https://expenza-api.vercel.app/api/auth/signin" />;
};

export default ProtectedRoute;