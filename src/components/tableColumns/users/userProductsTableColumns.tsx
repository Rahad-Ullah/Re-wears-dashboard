"use client";

import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// table column definition
const userProductsColumns: ColumnDef<IProduct>[] = [
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
      return (
        <Image src={item?.photos[0]} alt={item?.title} width={30} height={30} />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.title}</p>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.category}</p>;
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

export default userProductsColumns;
