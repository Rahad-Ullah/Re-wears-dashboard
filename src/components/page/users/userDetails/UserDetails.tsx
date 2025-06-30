"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/types/user";
import { List, ShoppingCart } from "lucide-react";
import UserProductsTable from "./UserProductsTable";
import { useEffect, useState } from "react";
import { myFetch } from "@/utils/myFetch";
import UserProductSoldTable from "./UserProductSolidTable";

interface foo {
  status: string;
}

const UserDetails = ({ user }: { user: IUser }) => {
  const [products, setProducts] = useState([]);
  //1. fetch user products data
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRes = await myFetch(`/user-product/${user?._id}`);
      setProducts(productsRes?.data);
    };
    fetchProducts();
  }, [user?._id]);

  const soldProducts = products.filter(
    (item: foo) => item.status === "Sold" || item.status === "Draft"
  );

  return (
    <div className="grid gap-4">
      <Tabs defaultValue={"listed-products"} className="h-full flex flex-col">
        <TabsList className="w-full justify-center p-0 mb-4 border-b rounded-none gap-4">
          <TabsTrigger value="listed-products" className="px-4 w-fit">
            <List /> Listed Products
          </TabsTrigger>
          <TabsTrigger value="sold-products" className="px-4 w-fit">
            <ShoppingCart /> Sold Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listed-products">
          <UserProductsTable
            items={products}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sold-products">
          <UserProductSoldTable
            items={soldProducts}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetails;
