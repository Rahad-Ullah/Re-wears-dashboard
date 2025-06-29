"use client";

import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";
import Modal from "../modals/Modal";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { templateCategory } from "@/constants/notification";
import { Label } from "../ui/label";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";

export default function TemplateEditModal({ item }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(item.category || "");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const updateTemplate = {
      name: data.get("name"),
      category: selectedCategory,
      message: data.get("message"),
    };

    console.log(updateTemplate);

    try {
      const res = await myFetch(`/templates/${item?._id}`, {
        method: "PATCH",
        body: updateTemplate,
      });

      if (res?.message) {
        toast.success("Template updated successfully");
        await revalidateTags(["Templates"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message || "Failed to update template");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      dialogTrigger={
        <Button variant={"ghost"} size={"icon"}>
          <Pencil />
        </Button>
      }
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="grid gap-3">
        <h1 className="text-lg font-semibold">Update Template</h1>

        <Label>Name</Label>
        <Input name="name" placeholder="Enter name" defaultValue={item?.name} />

        <Label>Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {templateCategory?.map((cat, idx) => (
              <SelectItem key={idx} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Message</Label>
        <Textarea
          name="message"
          rows={4}
          placeholder="Write message..."
          defaultValue={item?.message}
        />

        <div className="flex items-center gap-4 justify-end">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Modal>
  );
}
