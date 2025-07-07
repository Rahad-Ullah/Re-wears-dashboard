"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { Expand, Gem, Tag } from "lucide-react";

const CategoriesTabs = () => {
  const updateMultipleSearchParams = useUpdateMultiSearchParams();

  return (
    <TabsList className="w-full justify-start p-0 mb-4 border-b rounded-none gap-4">
      <TabsTrigger
        value="categories"
        className="px-4 w-fit"
        onClick={() => updateMultipleSearchParams({ tab: "categories" })}
      >
        <Tag /> Categories
      </TabsTrigger>
      <TabsTrigger
        value="brand"
        className="px-4 w-fit"
        onClick={() => updateMultipleSearchParams({ tab: "brand" })}
      >
        <Gem /> Sub Categories
      </TabsTrigger>
      <TabsTrigger
        value="sizes"
        className="px-4 w-fit"
        onClick={() => updateMultipleSearchParams({ tab: "sizes" })}
      >
        <Expand /> Child Sub Categories
      </TabsTrigger>
    </TabsList>
  );
};

export default CategoriesTabs;
