"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userTableColumns from "@/components/tableColumns/userTableColumn";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { userGenders } from "@/constants/user";
import { IUser } from "@/types/user";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import { demoUsersData } from "@/demoData/users";

// extract unique locations from data
const locations = Array.from(
  new Set(demoUsersData.map((item) => item.location))
);

const UsersTable = ({ users = [], filters, meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();

  const table = useReactTable<IUser>({
    data: users || [],
    columns: userTableColumns as ColumnDef<IUser>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4 items-center pb-4">
        {/* location Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.location ? `${filters?.location}` : "Location"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ location: null, page: null })
              }
            >
              All locations
            </DropdownMenuItem>
            {locations.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() =>
                  updateMultiSearchParams({ location: item, page: null })
                }
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Gender Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.gender ? `${filters?.gender}` : "Gender"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ gender: null, page: null })
              }
            >
              All Genders
            </DropdownMenuItem>
            {userGenders.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() =>
                  updateMultiSearchParams({ gender: item, page: null })
                }
              >
                {capitalizeSentence(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={userTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default UsersTable;
