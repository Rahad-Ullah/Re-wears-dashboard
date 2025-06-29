// "use client";

import { Button } from "@/components/ui/button";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";

export default function UpdateStatus({ item }) {
  console.log(item);
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
  );
}
