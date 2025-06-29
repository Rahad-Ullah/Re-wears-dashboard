import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EditChildCategory({ item }) {
  const [open, setOpen] = useState(false);

  const handleChildUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    console.log(id);
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");

    toast.loading("Processing...", { id: "update-child" });

    try {
      const res = await myFetch(`/child-sub-category/${id}`, {
        method: "PATCH",
        body: { name },
      });

      if (res.success) {
        revalidateTags(["child-sub-category"]);
        toast.success(res.message || "Update successfully", {
          id: "update-child",
        });
      } else {
        toast.error(res.message || "Something went wrong", {
          id: "update-child",
        });
      }
    } catch (error) {
      console.error(error);
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
          onSubmit={(e) => handleChildUpdate(e, item?._id?.toString())}
          className="grid gap-3"
        >
          <h1 className="text-lg font-semibold">Edit Child</h1>
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
