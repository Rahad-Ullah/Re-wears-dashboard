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
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import sizeTableColumns from "@/components/tableColumns/sizeTableColumns";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";

const SizeTable = ({ items = [], meta }) => {
  // const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [open, setOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<ICategory>({
    data: items || [],
    columns: sizeTableColumns as ColumnDef<ICategory>[],
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

  // create size
  const handleCreateSize = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");

    // update api

    try {
      const res = await myFetch(`/type/create`, {
        method: "POST",
        body: { name, type: "size" },
      });

      if (res.success) {
        toast.success(res.message || "Create size successfully", {
          id: "size",
        });
        await revalidateTags(["size"]);
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message || "failed create data try again", {
          id: "size",
        });
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
            <form onSubmit={handleCreateSize} className="grid gap-3">
              <h1 className="text-lg font-semibold">Add Size</h1>
              <Label>Name</Label>
              <Input name="name" placeholder="Enter name" />
              <Button type="submit" className="ml-auto px-6">
                Add
              </Button>
            </form>
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={sizeTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default SizeTable;
