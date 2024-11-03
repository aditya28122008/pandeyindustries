"use client";
import { IoMdCart } from "react-icons/io";

const ToggleCart = () => {
  const showSideBar = () => {
    const sideBar = document.getElementById("sidebar");
    if (sideBar.classList.contains("translate-x-full")) {
      sideBar.classList.remove("translate-x-full");
    } else if (!sideBar.classList.contains("translate-x-full")) {
      sideBar.classList.add("translate-x-full");
    }
  };
  return (
    <>
      <IoMdCart
        className="text-4xl font-bold text-[#00f64f] cursor-pointer"
        onClick={showSideBar}
      />
    </>
  );
};

export default ToggleCart;
