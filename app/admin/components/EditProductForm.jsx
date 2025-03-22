"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProductForm = ({ categories, product }) => {
  const router = useRouter();
  const [image, setimage] = useState(null);
  const [productCreds, setProductCreds] = useState(product);

  const onChange = (e) => {
    setProductCreds({ ...productCreds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    if (productCreds.category === "--Please Select A Valid Category--") {
      toast.error("Please select a valid category.");
    } else {
      try {
        const productFormData = new FormData();
        productFormData.set("name", productCreds.name);
        productFormData.set("orprice", productCreds.orprice);
        productFormData.set("desc", productCreds.desc);
        productFormData.set("pincodes", productCreds.pincodes);
        productFormData.set("brand", productCreds.brand);
        productFormData.set("disprice", productCreds.disprice);
        productFormData.set("category", productCreds.category);
        productFormData.set("image", image);
        const res = await fetch(`/api/admin/product/edit/${product.slug}`, {
          method: "POST",
          body: productFormData,
        });
        const json = await res.json();
        if (res.status === 200) {
          console.log(json);
          
          // toast.success("Product Added Successfully...");
          // router.push("/admin/product");
        }
      } catch (error) {
        toast.error("Something Went wrong. Please try again later.");
      }
    }
  };
  return (
    <>
      <form
        className="mt-8 mx-auto w-[80%]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <h1 className="text-xl md:text-2xl lg:text-4xl mb-3">
          Add New Product
        </h1>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            // minLength={}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
            value={productCreds.name}
            onChange={onChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Product Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="OrPrice"
            id="OrPrice"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
            value={productCreds.OrPrice}
            onChange={onChange}
          />
          <label
            htmlFor="OrPrice"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Original Price
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="brand"
            id="brand"
            value={productCreds.brand}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="brand"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Brand
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="disPrice"
            id="disPrice"
            value={productCreds.disPrice}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="disPrice"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Discounted Price
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="pincodes"
          >
            Available Pincodes (Comma-separated)
          </label>
          <input
            type="text"
            name="pincodes"
            value={productCreds.pincodes}
            onChange={onChange}
            id="pincodes"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder="Enter pincodes separated by commas"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <>
            <select
              id="countries"
              name="category" // Add this line to bind the select value to the state
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={onChange} // Ensure correct function name
              value={productCreds.category}
            >
              <>
                {categories.map((cat) => {
                  return (
                    <option
                      key={cat.id}
                      value={cat.id}
                      selected={cat.id === productCreds.categoryId}
                    >
                      {cat.name}
                    </option>
                  );
                })}
              </>
            </select>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Please choose a Category
            </label>
          </>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="desc"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="desc"
            value={productCreds.desc}
            onChange={onChange}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add a catchy description..."
            maxLength={200}
            name="desc"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          {product.image && (
            <Image
              src={product.image}
              width={500}
              height={500}
              quality={100}
              alt="Current Product"
              className="w-fit mx-auto h-60 rounded-md"
            />
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="image"
          >
            Upload Product Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="image"
            type="file"
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            name="image"
            accept="image/png, image/jpeg"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            PNG, JPG.
          </p>
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Save Product
        </button>
      </form>
    </>
  );
};

export default EditProductForm;
