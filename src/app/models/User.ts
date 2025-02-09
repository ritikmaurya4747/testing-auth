import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;