"use client";

import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";

const SpecificCatProdsTable = ({ prods }) => {
  const [products, setProducts] = useState(prods);
  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this products?")) {
      try {
        const res = await fetch(`/api/admin/product/delete/${id}`, {
          method: "GET",
        });
        const json = await res.json();
        if (json.success) {
          const newProductsArr = products.filter((prod) => {
            return prod.id !== id;
          });
          setProducts(newProductsArr);
          toast.success("Product Deleted Successfully...");
        }
      } catch (error) {
        toast.error("Something Went wrong. Please try again later.")
      }
    }
  };

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
                View
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">
                      {product.desc.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4">{product.OrPrice}</td>
                    <td className="px-6 py-4">{product.disPrice}</td>
                    <td className="px-6 py-4">{product.brand}</td>

                    <td className="px-6 py-4">
                      <Image
                        alt=""
                        src={product.image}
                        height={80}
                        width={80}
                        className="rounded-md"
                        quality={100}
                      />
                    </td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-400 cursor-pointer hover:underline hover:underline-offset-4">
                      <Link prefetch href={`/product/${product.slug}`}>
                        View
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-400 cursor-pointer hover:underline hover:underline-offset-4">
                      <button onClick={() => deleteProduct(product.id)}>
                        <MdDelete className="text-3xl text-red-600 hover:text-red-400 cursor-pointer" />
                      </button>
                    </td>
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

export default SpecificCatProdsTable;
