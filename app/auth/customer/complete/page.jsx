// import { useState } from "react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AddForm from "./AddForm";

export async function generateMetadata() {
  return {
    title: "Complete Profile | Pandey Industries",
  };
}

const CompleteCustomer = async () => {
  const user = await auth();

  if (user) {
    const adds = await prisma.address.findMany({
      where: { customerId: user.user.id },
    });
    const submitAction = async (e) => {
      "use server";
      const user = await auth();
      await prisma.address.create({
        data: {
          hno: e.get("hno"),
          street: e.get("street"),
          state: e.get("state"),
          city: e.get("city"),
          zip: e.get("zip"),
          customerId: `${user.user.id}`,
        },
      });
      return { success: true };
    };
    return (
      <div className="pt-12">
        <h1 className="text-4xl text-center font-sans">
          Something is missing...!
        </h1>
        <div className="flex md:flex-row flex-col md:justify-between justify-normal px-16">
          {adds.length <= 0 ? (
            <>
              <AddForm submitAction={submitAction} />
            </>
          ) : (
            <></>
          )}

          <div className="w-[50%]"></div>
        </div>
      </div>
    );
  } else {
    return redirect("/auth/signin");
  }
};

export default CompleteCustomer;
