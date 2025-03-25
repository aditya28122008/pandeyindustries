import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import vars from "@/vars";
import cloudinary from "@/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const session = await auth();
  if (session) {
    const product = await prisma.products.findUnique({
      where: { id: params.id },
    });
    const shop = await prisma.shop.findUnique({
      where: { id: product.shopId },
    });
    const shopSeller = await prisma.user.findUnique({
      where: { id: shop.userId },
    });
    if (
      session.user.email === vars.ADMINEMAIL ||
      session.user.email === shopSeller.email
    ) {
      await cloudinary.uploader.destroy(product.imagePubId);
      await prisma.products.delete({ where: { id: product.id } });
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
