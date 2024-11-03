"use client";
import { useContext, useEffect, useState } from "react";
import cartContext from "@/context/Cart/cartContext";


const SinngleProdClient = (props) => {
  let pro = JSON.parse(props.product);
  const price = parseInt(pro.OrPrice)
  const diP = parseInt(pro.disPrice)
  pro.OrPrice = price
  pro.disPrice = diP
  const product = pro
  const cartCon = useContext(cartContext);
  const { addItem } = cartCon;
  const [checked, setChecked] = useState(false);
  const [ServicAbility, setServicAbility] = useState(null);
  const [pincode, setPincode] = useState(product.pincode);
  const checkPincodeAvalability = async (e) => {
    e.preventDefault();
    const check = product.pincodes.includes(pincode);
    if (check) {
      setServicAbility(true);
    } else {
      setServicAbility(false);
    }
    setChecked(true);
  };

  return (
    <>
      <div className="flex">
        <span className="title-font font-medium text-2xl text-green-600 dark:text-green-400">
          ₹{String(product.disPrice)} <span className="text-sm text-red-600 dark:text-red-400 line-through">₹{pro.OrPrice}</span>
        </span>
        <button
          onClick={() => {
            addItem(product);
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.remove("translate-x-full");
            // sidebar.classList.add("translate-x-0")
          }}
          className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
        >
          Add to Cart
        </button>
      </div>
      <form
        className="pin mt-6 flex text-sm justify-between"
        onSubmit={(e) => checkPincodeAvalability(e)}
      >
        <input
          type="number"
          name="pin"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
          }}
          required
          
          className="border-2 rounded-md focus:border-green-500 focus:border-2 border-black px-2 py-1 text-gray-500"
          placeholder="Check weather we deliver or not"
        />
        <button
          className="flex mr-0 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
          type="submit"
        >
          Check Pincode Serviceablity
        </button>
      </form>
      {checked && (
        <div>
          {!ServicAbility ? (
            <div className="text-red-500 font-bold dark:font-normal">
              Sorry! We Do not Deliver to this Pincode
            </div>
          ) : (
            <div className="text-green-500 font-bold dark:font-normal">
              Yes! this pincode is serviceable
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SinngleProdClient;
