import { NextResponse } from "next/server";
import connect from "@/utils/db/mongodb";
import passwordModel from "@/models/password";

export async function POST(request) {
  try {
    await connect();
    const { email, website, username, password } = await request.json();
    if (!email || !website || !username || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    await passwordModel.create({
      createdBy: email.trim(),
      website: website.trim(),
      username: username.trim(),
      password: password.trim(),
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
