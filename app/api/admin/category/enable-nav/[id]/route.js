import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import vars from "@/vars";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const session = await auth();
  if (session.user.email === `${vars.ADMINEMAIL}`) {
    const categories = await prisma.productCategory.findMany({
      where: { navView: true },
    });
    if (categories.length < process.env.NAVVIEWLIMIT) {
      const category = await prisma.productCategory.update({
        where: { id: params.id },
        data: { navView: true },
      });
      return NextResponse.json(
        { category: category, success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Nav view limit exceeded" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}
