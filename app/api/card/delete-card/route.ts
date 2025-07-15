import connectToMongodb from "@/db/mongodb";
import Card from "@/models/card.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 5,
      capacity: 20,
    }),
  ],
});

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const decision = await aj.protect(request, { userId, requested: 5 });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }
    const documentId = request.nextUrl.searchParams.get("documentId");
    if (!documentId) {
      return NextResponse.json(
        { error: "document id is not present" },
        { status: 400 }
      );
    }
    await connectToMongodb();
    await Card.findByIdAndDelete(documentId);
    return NextResponse.json(
      { message: "card details deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
