import { Schema, models, model } from "mongoose";

const passwordSchema = new Schema(
  {
    website: {
      type: String,
      required: [true, "Website URL is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Fixed typo here
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const passwordModel =
  models.passwordModel || model("passwordModel", passwordSchema);

export default passwordModel;
