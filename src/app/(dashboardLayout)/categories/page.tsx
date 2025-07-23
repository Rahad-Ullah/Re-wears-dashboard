import CategoriesTabs from "@/components/page/categories/CategoriesTab";
import CategoriesTable from "@/components/page/categories/CategoriesTable";
import ChildSubCategories from "@/components/page/categories/ChildSubCategories";
import SubCategoriesTable from "@/components/page/categories/SubCategoriesTable";
import ColorTable from "@/components/page/settings/MaterialTable";
import TermsAndPolicy from "@/components/page/settings/TermsAndPolicy";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { demoColorsData } from "@/demoData/colors";
import { myFetch } from "@/utils/myFetch";

const CategoriesPage = async ({ searchParams }) => {
  const { tab, nestedTab, searchTerm, page } = await searchParams;

  // // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const categories = await myFetch(`/category?${queryParams}`, {
    tags: ["category"],
    cache: "no-store",
  });
  const categoriesData = categories?.data;

  // sub categories
  const subCategories = await myFetch(
    `/sub-category?${queryParams.toString()}`,
    {
      tags: ["sub-category"],
    }
  );
  const subCategoriesData = subCategories?.data;
  // child sub categories
  const childSubCategoriesRes = await myFetch(
    `/child-sub-category?${queryParams.toString()}`,
    {
      tags: ["child-sub-category"],
    }
  );

  return (
    <Card className="p-5 h-full">
      <Tabs
        defaultValue={"categories"}
        value={tab}
        className="h-full flex flex-col"
      >
        <CategoriesTabs />

        <TabsContent value="categories">
          <CategoriesTable
            items={categoriesData}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="brand">
          <SubCategoriesTable
            items={subCategoriesData}
            categoriesData={categoriesData}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sizes">
          <ChildSubCategories
            items={childSubCategoriesRes?.data}
            meta={childSubCategoriesRes?.pagination}
          />
        </TabsContent>
        <TabsContent value="colors">
          <ColorTable
            items={demoColorsData as never[]}
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

export default CategoriesPage;
