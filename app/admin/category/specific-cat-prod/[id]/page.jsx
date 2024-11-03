import SpecificCatProdsTable from "@/app/admin/components/SpecificCatProdsTable";
import prisma from "@/lib/prisma";

export async function generateMetadata({ params: { id } }) {
  return {
    title: `Specific Category Products: ${id} | Pandey Industries`,
  };
}

const SpecificCatProduct = async ({ params }) => {
  const category = await prisma.productCategory.findUnique({
    where: { id: params.id },
  });
  const products = await prisma.products.findMany({
    where: { categoryId: category.id },
  });
  return (
    <>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl my-4 mb-6">
        &apos;{category.name}&apos; Products
      </h1>
      <SpecificCatProdsTable prods={products} />
    </>
  );
};

export default SpecificCatProduct;
