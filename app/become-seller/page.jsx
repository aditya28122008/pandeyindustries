import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BecomeSellerClient from "./BecomeSellerClient";
import prisma from "@/lib/prisma";

const BecomeASeller = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  const shops = await prisma.shop.findMany({
    where: { userId: user.id },
  });
  if (user.category === "SELLER" || (user.category === "CONSUMER" && shops.length > 0)) {
    redirect("/");
  }

  const submitAction = async (e) => {
    "use server";
    await prisma.shop.create({
      data: {
        name: e.get("name"),
        state: e.get("state"),
        city: e.get("city"),
        street: e.get("street"),
        zip: e.get("zip"),
        userId: user.id,
      },
    });
    await prisma.user.update({
      where: { id: session.user.id },
      data: { category: "SELLER" },
    });
    return { success: true };
  };

  return (
    <div>
      <BecomeSellerClient submitAction={submitAction} />
    </div>
  );
};

export default BecomeASeller;
