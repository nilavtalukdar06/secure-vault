import { NextResponse } from "next/server";
import connect from "@/utils/db/mongodb";
import cardModel from "@/models/card";

export async function GET(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        {
          message: "incomplete fields",
        },
        { status: 400 }
      );
    }
    const data = await cardModel.find({ createdBy: email });
    return NextResponse.json(
      {
        cards: data,
      },
      { status: 200 }
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
