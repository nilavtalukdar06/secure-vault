import mongoose from "mongoose";

export interface IPassword {
  id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const passwordSchema = new mongoose.Schema<IPassword>(
  {
    name: {
      type: String,
      required: [true, "website url is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Password =
  mongoose.models?.Password ||
  mongoose.model<IPassword>("Password", passwordSchema);

export default Password;
