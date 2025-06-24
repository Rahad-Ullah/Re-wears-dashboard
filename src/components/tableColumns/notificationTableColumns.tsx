"use client";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import Modal from "../modals/Modal";
import { Textarea } from "../ui/textarea";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";

const handleSendNotifications = async (
  e: React.FormEvent<HTMLFormElement>,
  id: string
) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const text = formData.get("message")?.toString().trim();

  const message = {
    receiver: id,
    text,
    type: "ADMIN",
  };

  console.log(message, "message");

  const res = await myFetch(`/notification/create-admin-notification`, {
    method: "POST",
    body: message,
  });

  try {
    if (res?.success) {
      toast.success("Send message successfully");
      await revalidateTags(["message"]);
    } else {
      toast.error(res?.message || "failed message try again");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error(res?.data?.message);
  }
};

// table column definition
const notificationTableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <p className="px-2">
          {item?.firstName} {item?.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IUser;
      return <p className="px-2">{item?.email}</p>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original as IUser;
      return (
        <div className="flex items-center justify-evenly gap-1">
          <Modal
            dialogTrigger={
              <Button size={"sm"} className="text-sm">
                Send
              </Button>
            }
            className="max-w-lg"
          >
            <form
              onSubmit={(e) => handleSendNotifications(e, item?._id)}
              className="grid gap-3"
            >
              <h1 className="text-lg font-semibold">Send Notification</h1>
              <Textarea name="message" rows={4} placeholder="Write here..." />
              <Button type="submit" className="ml-auto px-6">
                Send
              </Button>
            </form>
          </Modal>
        </div>
      );
    },
  },
];

export default notificationTableColumns;
