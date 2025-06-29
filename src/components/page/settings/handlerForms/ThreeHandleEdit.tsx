import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ThreeHandleEdit({ item, type }) {
  const [open, setOpen] = useState(false);

  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");

    // update api

    try {
      const res = await myFetch(`${type}/${id}`, {
        method: "PATCH",
        body: { name },
      });

      if (res.success) {
        toast.success(res.message || "Edit successfully", { id: "edit-user" });
        await revalidateTags(["material"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message || "failed edit data", { id: "edit-user" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        dialogTrigger={
          <Button variant={"ghost"} size={"icon"} className="text-primary">
            <Pencil />
          </Button>
        }
        className="max-w-lg"
      >
        <form
          onSubmit={(e) => handleEdit(e, item?._id.toString())}
          className="grid gap-3"
        >
          <h1 className="text-lg font-semibold">Edit Color</h1>
          <Label>Name</Label>
          <Input
            name="name"
            placeholder="Enter name"
            defaultValue={item?.name}
          />
          <Button type="submit" className="ml-auto px-6">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}
