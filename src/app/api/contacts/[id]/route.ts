import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  const { id } = params; // take id from URL

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    return NextResponse.json({ message: "Contact not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Contact deleted successfully" });
}
