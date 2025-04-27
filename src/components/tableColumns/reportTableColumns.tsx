"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IReport } from "@/types/report";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Eye } from "lucide-react";
import Link from "next/link";

// table column definition
const reportTableColumns: ColumnDef<IReport>[] = [
  {
    accessorKey: "reportId",
    header: "Report ID",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          #{item.reportId}
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          {item?.content}
        </Button>
      );
    },
  },
  {
    accessorKey: "reporter",
    header: "Reporter",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Button
          variant={"ghost"}
          className="w-full justify-start hover:bg-transparent"
        >
          {item.reporter}
        </Button>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Button
          variant={"ghost"}
          className="w-full justify-start hover:bg-transparent"
        >
          {item.reason}
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Button
          variant={"ghost"}
          className="capitalize w-full justify-start hover:bg-transparent"
        >
          {item?.date?.split("T")[0]}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as IReport;
      return (
        <Badge
          className={`capitalize font-medium text-white rounded-full py-1.5 w-full flex justify-center`}
          style={{
            backgroundColor:
              item?.status === "Pending"
                ? "#9d987b"
                : item?.status === "In Review"
                ? "#ff6600"
                : item?.status === "Resolved"
                ? "#009933"
                : "",
          }}
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

      return (
        <div className="flex items-center justify-evenly gap-1">
          <Link
            href={`/dashboard/users/user-details/${item.reportId}`}
            passHref
          >
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Eye />
            </Button>
          </Link>
          <Button variant={"ghost"} size={"icon"} className="text-green-500">
            <Check />
          </Button>
        </div>
      );
    },
  },
];

export default reportTableColumns;
