import mongoose from "mongoose";

export interface ICard {
  id?: mongoose.Types.ObjectId;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const cardSchema = new mongoose.Schema<ICard>(
  {
    cardNumber: {
      type: String,
      required: [true, "card number is required"],
    },
    cvv: {
      type: String,
      required: [true, "cvv is required"],
    },
    expiryDate: {
      type: String,
      required: [true, "expiry date is required"],
      match: [/^(0[1-9]|1[0-2])\/\d{2}$/, "enter a valid expiry date"],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.models?.Card || mongoose.model("Card", cardSchema);

export default Card;
