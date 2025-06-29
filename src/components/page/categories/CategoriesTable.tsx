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
import categoriesTableColumns from "@/components/tableColumns/categoriesTable/categoriesTableColumns";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const itemNames = [
  { name: "MEN", value: "MEN" },
  { name: "WOMEN", value: "WOMEN" },
  { name: "KIDS", value: "KIDS" },
  { name: "BEAUTY/GROOMING", value: "BEAUTY/GROOMING" },
];

const CategoriesTable = ({ items = [], meta }) => {
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
    columns: categoriesTableColumns as ColumnDef<ICategory>[],
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

  const handleCategories = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");

    try {
      const res = await myFetch(`/category/create`, {
        method: "POST",
        body: { name },
      });

      console.log(res);

      if (res.success) {
        toast.success(res.message || "Create category successfully", {
          id: "category",
        });
        await revalidateTags(["category"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message || "failed category data try again.", {
          id: "category",
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
            <form onSubmit={handleCategories} className="grid gap-3">
              <h1 className="text-lg font-semibold">Add Categories</h1>
              <Label>Name</Label>
              <Select name="name">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.isArray(itemNames) &&
                      itemNames.map((category) => (
                        <SelectItem key={category.name} value={category.value}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button type="submit" className="ml-auto px-6">
                Add
              </Button>
            </form>
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={categoriesTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default CategoriesTable;
