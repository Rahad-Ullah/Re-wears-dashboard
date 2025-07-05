"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import { ICategory } from "@/types/category";
import childSubCategoriesColumns from "@/components/tableColumns/categoriesTable/ChildSubCategoriesColumns";

const ChildSubCategories = ({
  items = [],
  subCategoriesData = [],
  filters,
  meta,
}) => {
  console.log(filters, subCategoriesData);
  // const updateMultiSearchParams = useUpdateMultiSearchParams();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<ICategory>({
    data: items || [],
    columns: childSubCategoriesColumns as ColumnDef<ICategory>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const handleChildCategories = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
  //   const name = formData.get("name");

  //   try {
  //     const res = await myFetch(`/child-sub-category`, {
  //       method: "POST",
  //       body: { name },
  //     });

  //     if (res.success) {
  //       toast.success(res.message || "Create child-sub-category successfully", {
  //         id: "child-category",
  //       });
  //       await revalidateTags(["child-category"]);
  //     } else {
  //       toast.error(res.message || "failed child category data", {
  //         id: "child-category",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="w-full bg-white rounded-xl h-full">
      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={childSubCategoriesColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default ChildSubCategories;
