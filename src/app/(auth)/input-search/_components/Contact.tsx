"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import TableContact from "./TableContact";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4 bg-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 shadow-md rounded-md py-7 px-4 bg-white">
        <h1 className="text-3xl pl-3 font-bold">Contacts</h1>
        <div className="flex space-x-4">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Contact"
            className="text-gray-700 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Add Contact Button */}
          <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">
            Dashboard
          </Link>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Contact
          </button>

          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Table Component */}
      <TableContact searchTerm={searchTerm} />
    </div>
  );
};

export default Contacts;
