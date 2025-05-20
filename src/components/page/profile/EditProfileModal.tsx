"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { editProfileFormSchema } from "@/schemas/formSchemas/profile/editProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userGenders } from "@/constants/user";
import { myFetch } from "@/utils/myFetch";
import { revalidateTags } from "@/helpers/revalidateHelper";

const EditProfileModal = ({ user }) => {
  const [file, setFile] = useState<File | string | null>(user.image);

  // 2. Define your form.
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: user,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    toast.loading("Updating...", {
      id: "update-profile",
    });

    // convert to form data
    const formData = new FormData();
    if (file) formData.append("file", file);

    // Only append values that are not null or undefined
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      const res = await myFetch("/users/update-profile", {
        method: "PATCH",
        body: formData,
      });
      console.log(res);
      if (res.success) {
        toast.success("Profile updated successfully", {
          id: "update-profile",
        });
        revalidateTags(["user-profile", "users"]);
      } else {
        toast.error("Failed to update profile", {
          id: "update-profile",
        });
      }
    } catch (error) {
      toast.error("Failed to update", {
        id: "update-profile",
      });
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="shadow-lg text-primary">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 lg:w-[80vw] max-h-[95vh] overflow-y-scroll no-scrollbar grid gap-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-primary font-medium text-xl">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Label>Upload Profile Image</Label>
          <ImageUpload setFile={setFile} user={user} />
        </div>
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 lg:space-y-0 lg:grid gap-6"
            >
              {/* First Name Field */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                        value={field.value ?? ""}
                      />
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
                      <Input
                        placeholder="me@example.com"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Field */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your location"
                        {...field}
                        value={field.value ?? ""}
                      />
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
                      defaultValue={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userGenders?.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* birthday Field */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter your birthday"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* submit button */}
              <DialogFooter className="col-span-2">
                <Button type="submit" className="md:px-16">
                  Save & Change
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
