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
      type: Number,
      required: [true, "CVV is required"],
      validate: {
        validator: function (v) {
          return /^\d{3}$/.test(v.toString());
        },
        message: "CVV must be a 3-digit number",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
  },
  { timestamps: true }
);

const cardModel = models.cardModel || model("cardModel", cardSchema);

export default cardModel;
