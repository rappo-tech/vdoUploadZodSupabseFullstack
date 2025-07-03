// app/api/createUser/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { userSchema } from "../../../../lib/zodSchemas/userSchema";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { userName, age, role } = result.data;

    const user = await prisma.allUsers.create({
      data: {
        userName,
        age,
        role,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
