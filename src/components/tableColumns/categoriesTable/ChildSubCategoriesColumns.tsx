"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import DeleteModal from "../../modals/DeleteModal";
import { ISize } from "@/types/size";
import toast from "react-hot-toast";
import { myFetch } from "@/utils/myFetch";
import { revalidateTags } from "@/helpers/revalidateHelper";
import EditChildCategory from "@/components/page/categories/forms/EditChildCategory";

// handle delete item
const handleDelete = async (id: string) => {
  toast.loading("Processing...", { id: "delete-child" });

  try {
    const res = await myFetch(`/child-sub-category/${id}`, {
      method: "DELETE",
    });

    if (res.success) {
      revalidateTags(["child-sub-category"]);
      toast.success(res.message || "Deleted successfully", {
        id: "delete-child",
      });
    } else {
      toast.error(res.message || "Something went wrong", {
        id: "delete-child",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const childSubCategoriesColumns: ColumnDef<ISize>[] = [
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
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as ISize;
      return (
        <span className="capitalize font-medium w-full justify-start px-2 hover:bg-transparent">
          {item?.subCategory?.category?.name}
        </span>
      );
    },
  },
  {
    accessorKey: "sub category",
    header: "Sub Category",
    cell: ({ row }) => {
      const item = row.original as ISize;
      return (
        <span className="capitalize font-medium w-full justify-start px-2 hover:bg-transparent">
          {item?.subCategory?.name}
        </span>
      );
    },
  },
  {
    accessorKey: "child category",
    header: "Child Category",
    cell: ({ row }) => {
      const item = row.original as ISize;
      return (
        <span className="capitalize font-medium w-full justify-start px-2 hover:bg-transparent">
          {item?.name}
        </span>
      );
    },
  },

  {
    accessorKey: "created",
    header: () => <div>Created</div>,
    cell: ({ row }) => {
      const item = row.original as ISize;
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
      const item = row.original as ISize;
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
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const item = row.original as ISize;
      return (
        <div className="flex items-center justify-center gap-2">
          {/* edit */}
          <EditChildCategory item={item} />
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

export default childSubCategoriesColumns;
