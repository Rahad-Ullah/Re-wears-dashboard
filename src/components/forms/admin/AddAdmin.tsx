"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { addAdminFormSchema } from "@/schemas/formSchemas/admin/addAdminForm";
import { myFetch } from "@/utils/myFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AddAdminForm = ({ setOpen }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addAdminFormSchema>>({
    resolver: zodResolver(addAdminFormSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addAdminFormSchema>) {
    const data = { ...values, role: "ADMIN" };

    try {
      const res = await myFetch("/users/create-admin", {
        method: "POST",
        body: data,
      });
      if (res?.success) {
        toast.success("admin create successfully");
        await revalidateTags(["Admins"]);
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message || "admin create failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddAdminForm;
