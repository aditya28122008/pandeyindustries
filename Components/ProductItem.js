import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductItem = (props) => {
  return (
    <Link
      prefetch
      href={`/product/${props.slug}`}
      className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md dark:shadow-none dark:bg-gray-800 rounded-md"
    >
      <div className="block relative h-48 rounded overflow-hidden">
        <Image
          width={400}
          height={200}
          quality={100}
          alt="ecommerce"
          className="object-contain w-full h-full block"
          src={`${props.image}`}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 dark:text-gray-400 text-xs tracking-widest title-font mb-1">
          {`${props.category.slice(0, 1).toUpperCase()}${props.category.slice(
            1
          )}`}
        </h3>
        <h2 className="text-gray-900 dark:text-gray-100 title-font text-lg font-medium">
          {props.name}
        </h2>
        <p className="mt-1 dark:text-green-400 text-lg text-green-600 ">₹{props.disPrice} <span className="line-through text-sm text-red-600 dark:text-red-400">₹{props.OrPrice}</span></p>
      </div>
    </Link>
  );
};

export default ProductItem;
