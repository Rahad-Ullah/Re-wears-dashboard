import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Lock, LockOpen, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../modals/Modal";
import DeleteModal from "../modals/DeleteModal";
import EditProductForm from "../forms/product/EditProduct";

// handleDelete
const handleDelete = async () => {
  // backend api perform
};

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
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return (
        <Link href={`/products/products-details/${item?._id}`}>
          <Image
            src={item.photos[0] || ""}
            alt={item?.title}
            width={50}
            height={50}
            className="object-cover w-12 h-12 rounded-md"
          />
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
    header: () => <div className="px-8">Actions</div>,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center justify-evenly gap-1">
          {item.status === "Blocked" ? (
            <Button variant={"ghost"} size={"icon"} className="text-red-500">
              <Lock />
            </Button>
          ) : (
            <Button variant={"ghost"} size={"icon"} className="text-zinc-400">
              <LockOpen />
            </Button>
          )}

          {/* edit item */}
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-body">
                <Pencil />
              </Button>
            }
            dialogTitle={<p>Edit Product</p>}
            className="max-w-lg"
          >
            <EditProductForm />
          </Modal>

          {/* delete */}
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            itemId={item?._id}
            action={handleDelete}
            actionBtnText="Delete"
          ></DeleteModal>
        </div>
      );
    },
  },
];

export default productTableColumns;
