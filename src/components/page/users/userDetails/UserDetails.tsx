import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/types/user";
import { List, ShoppingCart } from "lucide-react";
import UserProductsTable from "./UserProductsTable";
import { demoProductsData } from "@/demoData/products";

const UserDetails = ({ user }: { user: IUser }) => {
  console.log(user);

  //1. fetch user products data
  //2. then pass it the table

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
            items={demoProductsData as never[]}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sold-products">
          <UserProductsTable
            items={demoProductsData as never[]}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetails;
