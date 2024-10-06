export const fetchCache = "force-no-store";
import { auth } from "@/auth";
import CheckOutClient from "@/Components/CheckOutClient";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddressClient from "./AddressClient";

export async function generateMetadata() {
  return {
    title: "Checkout | Pandey Industries",
  };
}

const Checkout = async () => {
  const session = await auth();

  if (session) {
    const adds = await prisma.address.findMany({
      where: { customerId: session.user.id },
    });
    if (adds.length > 0) {
      return (
        <>
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                <Link
                  href={"/cart-confirm"}
                  legacyBehavior
                  className="cursor-pointer"
                >
                  <li className="after:border-1 flex items-center text-green-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-green-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                      <svg
                        className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Cart
                    </span>
                  </li>
                </Link>

                <li className="after:border-1 flex items-center text-green-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-green-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                  <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                    <svg
                      className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Checkout
                  </span>
                </li>
                <li className="flex shrink-0 items-center">
                  <svg
                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Order summary
                </li>
              </ol>
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div className="min-w-0 flex-1 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Select Delivery Address
                    </h3>
                  </div>
                  {adds && (
                    <>
                      <AddressClient adds={adds} />
                    </>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Delivery Methods
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="dhl"
                              aria-describedby="dhl-text"
                              type="radio"
                              name="delivery-method"
                              defaultValue=""
                              className="h-4 w-4 border-gray-300 bg-white text-green-600 focus:ring-2 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
                              defaultChecked=""
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="dhl"
                              className="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              {" "}
                              $15 - DHL Fast Delivery{" "}
                            </label>
                            <p
                              id="dhl-text"
                              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              Get it by Tommorow
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="fedex"
                              aria-describedby="fedex-text"
                              type="radio"
                              name="delivery-method"
                              defaultValue=""
                              className="h-4 w-4 border-gray-300 bg-white text-green-600 focus:ring-2 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="fedex"
                              className="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              {" "}
                              Free Delivery - FedEx{" "}
                            </label>
                            <p
                              id="fedex-text"
                              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              Get it by Friday, 13 Dec 2023
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="express"
                              aria-describedby="express-text"
                              type="radio"
                              name="delivery-method"
                              defaultValue=""
                              className="h-4 w-4 border-gray-300 bg-white text-green-600 focus:ring-2 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600"
                            />
                          </div>
                          <div className="ms-4 text-sm">
                            <label
                              htmlFor="express"
                              className="font-medium leading-none text-gray-900 dark:text-white"
                            >
                              {" "}
                              $49 - Express Delivery{" "}
                            </label>
                            <p
                              id="express-text"
                              className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                            >
                              Get it today
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Enter a gift card, voucher or promotional code{" "}
                    </label>
                    <div className="flex max-w-md items-center gap-4">
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                        placeholder=""
                        required=""
                      />
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
                <CheckOutClient />
              </div>
            </form>
          </section>
        </>
      );
    } else {
      redirect("/auth/customer/complete");
    }
  } else {
    return redirect("/auth/signin");
  }
};

export default Checkout;
