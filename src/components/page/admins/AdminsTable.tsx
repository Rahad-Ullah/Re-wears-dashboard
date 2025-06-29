"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { IUser } from "@/types/user";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import { Plus } from "lucide-react";
import Modal from "@/components/modals/Modal";
import AddAdminForm from "@/components/forms/admin/AddAdmin";
import adminTableColumns from "@/components/tableColumns/admins/adminTableColumns";

const AdminsTable = ({ users = [], meta }) => {
  const [open, setOpen] = React.useState(false);

  const table = useReactTable<IUser>({
    data: users || [],
    columns: adminTableColumns as ColumnDef<IUser>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4 items-center pb-4">
        {/* add admin button */}
        <Modal
          open={open}
          onOpenChange={setOpen}
          dialogTrigger={
            <Button>
              <Plus /> Add Admin
            </Button>
          }
          dialogTitle="Add Admin"
          className="max-w-sm lg:max-w-lg"
        >
          <AddAdminForm setOpen={setOpen} />
        </Modal>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={adminTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default AdminsTable;
