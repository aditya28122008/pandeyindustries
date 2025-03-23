import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await auth();
  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (user.category === "SELLER") {
      await prisma.user.update({
        where: { id: user.id },
        data: { category: "CONSUMER" },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { category: "SELLER" },
      });
    }
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.redirect("/auth/login");
  }
}
