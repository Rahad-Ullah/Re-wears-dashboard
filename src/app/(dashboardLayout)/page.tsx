import ActiveUsersCard from "@/components/page/analytics/cards/ActiveUserCard";
import StatCard from "@/components/page/analytics/cards/StatCard";
import CategoryChart from "@/components/page/analytics/charts/CategoryChart";
import SalesVolumeChart from "@/components/page/analytics/charts/SalesVolumeChart";
import UserGrowthChart from "@/components/page/analytics/charts/UserGrowthChart";
import { Card } from "@/components/ui/card";
import { myFetch } from "@/utils/myFetch";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const AnalyticsPage = async () => {
  const getData = await myFetch("/dashboard/statestic");
  const cardData = getData?.data;
  return (
    <Card className="h-full p-5 animate-fadeIn flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={cardData?.totalUser || 0}
          isPositive={true}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={cardData?.activeUser || 0}
          isPositive={true}
          icon={<TrendingUp className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Total Products"
          value={cardData?.totalProduct || 0}
          isPositive={true}
          icon={<ShoppingCart className="h-6 w-6" />}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={cardData?.totalRevenue || 0}
          isPositive={true}
          icon={<DollarSign className="h-6 w-6" />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowthChart />
        <ActiveUsersCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <SalesVolumeChart />
      </div>

      {/* <div className="grid grid-cols-1 gap-6">
        <ReportsCard />
      </div> */}
    </Card>
  );
};

export default AnalyticsPage;
