"use client";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import Modal from "../modals/Modal";
import { Textarea } from "../ui/textarea";

// table column definition
const notificationTableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?._id}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
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
    header: () => <div className="px-8 text-center">Action</div>,
    cell: () => {
      return (
        <div className="flex items-center justify-evenly gap-1">
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
