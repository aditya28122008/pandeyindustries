"use client";
import React, { useState } from "react";
import cartContext from "./cartContext";

const CartState = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [highSubTotal, setHighSubTotal] = useState(0);
  const removeProduct = async (prod) => {
    const newArr = cart.filter((carProd) => {
      return carProd.id !== prod.id;
    });
    setCart(newArr);
    updateSubtotal(newArr);
    localStorage.setItem("cart", JSON.stringify(newArr));
  };
  const addItem = async (product) => {
    let newCart = [...cart];
    const filtPro = cart.filter((pro) => {
      return pro.id === product.id;
    });
    let currPro = filtPro[0];
    if (currPro) {
      currPro.qty = currPro.qty + 1;
      const ind = cart.indexOf(currPro);
      setCart((prevArray) => {
        // Copy the previous array
        newCart[ind] = currPro; // Replace the element at the specified index
        return newCart;
      });
    } else {
      let proc = product;
      proc.qty = 1;
      newCart = cart.concat([proc]);
      setCart(newCart);
    }
    updateSubtotal(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const removeItem = (product) => {
    let newCart = [...cart];
    if (cart.includes(product) && product.qty === 1) {
      newCart = cart.filter((prod) => {
        return prod.id !== product.id;
      });
      setCart(newCart);
    } else if (cart.includes(product) && product.qty !== 1) {
      let currProd = cart.filter((prod) => {
        return prod.id === product.id;
      });
      const indProd = cart.indexOf(currProd);
      currProd[0].qty = currProd[0].qty - 1;
      setCart((prevArray) => {
        // Copy the previous array
        newCart[indProd] = currProd; // Replace the element at the specified index
        return newCart;
      });
    }
    updateSubtotal(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const clearCart = () => {
    const newCart = [];
    updateSubtotal(newCart)
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const checkCart = async () => {
    if (localStorage.getItem("cart")) {
      const currCart = await JSON.parse(localStorage.getItem("cart"));
      updateSubtotal(currCart);
      setCart(currCart);
    }
  };
  const updateSubtotal = (currCart) => {
    if (currCart.length > 0) {
      let subT = 0;
      for (let i = 0; i < currCart.length; i++) {
        const prod = currCart[i];
        let addSubT = prod.disPrice * prod.qty;
        subT += addSubT;
      }
      setSubTotal(subT);
      let hsubT = 0;
      for (let i = 0; i < currCart.length; i++) {
        const prod = currCart[i];
        let addSubT = prod.OrPrice * prod.qty;
        hsubT += addSubT;
      }
      setHighSubTotal(hsubT);
    } else {
      setSubTotal(0);
      setHighSubTotal(0)
    }
  };
  return (
    <cartContext.Provider
      value={{
        addItem,
        removeItem,
        clearCart,
        cart,
        checkCart,
        subTotal,
        highSubTotal,
        removeProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartState;
