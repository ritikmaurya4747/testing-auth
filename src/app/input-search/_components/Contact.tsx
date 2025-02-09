"use client"
import { useState } from "react";
import TableContact from "./TableContact";


const Contacts = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    return (
        <div className="p-4 bg-gray-200">
            <div className="flex justify-between items-center mb-4 shadow-md rounded-md py-7 px-4 bg-white">
                <h1 className="text-3xl pl-3 font-bold">Contacts</h1>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search Contact"
                        className="text-gray-700 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Contact
                    </button>
                </div>
            </div>
            <TableContact searchTerm={searchTerm} />
        </div>
    );
};

export default Contacts;