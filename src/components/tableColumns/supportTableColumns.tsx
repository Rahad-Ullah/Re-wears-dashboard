"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ISupportTicket } from "@/types/support";
import UpdateStatus from "../page/support/updateStatus/UpdateStatus";

// table column definition
const supportTableColumns: ColumnDef<ISupportTicket>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          #{row.index + 1}
        </Button>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <Button
          variant={"ghost"}
          className="w-full justify-start hover:bg-transparent"
        >
          {item?.name}
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <Button
          variant={"ghost"}
          className="w-full justify-start hover:bg-transparent"
        >
          {item.email}
        </Button>
      );
    },
  },
  {
    accessorKey: "priority",
    header: () => <div>Priority</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <Badge
          className={`capitalize font-medium shadow-none rounded-full py-1.5 w-full flex justify-center ${
            item?.priority === "Low"
              ? "bg-emerald-50 text-emerald-600 border-emerald-400"
              : item?.priority === "Medium"
              ? "bg-blue-50 text-blue-600 border-blue-400"
              : item?.priority === "High"
              ? "bg-purple-50 text-purple-600 border-purple-400"
              : item?.priority === "Urgent"
              ? "bg-red-50 text-red-600 border-red-400"
              : ""
          }`}
        >
          {item?.priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;

      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-center hover:bg-transparent"
        >
          {item?.createdAt.split("T")[0]}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <Badge
          className={`capitalize font-medium shadow-none rounded-full py-1.5 w-full flex justify-center ${
            item?.status === "Pending"
              ? "bg-red-50 text-red-600 border-red-400"
              : item?.status === "OPEN"
              ? "bg-yellow-50 text-yellow-600 border-yellow-400"
              : item?.status === "Resolved"
              ? "bg-green-50 text-green-600 border-green-400"
              : ""
          }`}
        >
          {item?.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const item = row?.original as ISupportTicket;
      return (
        // <div className="flex items-center justify-evenly gap-1">
        //   <Modal
        //     dialogTrigger={
        //       <Button variant={"ghost"} size={"icon"}>
        //         <Eye />
        //       </Button>
        //     }
        //     className="max-w-[100vw] lg:max-w-lg"
        //   >
        //     <div className="text-stone-600 grid gap-2">
        //       <h1 className="text-xl font-semibold">{item?.subject}</h1>
        //       <h2 className="font-medium">
        //         <strong>User:</strong> {item?.name}
        //       </h2>
        //       <p className="font-medium">
        //         <strong>Message:</strong> <br /> {item?.message}
        //       </p>
        //       {/* here component name */}
        //       <UpdateStatus item={item} />
        //     </div>
        //   </Modal>
        // </div>
        <>
          {" "}
          <UpdateStatus item={item} />
        </>
      );
    },
  },
];

export default supportTableColumns;
