"use client";

import { signOut } from "next-auth/react";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <FaHome /> <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <FaUser /> <span>Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
            <FaCog /> <span>Settings</span>
          </a>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-10 flex items-center space-x-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-full"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-5 bg-white shadow rounded-md">
            <h3 className="text-lg font-bold">Users</h3>
            <p className="text-2xl">1,024</p>
          </div>
          <div className="p-5 bg-white shadow rounded-md">
            <h3 className="text-lg font-bold">Orders</h3>
            <p className="text-2xl">512</p>
          </div>
          <div className="p-5 bg-white shadow rounded-md">
            <h3 className="text-lg font-bold">Revenue</h3>
            <p className="text-2xl">$10,240</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
