import prisma from "@/lib/prisma";
import React from "react";
import OnGoningSalesTableclient from "../components/OnGoningSalesTableclient";

const OnGoingSales = async () => {
  const allSales = await prisma.ongoingSale.findMany();  

  return (
    <div>
      <h1 className="text-center text-xl md:text-2xl lg:text-4xl my-4 mb-6">
        All Products
      </h1>
      <OnGoningSalesTableclient sales={allSales} />
    </div>
  );
};

export default OnGoingSales;
