"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IReport } from "@/types/report";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import StatusUpdate from "./statusUpdate/StatusUpdate";

// table column definition
const reportedProductTableColumns: ColumnDef<IReport>[] = [
  {
    accessorKey: "reportId",
    header: "Report ID",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.reportId}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.reason}</p>;
    },
  },
  {
    accessorKey: "reporter",
    header: "Reporter",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.reporter?.email}</p>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.reason}</p>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.createdAt?.split("T")[0]}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Badge
          className={`capitalize font-medium text-white shadow-none rounded-full py-1.5 w-full flex justify-center ${
            item?.status === "Pending"
              ? "bg-purple-50 text-purple-500 border-purple-400"
              : item?.status === "In Review"
              ? "bg-orange-50 text-orange-500 border-orange-400"
              : "bg-green-50 text-green-600 border-green-400"
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
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* todo here */}
              <StatusUpdate
                item={item}
                review="In Review"
                resolved="Resolved"
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default reportedProductTableColumns;
