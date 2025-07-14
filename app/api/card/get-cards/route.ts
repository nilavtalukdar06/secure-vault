import connectToMongodb from "@/db/mongodb";
import Card from "@/models/card.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    await connectToMongodb();
    const result = await Card.find({ createdBy: userId });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
