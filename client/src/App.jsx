import { Outlet } from 'react-router-dom';
import Footer from "./pages/Footer";
import Header from "./pages/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
