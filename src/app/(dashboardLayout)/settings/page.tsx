import TemplateTable from "@/components/page/messaging/TemplateTable";
import BrandTable from "@/components/page/settings/BrandTable";
import CategoryTable from "@/components/page/settings/CategoryTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoBrandsData } from "@/demoData/brands";
import { demoCategoriesData } from "@/demoData/categories";
import { demoTemplateData } from "@/demoData/notification";
import { Expand, Gem, Palette, Tag } from "lucide-react";

const SettingPage = async ({ searchParams }) => {
  const { status, category } = await searchParams;

  return (
    <Card className="p-5 h-full">
      <Tabs defaultValue={"categories"}>
        <TabsList className="border-b w-full justify-start p-0 mb-4 rounded-none">
          <TabsTrigger value="categories" className="px-8 w-fit">
            <Tag /> Categories Management
          </TabsTrigger>
          <TabsTrigger value="brand" className="px-8 w-fit">
            <Gem /> Brand Management
          </TabsTrigger>
          <TabsTrigger value="sizes" className="px-8 w-fit">
            <Expand /> Sizes Management
          </TabsTrigger>
          <TabsTrigger value="colors" className="px-8 w-fit">
            <Palette /> Colors Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CategoryTable
            items={demoCategoriesData as never[]}
            filters={{}}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="brand">
          <BrandTable
            items={demoBrandsData as never[]}
            filters={{ status, category }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sizes">
          <TemplateTable
            items={demoTemplateData as never[]}
            filters={{ status, category }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="colors">
          <TemplateTable
            items={demoTemplateData as never[]}
            filters={{ status, category }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SettingPage;
