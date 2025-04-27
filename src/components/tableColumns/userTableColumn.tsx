"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Info, Lock, LockOpen, Trash } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<IUser>[] = [
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
    header: "Name",
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
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <Link href={`/dashboard/users/user-details/${item._id}`}>
          <Button
            variant={"ghost"}
            className="w-full justify-start hover:bg-transparent"
          >
            {item.gender}
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
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-evenly gap-1">
          <Link href={`/dashboard/users/user-details/${item._id}`} passHref>
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Info />
            </Button>
          </Link>
          {!item.isBlocked && (
            <Button variant={"ghost"} size={"icon"} className="text-zinc-400">
              <LockOpen />
            </Button>
          )}
          {item.isBlocked && (
            <Button variant={"ghost"} size={"icon"} className="text-red-500">
              <Lock />
            </Button>
          )}
          <Button variant={"ghost"} size={"icon"} className="text-red-500">
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
