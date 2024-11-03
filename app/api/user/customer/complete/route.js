import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request){
    const user = await auth();
    return NextResponse.json({success: true, user: user})
}