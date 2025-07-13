import mongoose from "mongoose";

export interface IPassword {
  id?: mongoose.Types.ObjectId;
  websiteUrl: string;
  email: string;
  password: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const passwordSchema = new mongoose.Schema(
  {
    websiteUrl: {
      type: String,
      required: [true, "website url is required"],
      match: [
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([\/\w.-]*)*\/?$/,
        "enter a valid website url",
      ],
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
  mongoose.models?.Password || mongoose.model("Password", passwordSchema);

export default Password;
