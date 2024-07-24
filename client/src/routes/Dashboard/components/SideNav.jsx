import Logo from "../../../resources/ExpenzaLogo2.png";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

export default function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      // path:,
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
        {menuList.map((menu, index) => (
          <h2 className="flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-indigo-700 hover:bg-blue-100">
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
      {/* <div>
        <img
          id="avatarButton"
          type="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer"
          // src="/docs/images/people/profile-picture-5.jpg"
          alt="User dropdown"
        />

        <div
          id="userDropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
