import mongoose from "mongoose";
import SimpleCrypto from "simple-crypto-js";

export interface ICard {
  _id: mongoose.Types.ObjectId;
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

cardSchema.post("find", (docs: ICard[]) => {
  const simpleCrypto = new SimpleCrypto(process.env.SECRET_KEY!);
  docs.forEach((doc) => {
    doc.cvv = String(simpleCrypto.decrypt(doc.cvv));
    doc.cardNumber = String(simpleCrypto.decrypt(doc.cardNumber));
  });
});

const Card = mongoose.models?.Card || mongoose.model("Card", cardSchema);

export default Card;
