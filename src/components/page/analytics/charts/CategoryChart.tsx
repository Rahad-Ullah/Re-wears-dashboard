"use client";

import { myFetch } from "@/utils/myFetch";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type TimeCount = "daily" | "weekly" | "monthly";
type TrendingDataType = {
  categoryId: string;
  categoryName: string;
  soldCount: number;
};

const CategoryChart = () => {
  // Mock data for categories
  const [selectDate, setSelectDate] = useState<TimeCount>("daily");
  const [trendingData, setTrendingData] = useState<TrendingDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myFetch(
          `/dashboard/trending-categorie?period=${selectDate}`
        );
        setTrendingData(response.data);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    fetchData();
  }, [selectDate]);

  return (
    <div className="bg-white p-6 rounded-lg border transition duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Trending Categories
        </h2>
        <div className="relative">
          <select
            onChange={(e) => setSelectDate(e.target.value as TimeCount)}
            value={selectDate}
            className="bg-white border rounded-md pr-8 pl-3 py-1 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
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

      <div className="min-h-[300px] overflow-y-auto">
        <div className="space-y-2">
          {trendingData.map((category, index) => (
            <div key={index} className="px-4 py-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-medium text-gray-800">
                  {category.categoryName}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        category.categoryId ? "bg-primary" : "bg-gray-400"
                      }`}
                      // style={{ width: `${category.soldCount}%` }}
                    ></div>
                  </div>
                </div>
                <div className="min-w-[80px] text-right">
                  <span className="text-sm font-medium text-gray-700">
                    {category.soldCount.toLocaleString()}
                  </span>
                  {/* <span className="text-sm text-gray-500 ml-1">
                    ( {category.soldCount}%)
                  </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Items</span>
          <span className="font-medium">
            {categories
              .reduce((sum, cat) => sum + cat.count, 0)
              .toLocaleString()}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default CategoryChart;
