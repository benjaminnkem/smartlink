import users from "@/lib/schemas/users";
import connectToDb from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    await connectToDb();
    const user = await users.findOne({ _id: new ObjectId(params.id) });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    await users.updateOne({ _id: new ObjectId(params.id) }, { $set: { link: data.link, ceeLink: data.ceeLink } });

    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
