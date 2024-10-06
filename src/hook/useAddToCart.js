"use client";

import { AddToCartContext } from "@/context";
import { useContext } from "react";

const useAddToCart = () => {
  return useContext(AddToCartContext); //return { cart, addToCart, removeFromCart }
};

export default useAddToCart;
