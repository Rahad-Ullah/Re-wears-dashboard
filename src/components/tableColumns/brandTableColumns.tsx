"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Modal from "../modals/Modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DeleteModal from "../modals/DeleteModal";
import { IBrand } from "@/types/brand";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";

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

const handleEdit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name");

  // update api

  try {
    const res = await myFetch(`/type/brand/${id}`, {
      method: "PATCH",
      body: { name },
    });

    if (res.success) {
      toast.success(res.message || "Edit successfully", { id: "edit-user" });
      await revalidateTags(["brand"]);
    } else {
      toast.error(res.message || "failed edit data", { id: "edit-user" });
    }
  } catch (error) {
    console.log(error);
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
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-primary">
                <Pencil />
              </Button>
            }
            className="max-w-lg"
          >
            <form
              onSubmit={(e) => handleEdit(e, item?._id?.toString())}
              className="grid gap-3"
            >
              <h1 className="text-lg font-semibold">Edit Brand</h1>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter name"
                defaultValue={item?.name}
              />
              <Button type="submit" className="ml-auto px-6">
                Save
              </Button>
            </form>
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

export default brandTableColumns;
