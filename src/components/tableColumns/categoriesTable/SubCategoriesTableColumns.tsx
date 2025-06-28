"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Modal from "../../modals/Modal";
import DeleteModal from "../../modals/DeleteModal";
import { IBrand } from "@/types/brand";
import Image from "next/image";
import { IMAGE_URL } from "@/config/env-config";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import EditSubCategoryForm from "@/components/page/categories/forms/EditSubCategoryForm";
import AddChildCategoryForm from "@/components/page/categories/forms/AddChildCategoryForm";

// handle delete item
const handleDelete = async (id: string) => {
  toast.loading("Processing...", { id: "delete-sub-category" });

  try {
    const res = await myFetch(`/sub-category/${id}`, {
      method: "DELETE",
    });

    if (res.success) {
      revalidateTags(["sub-category"]);
      toast.success(res.message || "Deleted successfully", {
        id: "delete-sub-category",
      });
    } else {
      toast.error(res.message || "Something went wrong", {
        id: "delete-sub-category",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const SubCategoriesTableColumns: ColumnDef<IBrand>[] = [
  {
    accessorKey: "id",
    header: "Sl. No ",
    cell: ({ row }) => {
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          # {row.index + 1}
        </Button>
      );
    },
  },

  {
    accessorKey: "icon",
    header: () => <span>Icon</span>,
    cell: ({ row }) => {
      const item = row.original as IBrand;

      return (
        <Image
          src={
            item?.icon?.startsWith("http")
              ? item?.icon
              : `${IMAGE_URL}${item?.icon}`
          }
          alt="icon"
          width={70}
          height={70}
          className="p-2"
        />
      );
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as IBrand;

      return (
        <span className="capitalize font-medium w-full justify-start hover:bg-transparent pl-3">
          {item?.category?.name}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Sub Category",
    cell: ({ row }) => {
      const item = row.original as IBrand;
      return (
        <span className="capitalize font-medium w-full justify-start hover:bg-transparent pl-3">
          {item?.name}
        </span>
      );
    },
  },

  {
    accessorKey: "created",
    header: () => <div>Created</div>,
    cell: ({ row }) => {
      const item = row.original as IBrand;
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          {item?.createdAt?.split("T")[0]}
        </Button>
      );
    },
  },
  {
    accessorKey: "updated",
    header: () => <div>Last Updated</div>,
    cell: ({ row }) => {
      const item = row.original as IBrand;
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          {item?.updatedAt?.split("T")[0]}
        </Button>
      );
    },
  },
  {
    accessorKey: "child",
    header: () => <div>Add Child Category</div>,
    cell: ({ row }) => {
      const item = row.original as IBrand;

      return (
        <Modal
          dialogTrigger={
            <Button
              variant={"ghost"}
              className="capitalize justify-start hover:bg-transparent border border-gray-500  h-10"
            >
              Add Child Category
            </Button>
          }
          className="max-w-lg"
        >
          {/* here function add */}
          <AddChildCategoryForm item={item} />
        </Modal>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const item = row.original as IBrand;

      return (
        <div className="flex items-center justify-center gap-2">
          {/* edit */}
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-primary">
                <Pencil />
              </Button>
            }
            className="max-w-lg"
          >
            <EditSubCategoryForm item={item} />
          </Modal>
          {/* delete */}
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            itemId={item?._id?.toString()}
            action={handleDelete}
            actionBtnText="Delete"
          />
        </div>
      );
    },
  },
];

export default SubCategoriesTableColumns;
