// "use client";

import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateStatus({ item }) {
  const [open, setOpen] = useState(false);
  const handleStatusUpdate = async (status: string) => {
    toast.loading("Procesing.....", { id: "status" });

    try {
      const res = await myFetch(`/supports/${item?._id}`, {
        method: "PATCH",
        body: { status },
      });

      if (res.success) {
        toast.success(res.message || "status successfully", { id: "status" });
        await revalidateTags(["supports"]);
      } else {
        toast.error(res.message || "status failed try again", { id: "status" });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
        { id: "status" }
      );
    }
  };

  return (
    <div className="flex items-center justify-evenly gap-1">
      <Modal
        open={open}
        onOpenChange={setOpen}
        dialogTrigger={
          <Button variant={"ghost"} size={"icon"}>
            <Eye />
          </Button>
        }
        className="max-w-[100vw] lg:max-w-lg"
      >
        <div className="text-stone-600 grid gap-2">
          <h1 className="text-xl font-semibold">{item?.subject}</h1>
          <h2 className="font-medium">
            <strong>User:</strong> {item?.name}
          </h2>
          <p className="font-medium">
            <strong>Email:</strong> {item?.email}
          </p>
          <p className="font-medium">
            <strong>Message:</strong> {item?.message}
          </p>
          <p className="font-medium">
            <strong>Subject:</strong> {item?.subject}
          </p>
          <div className="flex items-center gap-4 justify-end mt-2">
            {item?.status === "OPEN" && (
              <Button onClick={() => handleStatusUpdate("PENDING")}>
                Mark as pending
              </Button>
            )}
            {(item?.status === "PENDING" || item?.status === "OPEN") && (
              <Button onClick={() => handleStatusUpdate("RESOLVED")}>
                Mark as resolved
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
