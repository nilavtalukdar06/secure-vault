import { NextResponse } from "next/server";
import connect from "@/utils/db/mongodb";
import cardModel from "@/models/card";

export async function POST(request) {
  try {
    await connect();
    const { email, cardNumber, expiryDate, cvv } = await request.json();
    if (!email || !cardNumber || !expiryDate || !cvv) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    await cardModel.create({
      createdBy: email.trim(),
      cardNumber: cardNumber,
      expiryDate: expiryDate.trim(),
      cvv: cvv,
    });
    return NextResponse.json(
      {
        message: "card data inserted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `internal server error, error: ${error}`,
      },
      { status: 500 }
    );
  }
}
