import { Outlet, useLocation } from "react-router-dom";
import Footer from "./pages/Footer";
import Header from "./pages/Header";

function App() {
  const location = useLocation();

  const isSignInPage = location.pathname === "/signin";

  return (
    <>
      {!isSignInPage && <Header />}
      <Outlet />
      {!isSignInPage && <Footer />}
    </>
  );
}

export default App;
