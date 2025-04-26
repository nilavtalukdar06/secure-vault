import { NextResponse } from "next/server";
import connect from "@/utils/db/mongodb";
import userModel from "@/models/user";

export async function POST(request) {
  try {
    await connect();
    const { name, email } = await request.json();
    if (!name || !email) {
      throw new Error("missing fields");
    }
    const result = await userModel.findOne({
      email: email.trim(),
    });
    if (result) {
      return NextResponse.json(
        {
          message: "user already exists",
        },
        { status: 200 }
      );
    }
    await userModel.create({
      name: name.trim(),
      email: email.trim(),
    });
    return NextResponse.json(
      {
        message: "user created successfully",
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
