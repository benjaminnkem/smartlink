import users from "@/lib/schemas/users";
import connectToDb from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await connectToDb();
    const user = await users.findOne({ email: params.email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
