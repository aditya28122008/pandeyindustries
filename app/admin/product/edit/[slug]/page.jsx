import EditProductForm from "@/app/admin/components/EditProductForm";
import prisma from "@/lib/prisma";
import React from "react";

const EditProduct = async ({ params }) => {
  const product = await prisma.products.findUnique({
    where: { slug: params.slug },
  });
  const categories = await prisma.productCategory.findMany();
  product.pincodes = product.pincodes.join(", ");
  product.OrPrice = parseInt(product.OrPrice);
  product.disPrice = parseInt(product.disPrice);
  return (
    <div>
      <EditProductForm categories={categories} product={product} />
    </div>
  );
};

export default EditProduct;
