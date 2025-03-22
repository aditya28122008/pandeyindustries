import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BecomeSellerClient from "./BecomeSellerClient";

const BecomeASeller = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  const submitAction = async (e) => {
    'use server';
    console.log(e);
  };

  return (
    <div>
      <BecomeSellerClient submitAction={submitAction} />
    </div>
  );
};

export default BecomeASeller;
