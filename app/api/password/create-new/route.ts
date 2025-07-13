import connectToMongodb from "@/db/mongodb";
import Password from "@/models/password.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import SimpleCrypto from "simple-crypto-js";

const dataSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(1, { message: "password is too short" }),
  websiteUrl: z
    .string()
    .min(1)
    .regex(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([\/\w.-]*)*\/?$/,
      { message: "website url is not valid" }
    ),
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
    if (!data.email || !data.websiteUrl || !data.password) {
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
    const encryptedPassword = simpleCrypto.encrypt(data.password);
    await connectToMongodb();
    const result = await Password.create({
      ...data,
      password: encryptedPassword,
      createdBy: userId,
    });
    return NextResponse.json(
      {
        message: "password created successfully",
        password: result,
      },
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
