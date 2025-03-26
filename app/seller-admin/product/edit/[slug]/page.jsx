// import EditProductForm from "@/app/seller-admin/components/EditProductForm";
import SellerEditProductForm from "@/app/seller-admin/components/SellerEditProductForm";
import prisma from "@/lib/prisma";
import React from "react";

const SellerEditProduct = async ({ params }) => {
  const product = await prisma.products.findUnique({
    where: { slug: params.slug },
  });
  
  const categories = await prisma.productCategory.findMany();
  product.pincodes = product.pincodes.join(", ");
  return (
    <div>
      <SellerEditProductForm categories={categories} product={product} />
    </div>
  );
};

export default SellerEditProduct;
