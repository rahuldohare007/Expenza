import { Link, useLocation } from "react-router-dom";
import Logo from "../../../resources/ExpenzaLogo2.png";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import UserButton from "./UserButton";
import { useEffect } from "react";

export default function SideNav({ userData }) {
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
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrades",
    },
  ];

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border-2 shadow-md">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="ExpenzaLogo" className="h-10 w-10" />
        <h1 className="text-2xl text-indigo-700 font-bold p-1">Expenza</h1>
      </div>
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link to={menu.path} key={menu.id}>
            <h2
              className={`${
                path === menu.path && "text-indigo-700 bg-blue-100"
              } flex gap-2 mb-1 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-indigo-700 hover:bg-blue-100`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-5 p-5 flex items-center">
        <UserButton userData={userData} position="above" />
        <div className="ml-3 flex flex-col items-start">
          <h5 className="text-gray-700">
            Hi,{" "}
            <span className="text-indigo-700 font-bold">
              {userData?.username}!
            </span>
          </h5>
          <h5>Profile</h5>
        </div>
      </div>
    </div>
  );
}


