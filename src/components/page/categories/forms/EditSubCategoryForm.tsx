/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { IBrand } from "@/types/brand";
import { myFetch } from "@/utils/myFetch";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditSubCategoryForm({ item }) {
  const [categoryData, setCategoryData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await myFetch("/category", {
        tags: ["category"],
        cache: "no-store",
      });
      setCategoryData(res?.data);
    };
    fetchCategory();
  }, []);

  // update
  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    toast.loading("Processing...", { id: "sub" });
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const fileInput = form.querySelector(
      'input[name="icon"]'
    ) as HTMLInputElement;

    if (!fileInput?.files?.length) {
      formData.delete("icon");
    }
    try {
      const res = await myFetch(`/sub-category/${id}`, {
        method: "PATCH",
        body: formData,
      });

      console.log(res);

      if (res.success) {
        toast.success(res.message || "Edit successfully", { id: "sub" });
        await revalidateTags(["sub-category"]);
        setOpen(false);
      } else {
        toast.error(res.message || "failed edit data", { id: "sub" });
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
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
        onSubmit={(e) => handleUpdate(e, item?._id.toString())}
        className="grid gap-3"
      >
        <h1 className="text-lg font-semibold">Edit Sub Category</h1>
        <Label>Name</Label>
        <Input name="name" placeholder="Enter name" defaultValue={item?.name} />

        <Select name="category" defaultValue={item?.category?._id}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categoryData?.map((item: IBrand, idx: number) => (
                <SelectItem key={idx} value={item?._id}>
                  {item?.name}
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
          // Make image optional, not required
          required={false}
        />

        <Button className="ml-auto px-6">Save</Button>
      </form>
    </Modal>
  );
}
