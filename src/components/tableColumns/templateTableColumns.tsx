"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { INotificationTemplate } from "@/types/notification";
import DeleteModal from "../modals/DeleteModal";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import React from "react";
import TemplateEditModal from "../modals/TemplateEditModal";

// handle delete
const handleDelete = async (id: string) => {
  try {
    const res = await myFetch(`/templates/${id}`, {
      method: "DELETE",
    });

    if (res?.message) {
      toast.success("Template delete successfully");
      await revalidateTags(["Templates"]);
    } else {
      toast.error(res?.message || "Template delete failed ");
    }
  } catch (error: unknown) {
    toast.error((error as Error)?.message);
  }
};

// table column definition
const templateTableColumns: ColumnDef<INotificationTemplate>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      // const item = row.original as INotificationTemplate;
      return <p className="px-2"># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original as INotificationTemplate;
      return <p className="px-2">{item?.name}</p>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as INotificationTemplate;
      return <p className="px-2 pl-5">{item?.category}</p>;
    },
  },
  {
    accessorKey: "lastupdated",
    header: () => <div>Last Updated</div>,
    cell: ({ row }) => {
      const item = row.original as INotificationTemplate;
      console.log(item);
      return <p className="px-2">{item?.updatedAt?.split("T")[0]}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original as INotificationTemplate;

      return (
        <div className="flex items-center justify-center gap-2">
          {/* template update */}
          <TemplateEditModal item={item} />

          {/* Delete Button */}
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            action={handleDelete}
            itemId={item?._id.toString()}
          />
        </div>
      );
    },
  },
];

export default templateTableColumns;
