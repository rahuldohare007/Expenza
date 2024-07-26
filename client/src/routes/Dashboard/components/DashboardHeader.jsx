import UserButton from "./UserButton";

export default function DashboardHeader({ userData }) {
  return (
    <div className="p-3 px-10 border-b-2 shadow-sm flex justify-between items-center">
      <div>Search 🔎</div>
      <div>
        <UserButton userData={userData} position="below" />
      </div>
    </div>
  );
}

