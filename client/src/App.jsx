import { Outlet, useLocation } from 'react-router-dom';
import Footer from './pages/Footer';
import Header from './pages/Header';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
