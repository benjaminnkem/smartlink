import users from "@/lib/schemas/users";
import connectToDb from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/types/user";

export async function GET(req: NextRequest, { params }: { params: { link: string } }) {
  try {
    await connectToDb();
    console.log(params);
    const user = await users.findOne<User>({ ceeLink: params.link });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new NextResponse(user.link);
  } catch (e) {
    console.log(e);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
