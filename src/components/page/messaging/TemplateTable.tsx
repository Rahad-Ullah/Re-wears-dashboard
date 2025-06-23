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
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import templateTableColumns from "@/components/tableColumns/templateTableColumns";
import Modal from "@/components/modals/Modal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templateCategory } from "@/constants/notification";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { myFetch } from "@/utils/myFetch";
import { revalidateTags } from "@/helpers/revalidateHelper";

const TemplateTable = ({ items = [], filters, meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const table = useReactTable<IUser>({
    data: items || [],
    columns: templateTableColumns as ColumnDef<IUser>[],
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
      // pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const messageData = {
      name: data.get("name"),
      category: selectedCategory,
      message: data.get("message"),
    };

    try {
      const res = await myFetch("/templates/create", {
        method: "POST",
        body: messageData,
      });

      if (res?.message) {
        toast.success("Template Create sucessfully");
        await revalidateTags(["Templates"]);
      } else {
        toast.error(res.message || "Failed to create template");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-between gap-4 items-center pb-4">
        {/* left side filters */}
        <div></div>

        {/* right side filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Filter by category */}
          <Select
            defaultValue={filters?.category}
            onValueChange={(value) =>
              updateMultiSearchParams({
                page: null,
                category: value === "All" ? null : value,
              })
            }
          >
            <SelectTrigger className="w-fit gap-2">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All Category</SelectItem>
                {templateCategory?.map((item, idx) => (
                  <SelectItem key={idx} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Modal
            dialogTrigger={
              <Button>
                <Plus /> Add
              </Button>
            }
            className="max-w-lg"
          >
            <form onSubmit={handleSubmit} className="grid gap-3">
              <h1 className="text-lg font-semibold">Add Template</h1>
              <Label>Name</Label>
              <Input name="name" placeholder="Enter template name" />

              <Label>Category</Label>
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger name="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {templateCategory?.map((item, idx) => (
                    <SelectItem key={idx} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Message</Label>
              <Textarea
                name="message"
                rows={4}
                placeholder="Write message..."
              />

              <div className="flex items-center gap-4 justify-end">
                <Button className="">Add Now</Button>
              </div>
            </form>
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={templateTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default TemplateTable;
