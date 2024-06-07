
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../dashboard/dashboard.css";
import { Link } from "react-router-dom";
import profile from "../../../src/profile.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "block py-2 px-3 text-white bg-blue-700 rounded"
      : "block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`h-screen bg-gray-900 text-white ${isSidebarOpen ? "w-64" : "w-20"} p-4 flex flex-col fixed rounded-tr-3xl transition-width duration-300`}>
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-16">
          {isSidebarOpen && (
            <div className="flex justify-center items-center w-full ">
              <img
                className="w-[120px] h-[120px] rounded-full mt-10 border-2 border-white"
                src={profile}
                alt="user"
              />
            </div>
          )}
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {email}
          </span> */}
        </div>
        <nav className="flex flex-col space-y-2 mb-4">
          <Link
            to="/dashboard/home"
            className={getLinkClasses("/dashboard/home")}
          >
            Home
          </Link>
          <Link
            to="/dashboard/invoices"
            className={getLinkClasses("/dashboard/invoices")}
          >
            Invoices
          </Link>
          <Link
            to="/dashboard/newinvoice"
            className={getLinkClasses("/dashboard/newinvoice")}
          >
            New Invoice
          </Link>
          <Link
            to="/dashboard/setting"
            className={getLinkClasses("/dashboard/setting")}
          >
            Setting
          </Link>
          {/* <Link
            to=""
            className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded"
          >
            Contact
          </Link> */}
        </nav>
        <div className="flex flex-col items-center mt-auto">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-full"
      >
        {isSidebarOpen ? "<" : ">"}
      </button>

      {/* Render Home Component */}
      <div className={`ml-${isSidebarOpen ? "64" : "20"} flex-1 p-8 transition-margin duration-300`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
