import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import vars from "@/vars";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth();
  if (session) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    const shop = await prisma.shop.findFirst({
      where: { userId: user.id },
    });
    const data = await request.formData();

    const file = data.get("image");
    function slugify(str) {
      str = str.replace(/^\s+|\s+$/g, "");
      str = str.toLowerCase();
      str = str.replace(/[^\w\s-]/g, "");
      str = str.replace(/[\s_-]+/g, "-");
      return str;
    }
    const uploadFile = async () => {
      const fileFormData = new FormData();
      fileFormData.set("file", file);
      fileFormData.set("api_key", "742754732423212");
      fileFormData.set("upload_preset", `${vars.upload_preset}`);
      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${vars.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: fileFormData,
        }
      );
      const json = await upload.json();
      return json;
    };
    const fileName = await uploadFile();
    const addProd = await prisma.products.create({
      data: {
        name: data.get("name"),
        OrPrice: parseInt(data.get("orprice")),
        desc: data.get("desc"),
        pincodes: data.get("pincodes").split(","),
        image: fileName.secure_ur,
        imagePubId: fileName.public_id,
        slug: slugify(`${data.get("name")}-${Date.now()}`),
        brand: data.get("brand").toUpperCase(),
        disPrice: data.get("disprice"),
        category: {
          connect: { id: data.get("category") },
        },
        shop: {
          connect: { id: shop.id },
        },
      },
    });
    // await client.close()
    return NextResponse.json(
      { success: true, addProd: addProd },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
