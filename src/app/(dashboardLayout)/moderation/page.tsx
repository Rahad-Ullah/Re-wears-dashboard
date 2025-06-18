import ReportedMessageTable from "@/components/page/moderation/ReportedMessageTable";
import ReportedProductTable from "@/components/page/moderation/ReportedProductTable";
import ReportedUserTable from "@/components/page/moderation/ReportedUserTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { myFetch } from "@/utils/myFetch";
import { CircleAlert, MessageCircleWarning, UserX } from "lucide-react";
import Link from "next/link";

const ModerationPage = async ({ searchParams }) => {
  const { status, page, type } = await searchParams;

  const queryParams = new URLSearchParams({
    ...(status && { status }),
    ...(page && { page }),
    ...(type && { type }),
  });

  const res = await myFetch(`/reports?${queryParams.toString()}`);
  const reportsData = res.data.data;
  // (reportsData);
  const reportedProducts = reportsData.filter(
    (item) => item.type === "Product"
  );
  const reportedUsers = reportsData.filter((item) => item.type === "User");
  const reportedMessages = reportsData.filter(
    (item) => item.type === "Message"
  );

  return (
    <Card className="p-5 h-full">
      <Tabs defaultValue={"products"}>
        <TabsList className="border-b w-full justify-start p-0 mb-4 rounded-none">
          <Link href="/moderation?type=Product">
            <TabsTrigger value="products" className="px-8 w-fit">
              <CircleAlert /> Reported Products
            </TabsTrigger>
          </Link>
          <Link href="/moderation?type=User">
            <TabsTrigger value="users" className="px-8 w-fit">
              <UserX /> Reported Users
            </TabsTrigger>
          </Link>

          <Link href="/moderation?type=Message">
            <TabsTrigger value="messages" className="px-8 w-fit">
              <MessageCircleWarning /> Reported Messages
            </TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value="products">
          <ReportedProductTable
            items={reportedProducts as never[]}
            filters={{}}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="users">
          <ReportedUserTable
            items={reportedUsers as never[]}
            filters={{}}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
        <TabsContent value="messages">
          <ReportedMessageTable
            items={reportedMessages as never[]}
            filters={{}}
            meta={{ page: 1, totalPage: 1, total: 1 }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ModerationPage;
