"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IReport } from "@/types/report";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Eye } from "lucide-react";

// table column definition
const reportTableColumns: ColumnDef<IReport>[] = [
  {
    accessorKey: "reportId",
    header: "Report ID",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <p className="px-2">{item?.reportId}</p>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <p className="px-2">{item?.content}</p>
      );
    },
  },
  {
    accessorKey: "reporter",
    header: "Reporter",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.reporter}</p>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <p className="px-2">{item?.reason}</p>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      const item = row.original as IReport;
      return <p className="px-2">{item?.date?.split("T")[0]}</p>;
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
    header: () => <div className="px-8">Action</div>,
    cell: ({ row }) => {
      const item = row.original;
      console.log(item);

      return (
        <div className="flex items-center justify-evenly gap-1">
          <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Eye />
            </Button>
          <Button variant={"ghost"} size={"icon"} className="text-green-500">
            <Check />
          </Button>
        </div>
      );
    },
  },
];

export default reportTableColumns;
