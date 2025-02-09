import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { contacts as contactData, contacts } from "@/app/api/contact/route";
type TableContactProps = {
    searchTerm: string;
}

const TableContact = ({ searchTerm }: TableContactProps) => {
    // Search Filter Based on Name and Email.
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (
        <div className="shadow-md rounded-md py-10 px-7 bg-white h-96">
            <table className="min-w-full">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="py-4 px-4 text-left rounded-tl-lg rounded-bl-lg">
                            <input type="checkbox" className="w-5 h-5 rounded-md" />
                        </th>
                        <th className="py-4 px-4 text-left">Name</th>
                        <th className="py-4 px-4 text-left">Email</th>
                        <th className="py-4 px-4 text-left rounded-tr-lg rounded-br-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <input type="checkbox" className="w-5 h-5" />
                                </td>
                                <td className="py-3 px-4">{contact.name}</td>
                                <td className="py-3 px-4">{contact.email}</td>
                                <td className="py-3 px-4 flex gap-10">
                                    <button className="text-gray-600 hover:text-red-500">
                                        <FaTrash size={18} />
                                    </button>
                                    <button className="text-gray-600 hover:text-blue-500">
                                        <FaEdit size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="py-3 px-4 text-center text-gray-500">
                                No contacts found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableContact;