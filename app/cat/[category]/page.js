/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import client from "@/app/db";
import ProductItem from "@/Components/ProductItem";
import prisma from "@/lib/prisma";
// import { MongoClient } from "mongodb";

export async function generateMetadata({ params }) {
  return {
    title: "Latest Gadgets and Electronics | Pandey Industries",
    description:
      "Discover the newest gadgets and electronics. Shop cutting-edge tech products, from smart devices to innovative accessories, all in one place.",
    keywords: "gadgets, electronics, smart devices, tech products, accessories",
    openGraph: {
      title: "Latest Gadgets and Electronics | Pandey Industries",
      description:
        "Discover the newest gadgets and electronics. Shop cutting-edge tech products, from smart devices to innovative accessories, all in one place.",
      url: `${process.env.WEBPAGE_URL}/cat/gadgets`,
      images: [
        {
          url: "https://pandeyindustries.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdqvuoldfp%2Fimage%2Fupload%2Fv1723276102%2FPandeyIndustries%2Fwaul0lg2ureakqine1cx.jpg&w=640&q=100",
          width: 800,
          height: 600,
          alt: "Gadgets Banner",
        },
      ],
      site_name: "Pandey Industries",
    },
    twitter: {
      card: "summary_large_image",
      title: "Latest Gadgets and Electronics | Your Store Name",
      description:
        "Discover the newest gadgets and electronics. Shop cutting-edge tech products, from smart devices to innovative accessories, all in one place.",
      image:
        "https://pandeyindustries.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdqvuoldfp%2Fimage%2Fupload%2Fv1723276102%2FPandeyIndustries%2Fwaul0lg2ureakqine1cx.jpg&w=640&q=100",
    },
  };
}

const CategoryProds = async ({ params }) => {
  const category = params.category;
  const prods = await prisma.products.findMany({
    where: { category: category },
    orderBy: {price: 'asc'}
  });
  return (
    <section className="text-gray-600 body-font dark:bg-gray-900">
      <p className="text-center font-bold text-4xl md:text-6xl lg:text-8xl font-mono italic dark:text-white text-black my-12 -mb-4">
        {category === "fashion"
          ? "Latest Fashion Eve..."
          : "It Must Be Handy..."}
      </p>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 space-y-2 space-x-4 justify-center px-4">
          {prods.map((prod) => {
            return (
              <ProductItem
                key={prod.id}
                image={`${prod.image}`}
                name={prod.name}
                category={prod.category}
                price={prod.price}
                slug={prod.slug}
              />
            );
          })}
        </div>
      </div>
    </section>
    // <></>
  );
};

export default CategoryProds;
