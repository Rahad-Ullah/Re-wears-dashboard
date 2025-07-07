"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IUser } from "@/types/user";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import userProductsColumns from "@/components/tableColumns/users/userProductsTableColumns";
import userProductSolidColumns from "@/components/tableColumns/users/userProductSoldColumns";

const UserProductSoldTable = ({ items = [], meta }) => {
  // table
  const table = useReactTable<IUser>({
    data: items || [],
    columns: userProductSolidColumns as ColumnDef<IUser>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4 items-center pb-4"></section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={userProductsColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default UserProductSoldTable;
