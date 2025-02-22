import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useContactsMutations = () => {
  const queryClient = useQueryClient();

  // Add Contact
  const addContact = useMutation({
    mutationFn: async (contact: { name: string; email: string }) => {
      const response = await axiosInstance.post("/contacts", contact);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("User successfully created!");
    },
  });

  // Update Contact
  const updateContact = useMutation({
    mutationFn: async (contact: {
      id: string;
      name: string;
      email: string;
    }) => {
      const response = await axiosInstance.put("/contacts", contact);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("User updated successfully!");
    },
  });

  // Delete Contact
  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/contacts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("User deleted successfully!");
    },
  });
  

  return {
    addContact: addContact.mutate,
    updateContact: updateContact.mutate,
    deleteContact: deleteContact.mutate,
  };
};
