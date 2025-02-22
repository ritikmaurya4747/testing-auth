"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact"; // Ensure you have a Contact model

// Fetch Contacts
export async function getContactData() {
  await connectToDatabase();
  const contacts = await Contact.find({});
  return JSON.parse(JSON.stringify(contacts));
}
