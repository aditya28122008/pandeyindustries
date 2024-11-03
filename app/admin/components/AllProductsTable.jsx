"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AllProductsTable = ({ allProds }) => {
  const [allProducts, setAllProducts] = useState(allProds);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                OrPrice
              </th>
              <th scope="col" className="px-6 py-3">
                DisPrice
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.product.name}
                    </th>
                    <td className="px-6 py-4">
                      {product.product.desc.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4">{product.product.OrPrice}</td>
                    <td className="px-6 py-4">{product.product.disPrice}</td>
                    <td className="px-6 py-4">{product.product.brand}</td>

                    <td className="px-6 py-4">
                      <Image
                        alt=""
                        src={product.product.image}
                        height={80}
                        width={80}
                        className="rounded-md"
                        quality={100}
                      />
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-400 cursor-pointer hover:underline hover:underline-offset-4"><Link prefetch href={`/product/${product.product.slug}`}>View</Link></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProductsTable;
