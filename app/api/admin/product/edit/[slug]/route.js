import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import vars from "@/vars";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const session = await auth();
  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (user.category === "SELLER") {
      const shop = await prisma.shop.findFirst({
        where: {
          userId: session.user.id,
        },
      });
      const product = await prisma.products.findUnique({
        where: { slug: params.slug },
      });
      if(product.shopId === shop.id){
        
      }
    } else {
        return NextResponse.json({success: false}, {status: 401});
    }
  }
}
