import mongoose, { Schema, Document } from "mongoose";
import { User } from "./types/types";



const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;