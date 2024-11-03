import prisma from "@/lib/prisma";
import AddProductForm from "../../components/AddProductForm";
// import AddCatForm from "../../components/AddCatForm";

export async function generateMetadata() {
  return {
    title: "Add Product | Pandey Industries",
  };
}

const AddProduct = async () => {
  const categories = await prisma.productCategory.findMany();

  return (
    <>
      {/* <AddCatForm categories={categories} /> */}
      <AddProductForm categories={categories} />
    </>
  );
};

export default AddProduct;
