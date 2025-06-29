"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import { IBrand } from "@/types/brand";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import ThreeHandleEdit from "../page/settings/handlerForms/ThreeHandleEdit";

// handle delete item
const handleDelete = async (id: string) => {
  toast.loading("Processing...", { id: "delete-user" });

  try {
    const res = await myFetch(`/type/brand/${id}`, {
      method: "DELETE",
    });

    if (res.success) {
      revalidateTags(["brand"]);
      toast.success(res.message || "Deleted successfully", {
        id: "delete-user",
      });
    } else {
      toast.error(res.message || "Something went wrong", { id: "delete-user" });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const brandTableColumns: ColumnDef<IBrand>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
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
    header: "Name",
    cell: ({ row }) => {
      const item = row.original as IBrand;
      return (
        <span className="capitalize font-medium w-full justify-start hover:bg-transparent">
          {item?.name}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "totalAssignedItems",
  //   header: "Assinged Products",
  //   cell: ({ row }) => {
  //     const item = row.original as IBrand;
  //     return (
  //       <Button
  //         variant={"ghost"}
  //         className="w-full justify-start hover:bg-transparent"
  //       >
  //         {item.totalAssignedItems}
  //       </Button>
  //     );
  //   },
  // },
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
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const item = row.original as IBrand;
      return (
        <div className="flex items-center justify-center gap-2">
          {/* edit */}
          <ThreeHandleEdit item={item} type="/type/brand" />
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

export default brandTableColumns;
