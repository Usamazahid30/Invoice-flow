import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../dashboard/dashboard.css";
import { Link } from "react-router-dom";
import profile from "../../../src/profile.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const Dashboard = () => {
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

  return (
    <div className="flex">
      {/* <h1>Invoice Flow</h1> */}
      {/* Sidebar */}
      <div className="h-screen bg-gray-900 text-white w-64 p-4 flex flex-col fixed  rounded-tr-3xl">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
          <div className="flex justify-center items-center w-full ">
            <img
              className="w-[120px] h-{120px} rounded-full mt-10  border-2 border-white"
              src={profile}
              alt="user"
            />
          </div>
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {email}
      </span> */}
      
        </div>

        <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white mb-8 ">
            Al Mehria Engineering
          </span>
        <nav className="flex flex-col space-y-2 mb-4">
          <Link
            to="/dashboard/home"
            className={getLinkClasses("/dashboard/home")}
          >
            <i class="fa-solid fa-house"></i> {""}
            Home
          </Link>
          <Link
            to="/dashboard/invoices"
            className={getLinkClasses("/dashboard/invoices")}
          >
            <i class="fa-solid fa-file-lines"></i> {""}
            Invoices
          </Link>
          <Link
            to="/dashboard/newinvoice"
            className={getLinkClasses("/dashboard/newinvoice")}
          >
            <i class="fa-solid fa-folder-plus"></i> 
            {" "}
            New Invoice 
          </Link>
          <Link
            to="/dashboard/setting"
            className={getLinkClasses("/dashboard/setting")}
          >
            <i class="fa-solid fa-gear"></i>
            {" "}
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
            <i class="fa-solid fa-right-from-bracket"></i>
            {" "}
            Log Out
          </button>
        </div>
      </div>

      {/* Render Home Component */}
      <div className="ml-64 flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
