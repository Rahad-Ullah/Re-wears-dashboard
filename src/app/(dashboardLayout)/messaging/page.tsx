import NotificationTable from "@/components/page/messaging/NotificationTable";
import TemplateTable from "@/components/page/messaging/TemplateTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { myFetch } from "@/utils/myFetch";
import { Bell, LayoutPanelTop } from "lucide-react";

const MessagingPage = async ({ searchParams }) => {
  const { userType, status, category } = await searchParams;

  const queryParams = new URLSearchParams({
    ...(userType && { userType }),
    ...(status && { status }),
    ...(category && { category }),
  });

  const users = await myFetch(`/order/users?${queryParams.toString()}`);
  console.log(users.data);
  const usersData = users?.data;
  // console.log(usersData);

  //notification templetes
  const templates = await myFetch(`/templates?${queryParams.toString()}`, {
    tags: ["Templates"],
  });
  const templateGetData = templates?.data?.data;

  // filter users

  return (
    <Card className="p-5 h-full">
      <Tabs defaultValue={"notifications"}>
        <TabsList className="border-b w-full justify-start p-0 mb-4 rounded-none">
          <TabsTrigger value="notifications" className="px-8 w-fit">
            <Bell /> Notification Management
          </TabsTrigger>
          <TabsTrigger value="templates" className="px-8 w-fit">
            <LayoutPanelTop /> Notification Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <NotificationTable
            users={usersData as never[]}
            filters={{}}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="templates">
          <TemplateTable
            items={templateGetData}
            filters={{ status, category }}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MessagingPage;
