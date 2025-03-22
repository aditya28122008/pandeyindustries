import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const session = await auth();
  const add = await prisma.address.findUnique({ where: { id: params.id } });
  if (add.customerId === session.user.id) {
    await prisma.address.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
