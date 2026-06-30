import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCogs,
} from "react-icons/fa";
import {useAuth} from "../../context/authContext";

const Sidebar = () => {
    const {user}=useAuth()
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64">

      {/* Logo */}
      <div className="bg-teal-600 h-14 flex items-center justify-center">
        <h3 className="text-2xl font-bold">
          Employee MS
        </h3>
      </div>

      {/* Menu */}
      <div className="px-4 py-4 space-y-2">

        {/* Dashboard */}
        <NavLink
          to="/employee-dashboard"
          end
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-3 px-4 rounded hover:bg-teal-600 transition`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-3 px-4 rounded hover:bg-teal-600 transition`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        {/* Leaves */}
<NavLink
  to="/employee-dashboard/leaves"
  className={({ isActive }) =>
    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-3 px-4 rounded hover:bg-teal-600 transition`
  }
>
  <FaCalendarAlt />
  <span>Leaves</span>
</NavLink>

        {/* Salary */}
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-3 px-4 rounded hover:bg-teal-600 transition`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500" : ""
            } flex items-center space-x-4 py-3 px-4 rounded hover:bg-teal-600 transition`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;