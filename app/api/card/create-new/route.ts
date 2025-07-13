import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import SimpleCrypto from "simple-crypto-js";
import connectToMongodb from "@/db/mongodb";
import Card from "@/models/card.model";

const dataSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: "card number is too short" })
    .regex(/^(?:\d[ -]*?){13,19}$/, { message: "card number is not valid" }),
  cvv: z
    .string()
    .min(1, { message: "cvv is too short" })
    .regex(/^\d{3,4}$/, { message: "cvv type is invalid" }),
  expiryDate: z
    .string()
    .min(1, { message: "expiry date is too short" })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "expiry date is invalid" }),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const data = await request.json();
    if (!data.cardNumber || !data.cvv || !data.expiryDate) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }
    const parsedData = dataSchema.safeParse(data);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      );
    }
    const simpleCrypto = new SimpleCrypto(process.env.SECRET_KEY!);
    const encryptedCvv = simpleCrypto.encrypt(data.cvv);
    const encryptedCardNumber = simpleCrypto.encrypt(data.cardNumber);
    await connectToMongodb();
    await Card.create({
      cardNumber: encryptedCardNumber,
      cvv: encryptedCvv,
      expiryDate: data.expiryDate,
      createdBy: userId,
    });
    return NextResponse.json(
      { message: "card is created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
