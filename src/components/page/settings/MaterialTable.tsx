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
import colorTableColumns from "@/components/tableColumns/materialTableColumns";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import materialTableColumns from "@/components/tableColumns/materialTableColumns";

const MaterialTable = ({ items = [], filters, meta }) => {
  console.log(filters);
  // const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [open, setOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IColor>({
    data: items || [],
    columns: materialTableColumns as ColumnDef<IColor>[],
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

  // create material
  const handleCreateMaterial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");

    // update api

    try {
      const res = await myFetch(`/type/create`, {
        method: "POST",
        body: { name, type: "material" },
      });

      if (res.success) {
        toast.success(res.message || "Create material successfully", {
          id: "material",
        });
        await revalidateTags(["material"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message || "failed create data", { id: "material" });
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
            open={open}
            onOpenChange={setOpen}
            dialogTrigger={
              <Button>
                <Plus /> Add New
              </Button>
            }
            className="max-w-lg"
          >
            <form onSubmit={handleCreateMaterial} className="grid gap-3">
              <h1 className="text-lg font-semibold">Add Color</h1>
              <Label>Name</Label>
              <Input name="name" placeholder="Enter color name" />

              <Button type="submit" className="ml-auto px-6">
                Add
              </Button>
            </form>
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={colorTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default MaterialTable;
