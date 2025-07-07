import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function MessageSendModal({ item }) {
  const [open, setOpen] = useState(false);
  const handleSendNotifications = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const text = formData.get("message")?.toString().trim();

    const message = {
      receiver: id,
      text,
      type: "ADMIN",
    };

    const res = await myFetch(`/notification/create-admin-notification`, {
      method: "POST",
      body: message,
    });

    try {
      if (res?.success) {
        toast.success("Send message successfully");
        await revalidateTags(["message"]);
        setOpen(false);
        form.reset();
      } else {
        toast.error(res?.message || "failed message try again");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(res?.data?.message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        dialogTrigger={
          <Button size={"sm"} className="text-sm">
            Send
          </Button>
        }
        className="max-w-lg"
      >
        <form
          onSubmit={(e) => handleSendNotifications(e, item?._id)}
          className="grid gap-3"
        >
          <h1 className="text-lg font-semibold">Send Notification</h1>
          <Textarea
            name="message"
            rows={4}
            placeholder="Write here..."
            required
          />
          <Button type="submit" className="ml-auto px-6">
            Send
          </Button>
        </form>
      </Modal>
    </div>
  );
}
