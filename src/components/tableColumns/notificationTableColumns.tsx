"use client";

import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import MessageSendModal from "../page/messaging/MessageSendModal";

// table column definition
const notificationTableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
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
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <div className="flex items-center justify-evenly gap-1">
          {/* component name here */}
          <MessageSendModal item={item} />
        </div>
      );
    },
  },
];

export default notificationTableColumns;
