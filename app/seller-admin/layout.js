import { auth } from "@/auth";
import SellerAdminSidebar from "./components/SellerAdminSidebar";
import { notFound, redirect } from "next/navigation";
import vars from "@/vars";

export const metadata = {
  title: "Admin | Pandey Industries",
};

export default async function Layout({ children }) {
  const user = await auth();
  if (user) {
    return (
      <>
        <SellerAdminSidebar />
        <div className="p-4 sm:ml-64">{children}</div>
      </>
    );
  } else {
    redirect("/auth/signin");
  }
}
