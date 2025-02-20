import mongoose, { Schema } from "mongoose";
import { IContact } from "./types/types";

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});
const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
