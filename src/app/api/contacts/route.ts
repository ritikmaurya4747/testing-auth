import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

// Fetch  contacts
export async function GET() {
  await connectToDatabase();
  const contacts = await Contact.find();
  return NextResponse.json(contacts);
}

// Add contact 
export async function POST(req: Request) {
  await connectToDatabase();
  const { name, email } = await req.json();
  const newContact = new Contact({ name, email });
  await newContact.save();
  return NextResponse.json({ message: "Contact Created", contact: newContact });
}

// Update contact
export async function PUT(req: Request) {
  await connectToDatabase();
  const { id, name, email } = await req.json();

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email },
    { new: true } // Yeh ensure karega ki updated contact return ho
  );

  if (!updatedContact) {
    return NextResponse.json({ message: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Contact updated successfully",
    contact: updatedContact,
  });
}


