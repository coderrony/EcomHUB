import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

import FilterForm from "./FilterForm";

import { Minimize2, X } from "lucide-react";

function FilterProduct({ categorys }) {
  return (
    <>
      {/* large device */}
      <div className="hidden sm:block">
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
          Categories
        </h3>
        <FilterForm categorys={categorys} />
      </div>

      {/* hamburger menu for small device */}
      <div className="sm:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Minimize2 />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="fixed inset-y-0 left-0 top-0 z-50 flex h-screen w-64 flex-col bg-background ">
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            <DrawerHeader>
              <div className="flex justify-between items-center">
                <DrawerTitle className="text-left"> Categories</DrawerTitle>
                <DrawerClose>
                  <X />
                </DrawerClose>
              </div>

              <DrawerDescription>
                <FilterForm categorys={categorys} />
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default FilterProduct;
