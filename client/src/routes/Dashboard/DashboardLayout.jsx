import DashboardHeader from "./components/DashboardHeader";
import SideNav from "./components/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
