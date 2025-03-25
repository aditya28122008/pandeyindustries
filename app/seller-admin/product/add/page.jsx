import prisma from "@/lib/prisma";
import SellerAddProductForm from "../../components/SellerAddProductForm";
// import AddCatForm from "../../components/AddCatForm";

export async function generateMetadata() {
  return {
    title: "Add Product | Pandey Industries",
  };
}

const SellerAddProduct = async () => {
  const categories = await prisma.productCategory.findMany();

  return (
    <>
      {/* <AddCatForm categories={categories} /> */}
      <SellerAddProductForm categories={categories} />
    </>
  );
};

export default SellerAddProduct;
