import { NextResponse } from "next/server";
import connect from "@/utils/db/mongodb";
import passwordModel from "@/models/password";

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
    const data = await passwordModel.find({ createdBy: email });
    return NextResponse.json(
      {
        passwords: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `internavl server error, error: ${error}`,
      },
      { status: 500 }
    );
  }
}
