/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import cartContext from "@/context/Cart/cartContext";
import { useContext, useEffect } from "react";

const ClientFunctions = () => {
  const CartCon = useContext(cartContext);
  const { checkCart } = CartCon;
  useEffect(() => {
    checkCart();
  }, []);
  return <></>;
};

export default ClientFunctions;
