"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddressClient = ({ adds }) => {
  const [address, setAddress] = useState(adds);
  const deleteAddress = async (id) => {
    if (address.length > 1) {
      const res = await fetch(`/api/delete-address/${id}`, {
        method: "GET",
      });
      const json = await res.json();
      // console.log(json);
      if (json.success) {
        const newAdds = address.filter((addres) => {
          return addres.id !== id;
        });
        setAddress(newAdds);
        toast.success("Address Deleted successfully", {autoClose: 300});
      } else {
        toast.error("Something Went Wrong....!", {autoClose: 300});
      }
    } else {
      toast.warning("Can't delete the last address");
    }
  };
  return (
    <>
      {address.map((add) => {
        return (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="credit-card"
                      aria-describedby="credit-card-text"
                      type="radio"
                      name="payment-method"
                      defaultValue=""
                      className="h-4 w-4 border-gray-300 bg-white text-green-600 focus:ring-2 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
                      defaultChecked=""
                    />
                  </div>
                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="credit-card"
                      className="font-medium leading-none text-gray-900 dark:text-white"
                    >
                      {add.city}
                    </label>
                    <p
                      id="credit-card-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      {add.hno} {add.street} {add.state}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => deleteAddress(add.id)}
                    type="button"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Delete
                  </button>
                  <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AddressClient;
