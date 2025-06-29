import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { WEBSITE_URL } from "@/config/env-config";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { CircleCheckBig, Eye, FileSearch } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

export default function StatusUpdate({ item, review, resolved }) {
  const handleStatusUpdate = async (status: string) => {
    toast.loading("Processing...", { id: "status" });

    try {
      const res = await myFetch(`/reports/${item?._id}`, {
        method: "PATCH",
        body: { status },
      });

      if (res?.success) {
        toast.success(res.message || "update status successfully", {
          id: "status",
        });
        await revalidateTags(["reports"]);
      } else {
        toast.error(res.message || "failed update try again ", {
          id: "status",
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
        { id: "status" }
      );
    }
  };
  return (
    <div>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <Link
        href={`${WEBSITE_URL}/product-details/${item?._id}`}
        target="_blank"
      >
        <DropdownMenuItem>
          <Eye /> View product
        </DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => handleStatusUpdate(review)}>
        <FileSearch /> Mark as In Review
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleStatusUpdate(resolved)}>
        <CircleCheckBig /> Mark as Resolved
      </DropdownMenuItem>
    </div>
  );
}
