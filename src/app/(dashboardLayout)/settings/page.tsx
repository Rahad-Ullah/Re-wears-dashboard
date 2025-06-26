import BrandTable from "@/components/page/settings/BrandTable";
import ColorTable from "@/components/page/settings/ColorsTable";
import MaterialTable from "@/components/page/settings/MaterialTable";
// import ColorTable from "@/components/page/settings/MaterialTable";
import SettingTabs from "@/components/page/settings/SettingTabs";
import SizeTable from "@/components/page/settings/SizeTable";
import TermsAndPolicy from "@/components/page/settings/TermsAndPolicy";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { myFetch } from "@/utils/myFetch";

const SettingPage = async ({ searchParams }) => {
  const { tab, nestedTab, status } = await searchParams;

  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(searchTerm && { searchTerm }),
  // });

  // Fetch data from the backend when backend is ready
  const brandData = await myFetch(`/type/list/brand`, {
    tags: ["brand"],
  });

  const sizeData = await myFetch(`/type/list/size`, {
    tags: ["size"],
  });
  const materialData = await myFetch(`/type/list/material`, {
    tags: ["material"],
  });

  const colorData = await myFetch("/color", {
    tags: ["color"],
  });

  return (
    <Card className="p-5 h-full">
      <Tabs defaultValue={"brand"} value={tab} className="h-full flex flex-col">
        <SettingTabs />
        <TabsContent value="brand">
          <BrandTable
            items={brandData?.data}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sizes">
          <SizeTable
            items={sizeData?.data}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="material">
          <MaterialTable
            items={materialData?.data}
            filters={{ status }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="colors">
          <ColorTable
            items={colorData?.data}
            filters={{ status }}
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
