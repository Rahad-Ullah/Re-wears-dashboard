/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @next/next/no-img-element */
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
import SubCategoriesTableColumns from "@/components/tableColumns/categoriesTable/SubCategoriesTableColumns";
import brandTableColumns from "@/components/tableColumns/brandTableColumns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";

interface CategoryOption {
  _id: string;
  name: string;
}

const SubCategoriesTable = ({
  items = [],
  categoriesData = [],
  meta,
}: {
  items?: ICategory[];
  categoriesData?: CategoryOption[];
  meta?: any;
}) => {
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
    columns: SubCategoriesTableColumns as ColumnDef<ICategory>[],
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

  const handleSubCategories = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await myFetch(`/sub-category`, {
        method: "POST",
        body: formData,
      });

      console.log(res);

      if (res.success) {
        toast.success(res.message || "Create Sub category successfully", {
          id: "sub-category",
        });
        await revalidateTags(["sub-category"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message || "failed Sub category data", {
          id: "sub-category",
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
            <form onSubmit={handleSubCategories} className="grid gap-3">
              <h1 className="text-lg font-semibold">Add Sub Category</h1>
              <Label>Name</Label>
              <Input name="name" placeholder="Enter name" />
              <Select name="category">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {Array.isArray(categoriesData) &&
                      categoriesData.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="file"
                name="icon"
                placeholder="Upload icon"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const preview = document.getElementById(
                      "icon-preview"
                    ) as HTMLImageElement;
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = "block";
                  }
                }}
              />
              <img
                id="icon-preview"
                alt="Icon Preview"
                style={{
                  display: "none",
                  marginTop: "10px",
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
              />
              <Button type="submit" className="ml-auto px-6">
                Add
              </Button>
            </form>
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={brandTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default SubCategoriesTable;
