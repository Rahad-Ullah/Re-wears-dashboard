"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { myFetch } from "@/utils/myFetch";

type DateSelect = "daily" | "weekly" | "monthly";

type TrendingDataType = {
  totalUser: number;
  category: number | string;
  listedItems: number;
  soldItems: number;
  activeUserObject?: {
    activeUser?: number;
    activeUserPercentage?: number;
  };
};

const ActiveUsersCard: React.FC = () => {
  const [selectDate, setSelectDate] = useState<DateSelect>("daily");
  const [trendingData, setTrendingData] = useState<TrendingDataType | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myFetch(
          `/dashboard/activitys?period=${selectDate}`
        );

        setTrendingData(response.data);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    fetchData();
  }, [selectDate]);

  const activePercentage =
    trendingData?.activeUserObject?.activeUserPercentage ?? 0;

  return (
    <div className="bg-white p-6 rounded-lg border transition duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Active Users</h2>
        <div className="relative">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value as DateSelect)}
            className="bg-white border rounded-md pr-8 pl-3 py-1 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="text-3xl font-bold text-gray-900">
          {trendingData?.totalUser ?? 0}
        </div>
      </div>

      <div className="space-y-4">
        {/* Logged In Users */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Logged In</span>
            <span className="font-medium">
              {trendingData?.activeUserObject?.activeUser ?? 0} (
              {activePercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${activePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Listed Items */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Listed Items</span>
            <span className="font-medium">
              {trendingData?.listedItems ?? 0}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full"></div>
          </div>
        </div>

        {/* Sold Items */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sold Items</span>
            <span className="font-medium">{trendingData?.soldItems ?? 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full"></div>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Category Items</span>
            <span className="font-medium">{trendingData?.category}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsersCard;
