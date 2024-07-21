// function Dashboard() {
//   return <div className="mt-10 text-5xl text-center text-dark">Dashboard</div>;
// }

// export default Dashboard;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        navigate('/signin');
        return;
      }

      try {
        await axios.get('http://localhost:8080/api/protected', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/signin');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return <div className='text-3xl text-center font-bold mt-5'>Welcome to the Dashboard!</div>;
};

export default Dashboard;
