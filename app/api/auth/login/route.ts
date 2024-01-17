import users from "@/lib/schemas/users";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import connectToDb from "@/lib/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectToDb();

    const userWithEmail = await users.findOne({ email: body.email });

    if (!userWithEmail) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 401 });
    }

    if (!(await compare(body.password, userWithEmail.password))) {
      return new NextResponse(JSON.stringify({ error: "Wrong password" }), { status: 401 });
    }

    return NextResponse.json(userWithEmail);
  } catch {
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
