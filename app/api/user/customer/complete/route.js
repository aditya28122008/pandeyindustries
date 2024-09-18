import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request){
    const user = await auth();
    console.log(user);
    return NextResponse.json({success: true, user: user})
}