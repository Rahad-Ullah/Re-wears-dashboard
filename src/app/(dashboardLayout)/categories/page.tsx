import CategoriesTabs from "@/components/page/categories/CategoriesTab";
import CategoriesTable from "@/components/page/categories/CategoriesTable";
import ChildSubCategories from "@/components/page/categories/ChildSubCategories";
import SubCategoriesTable from "@/components/page/categories/SubCategoriesTable";
import ColorTable from "@/components/page/settings/ColorTable";
import TermsAndPolicy from "@/components/page/settings/TermsAndPolicy";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { demoColorsData } from "@/demoData/colors";
import { myFetch } from "@/utils/myFetch";

const CategoriesPage = async ({ searchParams }) => {
  const { tab, nestedTab, status, category } = await searchParams;

  // // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(searchTerm && { searchTerm }),
  // });

  const categories = await myFetch("/category", {
    tags: ["category"],
  });
  const categoriesData = categories?.data;

  // sub categories
  const subCategories = await myFetch("/sub-category", {
    tags: ["sub-category"],
  });
  const subCategoriesData = subCategories?.data;
  // child sub categories
  const childSubCategories = await myFetch("/child-sub-category", {
    tags: ["child-sub-category"],
  });
  const childSubCategoriesData = childSubCategories?.data;

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
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="sizes">
          <ChildSubCategories
            items={childSubCategoriesData}
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

export default CategoriesPage;
