"use client";
import Loader from "@/common/components/Loader";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContactsMutations } from "../_hooks/useContactsMutations";
import useContactTableQuery from "../_hooks/useContactTableQuery";
import { Contact, TableContactProps } from "../_types/types";
import ContactModal from "./ContactModal";

const TableContact = ({ searchTerm }: TableContactProps) => {
  // data fetching from tanstack query
  const { data: contactData, isLoading, error } = useContactTableQuery();
  const { addContact, deleteContact, updateContact } = useContactsMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  if (isLoading) return <Loader />;
  if (error) return "Something went wrong";

  // Search Filter Based on Name and Email.
  const filteredContacts = contactData?.filter(
    (contact: Contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="shadow-md rounded-md px-7 bg-white h-auto">
        <div className="flex items-center justify-center py-5">
          <button
            onClick={() => {
              setModalType("add");
              setSelectedContact(null);
              setIsModalOpen(true);
            }}
            className="text-white text-2xl bg-blue-500 px-12 py-3 rounded-md"
          >
            {/* <FaPlus /> */}Add Contact
          </button>
        </div>
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
                    <button
                      className="text-red-500 hover:text-gray-600"
                      onClick={() => {
                        deleteContact(contact._id);
                      }}
                    >
                      <FaTrash size={18} />
                    </button>

                    <button
                      className="text-blue-500 hover:text-gray-600"
                      onClick={() => {
                        setModalType("edit");
                        setSelectedContact(contact);
                        setIsModalOpen(true);
                        updateContact({
                          id: contact._id,
                          name: contact.name,
                          email: contact.email, 
                        });
                      }}
                    >
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
      <ContactModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalType={modalType}
        selectedContact={selectedContact}
        addContact={addContact}
        updateContact={updateContact}
      />
    </>
  );
};

export default TableContact;
