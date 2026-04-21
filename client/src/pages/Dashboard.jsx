import { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; // you can use any icon library

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile header with toggle */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-full md:w-64 p-5 space-y-4 transition-all duration-300
        ${isSidebarOpen ? "block" : "hidden"} md:block`}
      >
        <h2 className="text-xl font-bold mb-5 hidden md:block">Admin Panel</h2>
        <ul>
          <li
            className={`p-2 rounded ${
              location.pathname.includes("granthlist")
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            <Link to="/dashboard/granthlist">Granth Management</Link>
          </li>
           <li
            className={`p-2 rounded ${
              location.pathname.includes("granthlist")
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
          >
            <Link to="/dashboard/mandirlist">Mandir Management</Link>
          </li>
        </ul>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
