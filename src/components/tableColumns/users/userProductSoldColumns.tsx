"use client";

import { IMAGE_URL } from "@/config/env-config";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// table column definition
const userProductSoldColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      return <p className="px-2"># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      console.log(item, "again check");
      return (
        <Image
          src={
            item?.productImage[0]?.startsWith("https")
              ? item?.productImage[0]
              : `${IMAGE_URL}${item?.productImage[0]}`
          }
          alt={item?.name}
          width={30}
          height={30}
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.brand?.name}</p>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.name}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">${item?.price}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.status}</p>;
    },
  },
];

export default userProductSoldColumns;
