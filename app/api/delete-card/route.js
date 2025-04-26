import cardModel from "@/models/card";
import connect from "@/utils/db/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connect();
    const { cardId } = await request.json();
    if (!cardId) {
      return NextResponse.json(
        {
          message: "incomplete fields",
        },
        { status: 400 }
      );
    }
    await cardModel.findOneAndDelete({ _id: cardId });
    return NextResponse.json(
      {
        message: "card deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `internal server error: ${error}`,
      },
      { status: 500 }
    );
  }
}
