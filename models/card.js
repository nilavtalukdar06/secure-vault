import { Schema, models, model } from "mongoose";

const cardSchema = new Schema(
  {
    cardNumber: {
      type: Number,
      required: [true, "Card Number is required"],
    },
    expiryDate: {
      type: String,
      required: [true, "Expiry Date is required"],
    },
    cvv: {
      type: String,
      required: [true, "CVV is required"],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const cardModel = models.cardModel || model("cardModel", cardSchema);

export default cardModel;
