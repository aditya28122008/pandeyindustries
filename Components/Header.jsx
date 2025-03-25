/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import Image from "next/image";
import CartSidebar from "./CartSidebar";
import { auth } from "@/auth";
import ClientFunctions from "./ClientFunctions";
import ProfileDropDown from "./ProfileDropDown";
import ToggleDarkMode from "./ToggleDarkMode";
import ToggleCart from "./ToggleCart";
import prisma from "@/lib/prisma";

const Header = async () => {
  const session = await auth();
  const productCats = await prisma.productCategory.findMany({
    where: { navView: true },
  });
  let user;
  let shops;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    shops = await prisma.shop.findMany({
      where: { userId: user.id },
    });
  }

  // const { setTheme, resolvedTheme } = useTheme();

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
            {/* <Link
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
            </Link> */}
            {productCats.map((cat) => {
              return (
                <>
                  <Link
                    prefetch
                    href={`/cat/${cat.url}`}
                    className="mr-5 hover:underline hover:underline-offset-4 font-bold"
                  >
                    {cat.name.toUpperCase()}
                  </Link>
                </>
              );
            })}
          </nav>
          <div className="flex space-x-2 items-center justify-center">
            <ToggleCart />
            <ToggleDarkMode />
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
              <ProfileDropDown shops={shops} session={session} userVar={user} />
            )}
          </div>
        </div>
      </header>
      <ClientFunctions />
      <CartSidebar />
    </>
  );
};

export default Header;
