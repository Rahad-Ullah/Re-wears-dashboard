"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Modal from "../../modals/Modal";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import DeleteModal from "../../modals/DeleteModal";
import { IBrand } from "@/types/brand";
import Image from "next/image";
import { IMAGE_URL } from "@/config/env-config";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";

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
const handleAddChild = async (
  e: React.FormEvent<HTMLFormElement>,
  subCategory: string
) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name");

  try {
    const res = await myFetch(`/child-sub-category`, {
      method: "POST",
      body: { name, subCategory },
    });

    console.log(res);

    if (res.success) {
      toast.success(res.message || "Create child category successfully", {
        id: "child-category",
      });
      await revalidateTags(["child-sub-category"]);
    } else {
      toast.error(res.message || "failed Sub category data", {
        id: "child-category",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// update
const handleUpdate = async (
  e: React.FormEvent<HTMLFormElement>,
  id: string
) => {
  toast.loading("Processing...", { id: "sub" });
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  // update api

  try {
    const res = await myFetch(`/sub-category/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (res.success) {
      toast.success(res.message || "Edit successfully", { id: "sub" });
      await revalidateTags(["sub-category"]);
    } else {
      toast.error(res.message || "failed edit data", { id: "sub" });
    }
  } catch (error) {
    console.log(error);
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
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const item = row.original as IBrand;
      console.log(item?.category);
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
              className="capitalize justify-start hover:bg-transparent border border-gray-500 w-24 h-10"
            >
              Add Child
            </Button>
          }
          className="max-w-lg"
        >
          <form
            onSubmit={(e) => handleAddChild(e, String(item?._id))}
            className="grid gap-3"
          >
            <h1 className="text-lg font-semibold">Add Child</h1>
            <Label>Name</Label>
            <Input name="name" placeholder="Enter name" />
            <Button type="submit" className="ml-auto px-6">
              Save
            </Button>
          </form>
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
            <form
              onSubmit={(e) => handleUpdate(e, item?._id.toString())}
              className="grid gap-3"
            >
              <h1 className="text-lg font-semibold">Edit Sub Category</h1>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter name"
                defaultValue={item?.name}
              />
              <Input
                type="file"
                name="icon"
                placeholder="Upload icon"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const preview = document.getElementById(
                      "icon-preview"
                    ) as HTMLImageElement;
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = "block";
                  }
                }}
              />
              <Button className="ml-auto px-6">Save</Button>
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

export default SubCategoriesTableColumns;
