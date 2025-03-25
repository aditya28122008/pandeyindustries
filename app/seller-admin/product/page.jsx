import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import SellerAllProductsTable from "../components/SellerAllProductsTable";

export async function generateMetadata() {
  return {
    title: "All Products | Pandey Industries",
  };
}

const SellerProducts = async () => {
  const session = await auth();
  const shop = await prisma.shop.findUnique({
    where: { userId: session.user.id },
  });
  const prods = await prisma.products.findMany({
    where: { shopId: shop.id },
  });
  let allProds = [];
  for (let index = 0; index < prods.length; index++) {
    const product = prods[index];
    const pCat = await prisma.productCategory.findUnique({
      where: { id: product.categoryId },
    });
    const pShop = await prisma.shop.findUnique({
      where: { id: product.shopId },
    });
    console.log(pShop.name);
    
    allProds.push({ product: product, category: pCat.name, shop: pShop.name });
  }
  return (
    <>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl my-4 mb-6">
        All Products
      </h1>
      <SellerAllProductsTable allProds={allProds} />
    </>
  );
};

export default SellerProducts;
