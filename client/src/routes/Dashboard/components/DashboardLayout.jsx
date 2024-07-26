import DashboardHeader from "./DashboardHeader";
import SideNav from "./SideNav";

export default function DashboardLayout({ children, userData }) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav userData={userData} />
      </div>
      <div className="md:ml-64">
        <DashboardHeader userData={userData} />
        {children}
      </div>
    </div>
  );
}
