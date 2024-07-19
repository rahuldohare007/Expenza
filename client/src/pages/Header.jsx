import Logo from "../resources/ExpenzaLogo2.png";
function Header() {
  return (
    <>
      <div className="p-2 flex justify-between items-center border shadow-md">
        <div className="flex justify-start items-center">
          <img src={Logo} alt="ExpenzaLogo" />
          <h1 className="text-2xl text-indigo-700 font-bold p-1">Expenza</h1>
        </div>
        <div>
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Get Started</button>
        </div>
      </div>
    </>
  );
}

export default Header;
