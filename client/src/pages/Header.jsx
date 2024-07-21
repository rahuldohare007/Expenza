import Logo from "../resources/ExpenzaLogo2.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="p-2 fixed w-full flex justify-between items-center border shadow-md bg-white">
      <div className="flex justify-start items-center">
        <img src={Logo} alt="ExpenzaLogo" className="h-10 w-10" />
        <h1 className="text-2xl text-indigo-700 font-bold p-1">Expenza</h1>
      </div>
      <div>
        <button
          type="button"
          className="text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <Link to="/signin">Get Started</Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
