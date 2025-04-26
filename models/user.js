import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is needed"],
      default: "Guest",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Should just be true
    },
  },
  {
    timestamps: true,
  }
);

const userModel = models.userModel || model("userModel", userSchema);

export default userModel;
