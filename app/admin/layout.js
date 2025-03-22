import { auth } from "@/auth";
import AdminSidebar from "./components/AdminSidebar";
import { notFound, redirect } from "next/navigation";
import vars from "@/vars";

export const metadata = {
  title: 'Admin | Pandey Industries',
};


export default async function Layout({ children }) {
  const user = await auth();
  if (user) {
    if (user.user.email === vars.ADMINEMAIL) {
      return (
        <>
          <AdminSidebar />
          <div className="p-4 sm:ml-64">{children}</div>
        </>
      );
    } else {
      notFound();
    }
  } else {
    redirect("/auth/signin");
  }
}
