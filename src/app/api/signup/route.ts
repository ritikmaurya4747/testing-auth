import { connectToDatabase } from "@/app/lib/mongodb"; // Adjust the path
import UserModel from "@/app/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

// API to handle user signup
export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");
    // Get data from the request body
    const { firstName, lastName, email, password } = await req.json();
    const existingUser = await usersCollection.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}