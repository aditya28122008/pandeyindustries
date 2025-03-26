import { auth } from "@/auth";
import cloudinary from "@/cloudinary";
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
      let fileName = {secure_url: product.image, public_id: product.imagePubId};
      if (product.shopId === shop.id) {
        const reqFromData = await request.formData();        
        if(reqFromData.get("image")){
          await cloudinary.uploader.destroy(product.imagePubId);
          const uploadFile = async () => {
            const fileFormData = new FormData();
            fileFormData.set("file", reqFromData.get("image"));
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

          fileName = await uploadFile();
        }

        // const category = await prisma.productCategory.findUnique({
        //   where: { id: reqFromData.get("category") },
        // });

        // console.log(reqFromData.get("category"));
        

        await prisma.products.update({
          where: { slug: params.slug },
          data: {
            name: reqFromData.get("name"),
            OrPrice: parseInt(reqFromData.get("OrPrice")),
            desc: reqFromData.get("desc"),
            pincodes: reqFromData.get("pincodes").split(","),
            image: fileName.secure_url,
            imagePubId: fileName.public_id,
            brand: reqFromData.get("brand").toUpperCase(),
            disPrice: reqFromData.get("disPrice"),
            category: { connect: {id: reqFromData.get("category")}}
          },
        });
        return NextResponse.json({ success: true }, { status: 200 });
      } else {
        return NextResponse.json({ success: false }, { status: 401 });
      }
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  }
}
