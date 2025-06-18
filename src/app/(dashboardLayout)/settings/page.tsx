import BrandTable from "@/components/page/settings/BrandTable";
import CategoryTable from "@/components/page/settings/CategoryTable";
import ColorTable from "@/components/page/settings/ColorTable";
import SettingTabs from "@/components/page/settings/SettingTabs";
import SizeTable from "@/components/page/settings/SizeTable";
import TermsAndPolicy from "@/components/page/settings/TermsAndPolicy";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { demoBrandsData } from "@/demoData/brands";
import { demoCategoriesData } from "@/demoData/categories";
import { demoColorsData } from "@/demoData/colors";
import { demoSizesData } from "@/demoData/sizes";
import { myFetch } from "@/utils/myFetch";

const SettingPage = async ({ searchParams }) => {
  const { tab, nestedTab, searchTerm, status, category } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(searchTerm && { searchTerm }),
  });

  // Fetch data from the backend when backend is ready
  const categoryResponse = await myFetch(
    `/category?${queryParams.toString()}`,
    {
      tags: ["categories"],
    }
  );
  categoryResponse?.data;

  return (
    <Card className="p-5 h-full">
      <Tabs
        defaultValue={"categories"}
        value={tab}
        className="h-full flex flex-col"
      >
        <SettingTabs />

        <TabsContent value="categories">
          <CategoryTable
            items={demoCategoriesData as never[]}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="brand">
          <BrandTable
            items={demoBrandsData as never[]}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sizes">
          <SizeTable
            items={demoSizesData as never[]}
            filters={{ status, category }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="colors">
          <ColorTable
            items={demoColorsData as never[]}
            filters={{ status, category }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="terms-and-policy">
          <TermsAndPolicy searchParams={{ nestedTab }} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SettingPage;
