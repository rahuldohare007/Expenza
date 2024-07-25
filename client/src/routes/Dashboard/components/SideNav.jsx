import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../resources/ExpenzaLogo2.png";
import UserProfile from "../../../resources/UserProfile.png";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

export default function SideNav({ userData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      // path:,
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      // path:,
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      // path:,
    },
  ];

  return (
    <div className="h-screen p-5 border shadow-md">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="ExpenzaLogo" className="h-10 w-10" />
        <h1 className="text-2xl text-indigo-700 font-bold p-1">Expenza</h1>
      </div>
      <div className="mt-5">
        {menuList.map((menu) => (
          <h2
            key={menu.id}
            className="flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-indigo-700 hover:bg-blue-100"
          >
            <menu.icon />
            <Link to={menu.path}>{menu.name}</Link>
          </h2>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex items-center">
        <div className="relative flex flex-col items-start">
          <div className="flex items-center">
            <img
              id="avatarButton"
              type="button"
              className="w-10 h-10 rounded-full cursor-pointer"
              src={UserProfile}
              onClick={toggleDropdown}
              alt="User dropdown"
            />
            <div className="ml-3 flex flex-col items-start">
              <h5 className="text-gray-700">
                Hi,{" "}
                <span className="text-indigo-700 font-bold">
                  {userData?.username}!
                </span>
              </h5>
              <span
                className="text-gray-900 font-medium cursor-pointer"
                onClick={toggleDropdown}
              >
                Profile
              </span>
            </div>
          </div>

          {isDropdownOpen && (
            <div
              id="userDropdown"
              className="absolute z-10 top-[-15rem] left-8 mt-2 bg-white divide-y rounded-lg shadow-md border w-50 cursor-pointer"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>{userData?.username}</div>
                <div className="font-medium truncate">{userData?.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="avatarButton"
              >
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Earnings
                  </Link>
                </li>
              </ul>
              <div className="py-1">
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={handleSignOut}
                >
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
