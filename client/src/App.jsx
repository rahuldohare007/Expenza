// import { Outlet, useLocation } from 'react-router-dom';
// import Footer from './pages/Footer';
// import Header from './pages/Header';

// function App() {
//   const location = useLocation();
//   const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

//   return (
//     <>
//       {!isAuthPage && <Header />}
//       <Outlet />
//       {!isAuthPage && <Footer />}
//     </>
//   );
// }

// export default App;

// import { Outlet, useLocation } from 'react-router-dom';
// import Footer from './pages/Footer';
// import Header from './pages/Header';

// function App() {
//   const location = useLocation();
//   const noHeaderFooterPages = ['/signin', '/signup', '/dashboard'];

//   // Check if the current page is one of those where we don't want to show Header and Footer
//   const isNoHeaderFooterPage = noHeaderFooterPages.includes(location.pathname);

//   return (
//     <>
//       {!isNoHeaderFooterPage && <Header />}
//       <Outlet />
//       {!isNoHeaderFooterPage && <Footer />}
//     </>
//   );
// }

// export default App;

// Inside App.jsx

// App.jsx

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

