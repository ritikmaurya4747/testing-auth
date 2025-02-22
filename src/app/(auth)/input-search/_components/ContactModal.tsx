import React, { useEffect, useState } from "react";
import { Contact } from "../_types/types";

interface ContactModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  modalType: "add" | "edit";
  selectedContact: Contact | null;
  addContact: (contact: { name: string; email: string }) => void;
  updateContact: (contact: { id: string; name: string; email: string }) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  modalType,
  selectedContact,
  addContact,
  updateContact,
}) => {
  const [name, setName] = useState(selectedContact?.name || "");
  const [email, setEmail] = useState(selectedContact?.email || "");

  // 🛠 Yeh ensure karega ki jab selectedContact update ho, tab name aur email bhi update ho
  useEffect(() => {
    if (modalType === "edit" && selectedContact) {
      setName(selectedContact.name);
      setEmail(selectedContact.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [selectedContact, modalType]);

  if (!isModalOpen) return null; // Modal tabhi dikhe jab open ho

  const handleSubmit = () => {
    if (modalType === "add") {
      addContact({ name, email });
    } else if (modalType === "edit" && selectedContact) {
      updateContact({ id: selectedContact._id, name, email });
    }
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {modalType === "add" ? "Add User" : "Edit User"}
        </h2>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            {modalType === "add" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
