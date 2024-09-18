/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import cartContext from "@/context/Cart/cartContext";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import CartSidebar from "./CartSidebar";
import { useTheme } from "next-themes";

const Header = () => {
  const { data: session } = useSession();
  const CartCon = useContext(cartContext);
  const { checkCart } = CartCon;
  const sideBarRef = useRef(null);
  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => {
    // signOut()
    // if (localStorage.getItem("mode")) {
    //   setMode(localStorage.getItem("mode"));
    // } else {
    //   setMode("light");
    // }
    checkCart();
  }, []);
  const showSideBar = () => {
    const sideBar = sideBarRef.current;
    if (sideBar.classList.contains("translate-x-full")) {
      sideBar.classList.remove("translate-x-full");
    } else if (!sideBar.classList.contains("translate-x-full")) {
      sideBar.classList.add("translate-x-full");
    }
  };
  const [dropDown, setDropDown] = useState(false);
  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };
  const changeMode = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else if (resolvedTheme === "dark") {
      setTheme("light");
    }
  };

  return (
    <>
      {/* <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" /> */}
      <header className="text-gray-600 body-font dark:bg-gray-800 dark:text-white shadow-md dark:shadow-none fixed top-0 left-0 right-0 z-10 bg-white">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 dark:text-gray-300 mb-4 md:mb-0"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg> */}
            <div className="relative">
              <Image
                src={`/Main Logo.png`}
                alt=""
                width={270}
                height={370}
                // className="dark:invert"
              />
            </div>
            {/* <span className="ml-3 text-xl dark:text-white">
              Pandey Industries
            </span> */}
            {/* <new Image src={"/vercel.svg"}/> */}
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              prefetch
              href={"/"}
              className="mr-5 hover:underline hover:underline-offset-4 font-bold"
            >
              Home
            </Link>
            <Link
              prefetch
              href={"/about"}
              className="mr-5 hover:underline hover:underline-offset-4 font-bold"
            >
              About Us
            </Link>
            <Link
              prefetch
              href={"/cat/gadgets"}
              className="mr-5 hover:underline hover:underline-offset-4 font-bold"
            >
              Gadgets
            </Link>
            <Link
              prefetch
              href={"/cat/fashion"}
              className="mr-5 hover:underline hover:underline-offset-4 font-bold"
            >
              Fashion
            </Link>
          </nav>
          <div className="flex space-x-2 items-center justify-center">
            {/* <FaShoppingCart className="text-4xl dark:text-green-400 text-green-400" />/ */}
            <IoMdCart
              className="text-4xl font-bold text-[#00f64f] cursor-pointer"
              onClick={showSideBar}
            />
            <button
              onClick={changeMode}
              className="inline-flex items-center py-1 px-3 focus:outline-none text-base mt-4 md:mt-0"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="block text-[#00f64f] mt-1 ml-2 cursor-pointer"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
              </svg>
            </button>
            {!session ? (
              <>
                <Link
                  href={"/auth/signin"}
                  // prefetch
                  // onClick={()=>signIn()}
                  id="dropdownDefaultButton"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <>
                  <button
                    id="dropdownDefaultButton"
                    className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    {session.user.image ? (
                      <>
                        <Image
                          alt=""
                          height={100}
                          width={100}
                          className="h-10 w-10 rounded-full"
                          src={session.user.image}
                        />
                      </>
                    ) : (
                      <>
                        <div className="dark:text-white text-black">
                          {session.user.email}
                        </div>
                      </>
                    )}

                    <svg
                      className="w-2.5 h-2.5 ms-3 invert dark:invert-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  <div className="relative">
                    <div
                      id="dropdown"
                      className={`z-10 ${
                        !dropDown && "divide-y divide-gray-100 hidden"
                      } bg-white absolute top-12 right-1 rounded-lg shadow w-44 dark:bg-gray-700`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <button onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                            Dashboard
                          </button>
                        </li>
                        {!session.user.ProfileComplete && (
                          <>
                            <Link href={'/auth/customer/complete'}>
                              <button onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                                Fill Up the Remainigs...!
                              </button>
                            </Link>
                          </>
                        )}
                        <li>
                          <button onClick={toggleDropdown} className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                            Earnings
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => signOut()}
                            className="block px-4 py-2 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
      </header>
      <CartSidebar sideBarRef={sideBarRef} showSideBar={showSideBar} />
    </>
  );
};

export default Header;
