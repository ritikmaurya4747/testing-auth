"use server";

import { revalidatePath } from "next/cache";
import Contact from "@/models/Contact"; // Ensure you have a Contact model
import { connectToDatabase } from "@/lib/mongodb";

// Fetch Contacts
export async function fetchContacts() {
    await connectToDatabase();
    const contacts = await Contact.find({});
    return JSON.parse(JSON.stringify(contacts));
}

// Create or Update Contact
export async function saveContact(formData: FormData) {
    await connectToDatabase();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (id) {
        // Update existing contact
        await Contact.findByIdAndUpdate(id, { name, email });
    } else {
        // Create new contact
        await Contact.create({ name, email });
    }

    revalidatePath("/contacts"); // Revalidate cache for UI updates
}

// Delete Contact
export async function deleteContact(id: string) {
    await connectToDatabase();
    await Contact.findByIdAndDelete(id);
    revalidatePath("/contacts");
}
