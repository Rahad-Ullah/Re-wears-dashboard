import SupportTable from "@/components/page/support/SupportTable";
import { Card } from "@/components/ui/card";
import { myFetch } from "@/utils/myFetch";
const SupportPage = async ({ searchParams }) => {
  const { priority, status } = await searchParams;

  const queryParams = new URLSearchParams({
    ...(priority && { priority }),
    ...(status && { status }),
  });

  // support overview data
  const res = await myFetch("/supports/overview");
  const supportOverviewData = res?.data || {};

  // supports data get
  const supports = await myFetch(`/supports?${queryParams.toString()}`);
  const supportsData = supports?.data?.data || [];
  console.log(supportsData);

  return (
    <section className="flex flex-col gap-4 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="grid gap-2 p-4 text-center">
          <h1 className="text-xl font-semibold text-stone-700">Open Tickets</h1>
          <h1 className="text-3xl font-bold text-blue-500">
            {supportOverviewData?.totalTickets || 0}
          </h1>
        </Card>
        <Card className="grid gap-2 p-4 text-center">
          <h1 className="text-xl font-semibold text-stone-700">
            Avg. Response Time
          </h1>
          <h1 className="text-3xl font-bold text-purple-600">
            {supportOverviewData?.metrics?.avgResponseTime}
          </h1>
        </Card>
        <Card className="grid gap-2 p-4 text-center">
          <h1 className="text-xl font-semibold text-stone-700">
            Resolution Rate
          </h1>
          <h1 className="text-3xl font-bold text-emerald-500">
            {supportOverviewData?.metrics?.resolutionRate}%
          </h1>
        </Card>
      </div>
      <Card className="p-5 flex-1">
        <SupportTable
          tickets={supportsData || []}
          meta={{ page: 1, totalPage: 1, total: 12 }}
          filters={{ priority, status }}
        />
      </Card>
    </section>
  );
};

export default SupportPage;
