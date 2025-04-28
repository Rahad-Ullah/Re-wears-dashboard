"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import Modal from "../modals/Modal";
import { Textarea } from "../ui/textarea";

// table column definition
const notificationTableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            #{item._id}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.firstName} {item?.lastName}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="w-full justify-start hover:bg-transparent"
          >
            {item.email}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div>Location</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item?.location}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Badge
            className={`capitalize font-medium text-white rounded-full hover:bg-primary py-1.5 w-full flex justify-center`}
            style={{
              backgroundColor:
                role === "Admin"
                  ? "#9d987b"
                  : role === "Buyer"
                  ? "#009933"
                  : "#ff6600",
            }}
          >
            {row.getValue("role")}
          </Badge>
        </Link>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8">Action</div>,
    cell: () => {
      return (
        <div className="flex items-center justify-evenly gap-1">
          <Button variant={"ghost"} size={"icon"} className="text-primary">
            <Eye />
          </Button>
          <Modal
            dialogTrigger={
              <Button size={"sm"} className="text-sm">
                Send
              </Button>
            }
            className="max-w-lg"
          >
            <div className="grid gap-3">
              <h1 className="text-lg font-semibold">Send Notification</h1>
              <Textarea rows={4} placeholder="Write here..." />
              <Button className="ml-auto px-6">Send</Button>
            </div>
          </Modal>
        </div>
      );
    },
  },
];

export default notificationTableColumns;
