import users from "@/lib/schemas/users";
import connectToDb from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || Object.keys(data).length === 0)
      return new NextResponse(JSON.stringify({ error: "No data provided" }), { status: 400 });

    await connectToDb();

    if (await users.findOne({ email: data.email })) {
      return new NextResponse(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const password = await hash(data.password, 12);

    await users.create({ ...data, password });

    return new NextResponse(null, { status: 201 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
