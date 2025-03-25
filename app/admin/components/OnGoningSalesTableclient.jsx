"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowCircleRight, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const OnGoningSalesTableclient = ({ sales }) => {
  const [allSales, setAllSales] = useState(sales);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                StartDate
              </th>
              <th scope="col" className="px-6 py-3">
                EndDate
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
              <th scope="col" className="px-6 py-3">
                Stop Immidieately
              </th>
            </tr>
          </thead>
          <tbody>
            {allSales.map((sale) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {sale.title}
                    </th>
                    <td className="px-6 py-4">
                      {sale.description.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4">
                      <Image
                        alt=""
                        src={sale.image}
                        height={80}
                        width={80}
                        className="rounded-md"
                        quality={100}
                      />
                    </td>
                    <td className="px-6 py-4">{sale.startDate}</td>
                    <td className="px-6 py-4">{sale.endDate}</td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-400 cursor-pointer hover:underline hover:underline-offset-4">
                      <Link prefetch href={`/product/${product.product.slug}`}>
                        <FaArrowCircleRight className="text-2xl cursor-pointer text-green-600 hover:text-green-400 bg-white rounded-full" />
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-blue-600 hover:text-blue-400 cursor-pointer hover:underline hover:underline-offset-4">
                      <button onClick={() => deleteProduct(product.product.id)}>
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

export default OnGoningSalesTableclient;
