import passwordModel from "@/models/password";
import connect from "@/utils/db/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connect();
    const { passwordId } = await request.json();
    if (!passwordId) {
      return NextResponse.json(
        {
          message: "incomplete fields",
        },
        { status: 400 }
      );
    }
    await passwordModel.findOneAndDelete({ _id: passwordId });
    return NextResponse.json(
      {
        message: "password deleted successfully",
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
