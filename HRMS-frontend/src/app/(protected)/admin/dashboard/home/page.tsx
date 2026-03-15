'use client';
import EmployeeRanking from './EmployeeRanking';
import MonthlyMetrics from './MonthlyMetrics';
import TodayMetrics from './TodayMetrics';

const Page = () => {
  return (
    <div className='space-y-6'>
      <TodayMetrics />
      <MonthlyMetrics />
      <EmployeeRanking />
    </div>
  );
};

export default Page;
