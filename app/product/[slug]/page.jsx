/* eslint-disable react-hooks/exhaustive-deps */
"use server";

import Image from "next/image";

import SinngleProdClient from "@/Components/SinngleProdClient";
import prisma from "@/lib/prisma";
// import client from "@/app/db";



export async function generateMetadata({ params }) {
  const slug = params.slug.toString();
  
  // Fetch product data based on the slug
  const product = await prisma.products.findUnique({
    where: {
      slug: slug,
    },
  });

  // Return metadata if product is found
  if (product) {
    return {
      title: `${product.name} - Pandey Industries`,
      description: product.desc || 'Check out this amazing product on Pandey Industries.',
      openGraph: {
        title: `${product.name} - Pandey Industries`,
        description: product.desc || 'Explore this product on Pandey Industries.',
        url: `${process.env.WEBPAGE_URL}/product/${slug}`,
        images: [
          {
            url: product.image,
            alt: product.name,
          },
        ],
      },
    };
  }

  // Fallback metadata if product is not found
  return {
    title: 'Product Not Found - Coding Adda',
    description: 'The product you are looking for does not exist.',
    openGraph: {
      title: 'Product Not Found - Coding Adda',
      description: 'The product you are looking for does not exist.',
      url: `https://codding-adda.vercel.app/produc/${slug}`,
      images: [
        {
          url: '/images/product-not-found.png',
          alt: 'Product Not Found',
        },
      ],
    },
  };
}

const ProductSpecific = async ({ params }) => {
  const slug = params.slug.toString();
  
  const product = await prisma.products.findUnique({
    where: {
      slug: slug, // Replace with the actual slug
    },
  })


  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden dark:bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap flex-row">
            {/* <span className="relative"></span> */}
            <Image
              src={product.image}
              alt=""
              width={800}
              height={800}
              quality={100}
              className="lg:w-1/2 w-full h-64 lg:h-auto object-contain object-top rounded-md"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <p className="leading-relaxed dark:text-gray-400">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3 dark:text-gray-400">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                  <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none" />
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3 dark:text-gray-400">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <SinngleProdClient product={JSON.stringify(product)} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSpecific;
