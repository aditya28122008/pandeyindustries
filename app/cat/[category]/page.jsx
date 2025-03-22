/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import ProductItem from "@/Components/ProductItem";
import prisma from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const category = await prisma.productCategory.findUnique({
    where: { url: params.category },
  });
  return {
    title: `${category.title} | Pandey Industries`,
    description: `${category.description}`,
    openGraph: {
      title: `${category.title} | Pandey Industries`,
      description: `${category.description}`,
      url: `${process.env.WEBPAGE_URL}/cat/${params.category}`,
      images: [
        {
          url: `${category.image}`,
          width: 800,
          height: 600,
          alt: "Banner",
        },
      ],
      site_name: "Pandey Industries",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.tagline} | Pandey Industries`,
      description: `${category.description}`,
      image: `${category.image}`,
    },
  };
}

const CategoryProds = async ({ params }) => {
  const category = await prisma.productCategory.findUnique({
    where: { url: params.category },
  });
  const prods = await prisma.products.findMany({
    where: { categoryId: category.id },
    orderBy: { disPrice: "asc" },
  });
  return (
    <section className="text-gray-600 body-font dark:bg-gray-900">
      <p className="text-center font-bold text-4xl md:text-6xl lg:text-8xl font-mono italic dark:text-white text-black my-12 -mb-4">
        {category.tagline}
      </p>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 space-y-2 space-x-4 justify-center px-4">
          {prods.map((prod) => {
            return (
              <ProductItem
                key={prod.id}
                image={`${prod.image}`}
                name={prod.name}
                category={category}
                OrPrice={prod.OrPrice}
                disPrice={prod.disPrice}
                slug={prod.slug}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryProds;
