import connectToMongodb from "@/db/mongodb";
import Password from "@/models/password.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import SimpleCrypto from "simple-crypto-js";
import arcjet, { tokenBucket } from "@arcjet/next";

const dataSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(1, { message: "password is too short" }),
  name: z.string().min(1, { message: "name is too short" }),
});

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

export async function POST(request: NextRequest) {
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
    const data = await request.json();
    if (!data.email || !data.name || !data.password) {
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
    await Password.create({
      ...data,
      password: encryptedPassword,
      createdBy: userId,
    });
    return NextResponse.json(
      { message: "password created successfully" },
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
