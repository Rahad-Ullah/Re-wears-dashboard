"use client";

import { myFetch } from "@/utils/myFetch";
import { useEffect, useState } from "react";

export default function useGetSettingData(url: string) {
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchTerms = async () => {
      const res = await myFetch(url, {
        tags: ["terms-conditions"],
      });

      if (res?.data?.content) {
        setContent(res.data.content);
      }
    };
    fetchTerms();
  }, [url]);

  return { content, setContent };
}
