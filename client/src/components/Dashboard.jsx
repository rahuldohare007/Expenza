// function Dashboard() {
//   return <div className="mt-10 text-5xl text-center text-dark">Dashboard</div>;
// }

// export default Dashboard;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setUserData(response.data);
      } catch (error) {
        navigate('/signin');
      }
    };

    fetchData();
  }, [navigate]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {userData.username}!</h1>
      <p className="mt-4">You have successfully logged in.</p>
      {/* Add more dashboard content here */}
    </div>
  );
}
