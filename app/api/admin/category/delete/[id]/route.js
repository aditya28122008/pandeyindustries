import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import vars from "@/vars";
import cloudinary from "@/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const session = await auth();
  if (session.user.email === vars.ADMINEMAIL) {
    const category = await prisma.productCategory.findUnique({
      where: { id: params.id },
    });
    const relProds = await prisma.products.findMany({
      where: { categoryId: category.id },
    });
    if (relProds.length === 0) {
      await cloudinary.uploader.destroy(category.imagePubID);
      await prisma.productCategory.delete({ where: { id: category.id } });
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, mess: "prodExists" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
