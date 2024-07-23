import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("image");
  // const arrBuffer = await file.arrayBuffer();
  // const fileBites = Buffer.from(arrBuffer);
  // const fileName = `/media/products/${Date.now().toString()}_${file.name
  //   .replace(" ", "_")
  //   .toString()}`;
  // await fs.writeFile(`./public${fileName}`, fileBites, (err) => {
  //   console.log(err);
  // });

  // try {
  //   const upLoad = await cloudinary.upload(`./public${fileName}`);
  //   // console.log(upLoad.secure_url);
  //   dbFilename = upLoad.secure_url
  //   await fs.unlink(`./public${fileName}`, (err) => console.log(err));
  // } catch (error) {
  //   console.log(error);
  // }
  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // Trim leading/trailing white spaces
    str = str.toLowerCase(); // Convert to lowercase
    str = str.replace(/[^\w\s-]/g, ""); // Remove non-word characters (except spaces and hyphens)
    str = str.replace(/[\s_-]+/g, "-"); // Replace spaces and underscores with a single hyphen
    return str;
  }
  const uploadFile = async () => {
    const fileFormData = new FormData();
    fileFormData.set("file", file);
    fileFormData.set("api_key", "742754732423212");
    fileFormData.set("upload_preset", "pandeyIndustries");
    const upload = await fetch(
      `https://api.cloudinary.com/v1_1/dqvuoldfp/image/upload`,
      {
        method: "POST",
        body: fileFormData,
      }
    );
    const json = await upload.json();
    return json.secure_url;
  };
  const fileName = await uploadFile();
  const prod = {
    name: data.get("name"),
    category: data.get("category"),
    price: parseInt(data.get("price")),
    desc: data.get("desc"),
    pincodes: data.get("pincodes").split(","),
    image: fileName,
    slug: slugify(`${data.get("name")}-${Date.now()}`),
    brand: data.get("brand").toUpperCase(),
  };
  // const addProd = await collection.insertOne(prod)
  // const addProd = await Products.create(prod);
  const addProd = await prisma.products.create({data: prod});
  // await client.close()
  return NextResponse.json(
    { success: true, addProd: addProd },
    { status: 201 }
  );
}
