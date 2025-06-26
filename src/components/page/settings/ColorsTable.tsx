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
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IColor } from "@/types/color";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import colorsTableColumns from "@/components/tableColumns/colorsTableColumns";

const ColorTable = ({ items = [], filters, meta }) => {
  console.log(filters);
  // const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IColor>({
    data: items || [],
    columns: colorsTableColumns as ColumnDef<IColor>[],
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

  // create color
  const handleCreatecolor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const hexCode = formData.get("hexCode");

    // update api

    try {
      const res = await myFetch(`/color/create`, {
        method: "POST",
        body: { name, hexCode },
      });

      if (res.success) {
        toast.success(res.message || "Create color successfully", {
          id: "color",
        });
        await revalidateTags(["color"]);
      } else {
        toast.error(res.message || "failed create data", { id: "color" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-between gap-4 items-center pb-4">
        <div></div>
        <div>
          <Modal
            dialogTrigger={
              <Button>
                <Plus /> Add New
              </Button>
            }
            className="max-w-lg"
          >
            <form onSubmit={handleCreatecolor} className="grid gap-3">
              <h1 className="text-lg font-semibold">Add Color</h1>
              <Label>Name</Label>
              <Input name="name" placeholder="Enter color name" />
              <Label>Color Code</Label>
              <Input name="hexCode" placeholder="Enter color code" />

              <Button type="submit" className="ml-auto px-6">
                Add
              </Button>
            </form>
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={colorsTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default ColorTable;
