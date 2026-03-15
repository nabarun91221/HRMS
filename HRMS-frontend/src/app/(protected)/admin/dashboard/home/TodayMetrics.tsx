"use client";
import PageHeader from "@/components/page-header";
import { SectionCards } from "@/components/section-cards";
import { useGetAdminTodayMetrics } from "@/modules/analytics/hooks";

const TodayMetrics = () => {
  const { data: todayMetricsData, isLoading: isLoadingAdminTodayMetrics } =
    useGetAdminTodayMetrics();

  const todayMetrics = todayMetricsData?.data;

  return (
    <div className="space-y-4">
      <PageHeader title="Today" />

      <SectionCards
        cards={[
          {
            title: "Absent Days",
            value: todayMetrics?.absent ?? 0,
          },
          {
            title: "Half Days",
            value: todayMetrics?.halfDay ?? 0,
          },
          {
            title: "Leave Days",
            value: todayMetrics?.leave ?? 0,
          },
          {
            title: "Present Days",
            value: todayMetrics?.present ?? 0,
          },
          {
            title: "Total Overtime Hours",
            value: Math.round(todayMetrics?.totalOvertime ?? 0),
          },
        ]}
      />
    </div>
  );
};

export default TodayMetrics;
