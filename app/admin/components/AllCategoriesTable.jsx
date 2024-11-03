"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";

const AllCategoriesTable = ({ categories }) => {
  const [cats, setCats] = useState(categories);
  const enableNav = async (id) => {
    const res = await fetch(`/api/admin/category/enable-nav/${id}`);
    const json = await res.json();
    if (json.success) {
      setCats((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, navView: true } : item
        )
      );
      toast.success("Enabled Successfully...!");
    }
  };

  const disableNav = async (id) => {
    const res = await fetch(`/api/admin/category/disable-nav/${id}`);
    const json = await res.json();
    if (json.success) {
      setCats((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, navView: false } : item
        )
      );
      toast.success("Disabled Successfully...!");
    }
  };
  const deleteCategory = async (id) => {
    if(confirm("Are you sure you wanna delete this category?")){
      try {
        const res = await fetch(`/api/admin/category/delete/${id}`, {method: "GET"})
        const json = await res.json();
        if(json.success){
          const newCatArr = cats.filter((cat)=>{
            return cat.id !== id
          })
          setCats(newCatArr)
          toast.success("Category Deleted Successfully...")
        } else if(json.mess === "prodExists"){
          toast.warning("Some products in this category still exists. First delete them to delete this category.")
        }
      } catch (error) {
        console.log(error);
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
                Category Name
              </th>
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
                IsNavVisible
              </th>
              <th scope="col" className="px-6 py-3">
                Enable/Disable Nav
              </th>
              <th scope="col" className="px-6 py-3">
                View Products
              </th>
              <th scope="col" className="px-6 py-3">
                Delete Category
              </th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cate) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {cate.name}
                    </th>
                    <td className="px-6 py-4">{cate.title.slice(0, 15)}...</td>
                    <td className="px-6 py-4">
                      {cate.description.slice(0, 15)}...
                    </td>

                    <td className="px-6 py-4">
                      <Image
                        alt=""
                        src={cate.image}
                        height={40}
                        width={40}
                        className="rounded-md"
                        quality={100}
                      />
                    </td>
                    <td className="px-6 py-4">
                      {cate.navView ? (
                        <>
                          <FaCheckCircle className="text-2xl text-green-600 text-center bg-white rounded-full" />
                        </>
                      ) : (
                        <>
                          <IoIosCloseCircle className="text-2xl text-red-600 text-center bg-white rounded-full" />
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {cate.navView ? (
                        <>
                          <button
                            onClick={() => disableNav(cate.id)}
                            className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-800 dark:hover:bg-red-700"
                          >
                            Disable Nav
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => enableNav(cate.id)}
                            className="px-2 py-1 text-white bg-green-600 rounded-md hover:bg-green-800 dark:hover:bg-green-700"
                          >
                            Enable Nav
                          </button>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/category/specific-cat-prod/${cate.id}`}
                      >
                        <FaArrowCircleRight className="text-3xl cursor-pointer text-green-600 hover:text-green-400 bg-white rounded-full" />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <>
                        <button
                          onClick={() => deleteCategory(cate.id)}
                          className="px-2 py-1 text-white bg-red-600 rounded-md hover:bg-red-800 dark:hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
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

export default AllCategoriesTable;
