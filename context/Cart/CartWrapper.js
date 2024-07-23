import React from "react";
import CartState from "./CartState";
const CartWrapper = ({ children }) => {
  return <CartState>{children}</CartState>;
};

export default CartWrapper;
