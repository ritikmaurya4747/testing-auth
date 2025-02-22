"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "@/common/components/Loader";
import useContactTableQuery from "../_hooks/useContactTableQuery";
import { Contact, TableContactProps } from "../_types/types";

const TableContact = ({ searchTerm }: TableContactProps) => {

  // data fetching from tanstack query
  const { data: contactData, isLoading, error } = useContactTableQuery();
  
  if (isLoading) return <Loader />;
  if (error) return "Something went wrong";

  // Search Filter Based on Name and Email.
  const filteredContacts = contactData?.filter(
    (contact: Contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="shadow-md rounded-md py-10 px-7 bg-white h-auto">
      <table className="min-w-full">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-4 px-4 text-left rounded-tl-lg rounded-bl-lg">
              <input type="checkbox" className="w-5 h-5 rounded-md" />
            </th>
            <th className="py-4 px-4 text-left">Name</th>
            <th className="py-4 px-4 text-left">Email</th>
            <th className="py-4 px-4 text-left rounded-tr-lg rounded-br-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact: Contact, index: number) => (
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
