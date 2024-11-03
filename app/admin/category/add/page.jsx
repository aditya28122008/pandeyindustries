import vars from "@/vars";
import AddCatForm from "../../components/AddCatForm";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: "Add Category | Pandey Industries",
  };
}

const AddCategory = () => {
  const addCategorySubmitAction = async (e) => {
    "use server";
    const session = await auth();
    if (session) {
      const uploadFile = async () => {
        const fileFormData = new FormData();
        const file = e.get("image");
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
      const dbFileName = await uploadFile();
      await prisma.productCategory.create({
        data: {
          name: e.get("name"),
          title: e.get("title"),
          description: e.get("description"),
          imagePubID: dbFileName.public_id,
          image: dbFileName.secure_url,
          url: e.get("name").toLowerCase(),
          tagline: e.get("tagline"),
        },
      });
      // console.log(addCat);
      return { success: true };
    } else {
      return { success: false };
    }
  };
  return (
    <>
      <AddCatForm addCategorySubmitAction={addCategorySubmitAction} />
    </>
  );
};

export default AddCategory;
