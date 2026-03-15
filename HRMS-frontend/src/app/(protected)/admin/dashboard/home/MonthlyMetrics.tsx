"use client";
import Dropdown from "@/components/dropdown";
import PageHeader from "@/components/page-header";
import { SectionCards } from "@/components/section-cards";
import { Label } from "@/components/ui/label";
import { MonthOptions, YearOptions } from "@/lib/constants";
import { useGetAdminMonthlyMetrics } from "@/modules/analytics/hooks";
import { useState } from "react";

const currentYear = new Date().getFullYear();
const monthIndex = new Date().getMonth() + 1;

const MonthlyMetrics = () => {
  const [analyticsQueryParams, setAnalyticsQueryParams] = useState({
    month: monthIndex,
    year: currentYear,
  });
  const { data: monthlyMetricsData } =
    useGetAdminMonthlyMetrics(analyticsQueryParams);

  const monthlyMetrics = monthlyMetricsData?.data;

  return (
    <div className="space-y-4">
      <div className="flex justify-between ">
        <PageHeader title="Monthly" />
        <div className="flex gap-2">
          <div className="space-y-2 w-[150px]">
            <Label>Month</Label>
            <Dropdown
              options={MonthOptions}
              value={String(analyticsQueryParams.month)}
              onChange={(value) =>
                setAnalyticsQueryParams((prev) => ({
                  ...prev,
                  month: Number(value),
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Dropdown
              options={YearOptions}
              value={String(analyticsQueryParams.year)}
              onChange={(value) =>
                setAnalyticsQueryParams((prev) => ({
                  ...prev,
                  year: Number(value),
                }))
              }
            />
          </div>
        </div>
      </div>

      <SectionCards
        cards={[
          {
            title: "Absent Days",
            value: monthlyMetrics?.absent ?? 0,
          },
          {
            title: "Half Days",
            value: monthlyMetrics?.halfDay ?? 0,
          },
          {
            title: "Leave Days",
            value: monthlyMetrics?.leave ?? 0,
          },
          {
            title: "Present Days",
            value: monthlyMetrics?.present ?? 0,
          },
          {
            title: "Total Overtime Hours",
            value: Math.round(monthlyMetrics?.totalOvertime ?? 0),
          },
        ]}
      />
    </div>
  );
};

export default MonthlyMetrics;
