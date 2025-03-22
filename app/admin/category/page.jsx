"use server";
// export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import AllCategoriesTable from "../components/AllCategoriesTable";

export async function generateMetadata() {
  return {
    title: "All Categories | Pandey Industries",
  }
}

const AllCategories = async () => {
  const categories = await prisma.productCategory.findMany();
  return (
    <>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl my-4 mb-6">
        All Categories
      </h1>
      <AllCategoriesTable categories={categories} />
    </>
  );
};

export default AllCategories;
