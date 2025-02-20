import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET(){
    await connectToDatabase();
    const contacts = await Contact.find();
    return NextResponse.json(contacts);
}

export async function POST(req:Request){
    await connectToDatabase();
    const {name , email } = await req.json();
    const newContact = new Contact({name ,email});
    await newContact.save();
    return NextResponse.json({message:"Contact Created",contact:newContact});
}

export async function PUT(req:Request){
    await connectToDatabase();
    const {id, name , email} = await req.json();
    await Contact.findByIdAndDelete(id,{name,email});
    return NextResponse.json({message:"Contact updated successfully"});
}

export async function DELETE(req:Request){
    await connectToDatabase();
    const {id} = await req.json();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({message:"Contact deleted successfully"});
}


