"use client";
import { ScrollArea } from "../ui/scroll-area";
import CartInfo from "./CartInfo";
import ConfirmProducts from "./ConfirmProducts";

function CartDetails({ cart }) {
  return (
    <div className="grid md:grid-cols-3 gap-3 container mt-5 shadow">
      <div className="md:col-span-2 ">
        <div className="flex flex-col px-4 h-[300px] md:h-[500px] overflow-auto">
          <ScrollArea>
            {cart.map((item) => (
              <CartInfo cart={item} key={item.productName} />
            ))}
          </ScrollArea>
        </div>
      </div>
      <div className="">
        <ConfirmProducts />
      </div>
    </div>
  );
}

export default CartDetails;
