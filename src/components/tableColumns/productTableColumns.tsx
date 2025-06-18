import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Lock, LockOpen, Trash } from "lucide-react";
import Image from "next/image";
import Modal from "../modals/Modal";
import DeleteModal from "../modals/DeleteModal";
import BlockProductForm from "../forms/product/BlockProduct";
import { myFetch } from "@/utils/myFetch";
import { revalidateTags } from "@/helpers/revalidateHelper";
import toast from "react-hot-toast";
import { IMAGE_URL } from "@/config/env-config";

// handleDelete
const handleDelete = async (id: string) => {
  toast.loading("Deleting...", { id: "delete-product" });

  try {
    const res = await myFetch(`/product/${id}`, {
      method: "DELETE",
    });

    res;
    if (res?.success) {
      revalidateTags(["products"]);
      toast.success(res?.message || "Product deleted successfully", {
        id: "delete-product",
      });
    } else {
      toast.error(res?.message || "Failed to delete product", {
        id: "delete-product",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const productTableColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "index",
    header: "Sl. No",
    cell: ({ row }) => {
      return <p className="px-2"># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      const item = row.original as IProduct;

      return (
        <Image
          src={`${IMAGE_URL}${item?.productImage[0]}` || ""}
          alt="Product Image"
          width={50}
          height={50}
          className="object-cover w-12 h-12 rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.name}</p>;
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
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

      // return <p className="px-2">{item?.category}</p>;
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item?.condition}</p>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">${item?.price}</p>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      const item = row.original as IProduct;
      return <p className="px-2">{item.createdAt.split("T")[0]}</p>;
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
            // edit modal
            <Modal
              dialogTrigger={
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-zinc-400"
                >
                  <LockOpen />
                </Button>
              }
              dialogTitle={<p>Block Product</p>}
              className="max-w-[100vw] lg:max-w-lg"
            >
              <BlockProductForm product={item} />
            </Modal>
          )}

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
