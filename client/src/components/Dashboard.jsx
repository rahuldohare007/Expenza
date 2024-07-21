import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/auth/dashboard', {
          headers: {
            Authorization: accessToken, // Directly use the token
          },
        });

        setUserData(response.data);
      } catch (err) {
        console.error('Authentication Error:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setError('Session expired. Please sign in again.');
        navigate('/signin');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <div className='text-3xl text-center text-purple-950 font-bold mt-5'>
      {error ? (
        <div>{error}</div>
      ) : userData ? (
        <div>Welcome to the Dashboard, {userData.username}!</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
