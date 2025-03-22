"use client";

// import {  } from "@/auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProfileDropDown = ({ session, user }) => {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };
  return (
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
                <button
                  onClick={toggleDropdown}
                  className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </button>
              </li>
              {!session.user.ProfileComplete && (
                <>
                  <Link href={"/auth/customer/complete"}>
                    <button
                      onClick={toggleDropdown}
                      className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Fill Up the Remainigs...!
                    </button>
                  </Link>
                </>
              )}
              {user.category === "CONSUMER" && (
                <>
                  <Link href={"/become-seller"}>
                    <button
                      onClick={toggleDropdown}
                      className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Become a Seller
                    </button>
                  </Link>
                </>
              )}
              <li>
                <button
                  onClick={toggleDropdown}
                  className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                >
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
  );
};

export default ProfileDropDown;
