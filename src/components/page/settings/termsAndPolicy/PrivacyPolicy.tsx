"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { revalidateTags } from "@/helpers/revalidateHelper";
import useGetSettingData from "@/hooks/useGetSettingData";
import { myFetch } from "@/utils/myFetch";
import dynamic from "next/dynamic";
import { useRef } from "react";
import toast from "react-hot-toast";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const { content, setContent } = useGetSettingData("/cms/privacy-policy");

  const handleUpdate = async () => {
    const termsData = {
      type: "privacy-policy",
      content,
    };
    try {
      toast.loading("Processing", { id: "privacy" });

      const res = await myFetch("/cms", {
        method: "PUT",
        body: termsData,
      });

      if (res?.success) {
        toast.success(res.message || "Created successfully", {
          id: "privacy",
        });
        await revalidateTags(["privacy-policy"]);
      } else {
        toast.error(res?.message || "Failed to create data. Try again.", {
          id: "privacy",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong.", { id: "privacy" });
    }
  };
  return (
    <Card className="p-4 h-full flex flex-col justify-between gap-4 shadow-sm">
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600, theme: "light", readonly: false }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end">
        <Button type="submit" className="px-10" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Card>
  );
};

export default PrivacyPolicy;
