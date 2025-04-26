import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import Link from "next/link";

// table column definition
const productTableColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            #{item?._id}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.title}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.brand}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="w-full justify-start hover:bg-transparent"
          >
            {item.category}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="w-full justify-start hover:bg-transparent"
          >
            {item.condition}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            $ {item.price}
          </Button>
        </Link>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-1">
          <Link href={`/products/products-details/${item?._id}`} passHref>
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Info />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default productTableColumns;
