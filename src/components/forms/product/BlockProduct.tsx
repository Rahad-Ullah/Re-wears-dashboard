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
import { Textarea } from "@/components/ui/textarea";
import { blockProductFormSchema } from "@/schemas/formSchemas/product/blockProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const BlockProductForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof blockProductFormSchema>>({
    resolver: zodResolver(blockProductFormSchema),
    // defaultValues: { ...product },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof blockProductFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="Write message..." {...field} />
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

export default BlockProductForm;
