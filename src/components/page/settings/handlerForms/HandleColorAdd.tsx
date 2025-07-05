/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function HandleColorAdd() {
  const [open, setOpen] = useState(false);
  const handleCreatecolor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const hexCode = formData.get("hexCode");

    try {
      const res = await myFetch(`/color/create`, {
        method: "POST",
        body: { name, hexCode },
      });

      if (res.success) {
        toast.success(res.message || "Create color successfully", {
          id: "color",
        });
        await revalidateTags(["color"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message || "failed create data", { id: "color" });
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
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
        <form onSubmit={handleCreatecolor} className="grid gap-3">
          <h1 className="text-lg font-semibold">Add Color</h1>
          <Label>Name</Label>
          <Input name="name" placeholder="Enter color name" />
          <Label>Color Code</Label>
          <Input name="hexCode" placeholder="Enter color code" />

          <Button type="submit" className="ml-auto px-6">
            Add
          </Button>
        </form>
      </Modal>
    </div>
  );
}
