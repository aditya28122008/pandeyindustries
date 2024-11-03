import prisma from "@/lib/prisma";
import AllProductsTable from "../components/AllProductsTable";

export async function generateMetadata() {
  return {
    title: "All Products | Pandey Industries",
  };
}

const Products = async () => {
  const prods = await prisma.products.findMany();
  let allProds = [];
  for (let index = 0; index < prods.length; index++) {
    const product = prods[index];
    const pCat = await prisma.productCategory.findUnique({
      where: { id: product.categoryId },
    });
    allProds.push({ product: product, category: pCat.name });
  }
  return (
    <>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl my-4 mb-6">
        All Products
      </h1>
      <AllProductsTable allProds={allProds} />
    </>
  );
};

export default Products;
