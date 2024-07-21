// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const accessToken = localStorage.getItem('accessToken');

//       if (!accessToken) {
//         navigate('/signin');
//         return;
//       }

//       try {
//         await axios.get('http://localhost:8080/api/protected', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//       } catch (err) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         navigate('/signin');
//       }
//     };

//     checkAuthentication();
//   }, [navigate]);

//   return <div className='text-3xl text-center font-bold mt-5'>Welcome to the Dashboard!</div>;
// };

// export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const accessToken = localStorage.getItem('accessToken');

//       if (!accessToken) {
//         navigate('/signin');
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:8080/api/dashboard', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         // Assuming the backend sends user data in the response
//         setUserData(response.data);
//       } catch (err) {
//         console.error('Authentication Error:', err);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         setError('Session expired. Please sign in again.');
//         navigate('/signin');
//       }
//     };

//     checkAuthentication();
//   }, [navigate]);

//   return (
//     <div className='text-3xl text-center font-bold mt-5'>
//       {error ? (
//         <div>{error}</div>
//       ) : userData ? (
//         <div>
//           <h1>Welcome to the Dashboard, {userData.username}!</h1>
//           {/* Render more user-specific content here */}
//         </div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// Inside Dashboard.jsx

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
        await axios.get('http://localhost:8080/api/auth/dashboard', {
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

  return <div className='text-3xl text-center text-purple-950 font-bold mt-5'>Welcome to the Dashboard!{console.log('Hello Baby!')}</div>;
};

export default Dashboard;
