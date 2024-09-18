"use client";
import cartContext from "@/context/Cart/cartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const CartSidebar = ({ sideBarRef, showSideBar }) => {
  const CartCon = useContext(cartContext);
  const { cart, clearCart, addItem, removeItem, subTotal, highSubTotal } = CartCon;
  return (
    <div
      className="sidebar overflow-y-auto fixed z-20 translate-x-full right-0 top-0 dark:bg-gray-700 dark:text-white bottom-0 md:w-1/4 w-screen bg-gray-100 transition-transform duration-300"
      ref={sideBarRef}
      id="sidebar"
    >
      <div className="my-2 flex items-center justify-center md:justify-between px-4 pt-4 right-0 left-0">
        <div className="text-black text-center dark:text-white lg:text-3xl text-xl font-serif font-bold">
          Shopping Cart
        </div>
        <IoIosCloseCircle
          className="text-green-500 md:relative md:ml-4 absolute right-4 lg:text-4xl text-2xl cursor-pointer"
          onClick={showSideBar}
        />
      </div>
      <hr className="h-[0.12rem] bg-black" />
      <div className="mainContent my-3 px-6">
        <ol className="list-none my-4 px-4">
          {cart.length === 0 ? (
            <>
              <div className="text-center text-lg font-serif text-black dark:text-white">
                Your Cart is empty. Add products to cart to show up here
              </div>
            </>
          ) : (
            cart.map((item) => {
              return (
                <li className="productItem my-4 scale-110" key={item.id}>
                  <div className="flex justify-between space-x-2 items-center flex-col lg:flex-row">
                    <div className="image relative rounded-md">
                      <Image
                        width={400}
                        quality={100}
                        height={400}
                        src={item.image}
                        className="object-contain scale-110 bg-gray-300 dark:bg-white object-center rounded-md min-w-9 min-h-16 px-1 max-w-9 max-h-16"
                        alt=""
                      />
                    </div>
                    <Link href={`/product/${item.slug}`}>
                      <div
                        onClick={showSideBar}
                        className="name hover:underline hover:underline-offset-4 text-center"
                      >
                        {item.name}
                      </div>
                    </Link>
                    <div className="qty flex justify-center space-x-2">
                      <AiFillMinusCircle
                        className="cursor-pointer text-green-500 text-xl"
                        onClick={() => removeItem(item)}
                      />
                      <p>{item.qty}</p>
                      <AiFillPlusCircle
                        className="cursor-pointer text-green-500 text-xl"
                        onClick={() => addItem(item)}
                      />
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ol>
        <p className="text-xl font-bold mt-8 -mb-4">Subtotal: <span className="text-green-600 dark:text-green-400">₹{subTotal}</span> <span className="text-sm text-red-600 dark:text-red-400 line-through">₹{highSubTotal}</span> </p>
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="flex justify-center mt-8">
            <Link href={"/cart-confirm"}>
              <button
                onClick={showSideBar}
                className="flex mx-2 items-center text-white bg-green-500 border-0 py-1 px-3  focus:outline-none hover:bg-green-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="text-lg mr-1 -ml-2" />
                Checkout
              </button>
            </Link>

            <button
              onClick={clearCart}
              className="flex mx-2 items-center text-white bg-green-500 whitespace-nowrap border-0 py-1 px-3  focus:outline-none hover:bg-green-600 rounded text-sm"
            >
              <MdDeleteForever className="text-2xl -ml-2 mx-1" />
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;