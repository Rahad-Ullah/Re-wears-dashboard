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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTestFormContext } from "@/contexts/testFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import TagInput from "@/components/shared/tag-input";

const Step1 = ({ nextStep }) => {
  const formContext = useTestFormContext();

  // get the form data from from context
  const { formData, setFormData } = formContext;

  // 1. Define your form schema.
  const formSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(1, "Address is required"),
    gender: z.enum(["Male", "Female"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    reasonsForVisit: z.array(z.string()),
    sensorySymptoms: z.array(z.string()),
  });

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values);
    nextStep();
    formData;
  }

  return (
    <div className="grid gap-8">
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 lg:space-y-0 lg:grid gap-6"
          >
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Road City State " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Select a date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reasons for Visit Input */}
            <FormField
              control={form.control}
              name="reasonsForVisit" // The name of the form field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason(s) for visit</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Type and press Enter to add"
                      value={field.value} // Pass the value from form field
                      onChange={field.onChange} // Pass onChange to update the form state
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sensory Symptoms Input */}
            <FormField
              control={form.control}
              name="sensorySymptoms" // The name of the form field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sensory Symptoms</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Type and press Enter to add"
                      value={field.value} // Pass the value from form field
                      onChange={field.onChange} // Pass onChange to update the form state
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* submit button */}
            <div className="col-span-2 flex justify-end gap-4">
              <Button type="submit" className="md:px-6">
                Next <ChevronRight />
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default Step1;
