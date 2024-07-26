import { useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "../../../resources/UserProfile.png";

export default function UserButton({ userData, position }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const dropdownPosition = position === "below" ? "top-[2.5rem] right-5" : "top-[-15.2rem] left-8";

  return (
    <div className="relative flex flex-col items-start">
      <img
        id="avatarButton"
        type="button"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={UserProfile}
        onClick={toggleDropdown}
        alt="User dropdown"
      />
      {isDropdownOpen && (
        <div
          id="userDropdown"
          className={`absolute z-10 ${dropdownPosition} mt-2 bg-white divide-y rounded-lg shadow-2xl border w-50`}
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
              <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
                Settings
              </Link>
            </li>
            <li>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-200">
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
  );
}
