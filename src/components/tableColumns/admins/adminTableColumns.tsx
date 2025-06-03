"use client";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Lock, LockOpen, Trash } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import DeleteModal from "@/components/modals/DeleteModal";

// handle block
const toggleBlock = async (id: string) => {
  toast.loading("Processing...", { id: "block-user" });
  try {
    const res = await myFetch(`/users/block-user/${id}`, {
      method: "PATCH",
    });
    if (res.success) {
      revalidateTags(["users", "user-profile"]);
      toast.success(res.message || "Updated successfully", {
        id: "block-user",
      });
    } else {
      toast.error(res.message || "Something went wrong", { id: "block-user" });
    }
  } catch (error) {
    console.log(error);
  }
};

// handle delete
const handleDelete = async (id: string) => {
  toast.loading("Processing...", { id: "delete-user" });
  try {
    const res = await myFetch(`/users/${id}`, {
      method: "DELETE",
    });
    if (res.success) {
      revalidateTags(["users", "user-profile"]);
      toast.success(res.message || "Deleted successfully", {
        id: "delete-user",
      });
    } else {
      toast.error(res.message || "Something went wrong", { id: "delete-user" });
    }
  } catch (error) {
    console.log(error);
  }
};

// table column definition
const adminTableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      return <p className="px-2"># {row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <p className="px-2">
          {item?.firstName} {item?.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.gender}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.email}</p>;
    },
  },
  {
    accessorKey: "location",
    header: () => <div>Location</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.location}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        item?.role === "SUPER_ADMIN" && (
          <div className="flex items-center justify-evenly gap-1">
            <div onClick={() => toggleBlock(item._id)}>
              {!item.isBlocked && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-zinc-400"
                >
                  <LockOpen />
                </Button>
              )}
              {item.isBlocked && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-red-500"
                >
                  <Lock />
                </Button>
              )}
            </div>

            <DeleteModal
              triggerBtn={
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-red-500"
                >
                  <Trash />
                </Button>
              }
              itemId={item?._id}
              action={handleDelete}
            />
          </div>
        )
      );
    },
  },
];

export default adminTableColumns;
