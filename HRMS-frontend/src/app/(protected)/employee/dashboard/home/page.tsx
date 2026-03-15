'use client';
import Dropdown from '@/components/dropdown';
import Loading from '@/components/Loading';
import PageHeader from '@/components/page-header';
import { SectionCards } from '@/components/section-cards';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MonthOptions, YearOptions } from '@/lib/constants';
import { convertDateStringToReadableFormat } from '@/lib/utils';
import {
  useGetEmployeeAttendanceCalendar,
  useGetEmployeeMonthlyMetrics,
} from '@/modules/analytics/hooks';
import { TAnalyticsSchema } from '@/modules/analytics/schema';
import {
  AttendanceStatusEnumColorMap,
  AttendanceStatusEnumViewMap,
} from '@/modules/attendance/schema';
import { DatesSetArg, EventClickArg, EventSourceInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import moment from 'moment';
import { useState } from 'react';

const currentYear = new Date().getFullYear();
const monthIndex = new Date().getMonth() + 1;

export type CalendarEventType = EventSourceInput & {
  extendedProps: TAnalyticsSchema['EmployeeAttendance'];
};

const Page = () => {
  const [analyticsQueryParams, setAnalyticsQueryParams] = useState({
    month: monthIndex,
    year: currentYear,
  });

  const [eventToView, setEventToView] = useState<TAnalyticsSchema['EmployeeAttendance']>();

  const { data: employeeMonthlyMetricsData, isLoading: IsLoadingEmployeeMonthlyMetrics } =
    useGetEmployeeMonthlyMetrics(analyticsQueryParams);
  const employeeMonthlyMetrics = employeeMonthlyMetricsData?.data;

  const [calendarQueryParams, setCalendarQueryParams] = useState<{
    from: string;
    to: string;
  }>();
  const { data: employeeCalendarData, isLoading: IsLoadingEmployeeCalendar } =
    useGetEmployeeAttendanceCalendar(calendarQueryParams);

  // const [events, setEvents] = useState<CalendarEventType[]>([]);

  const events: CalendarEventType[] = (employeeCalendarData?.data || [])?.map(item => ({
    id: item?._id,
    title: AttendanceStatusEnumViewMap[item?.status],
    start: moment(item?.date).format('YYYY-MM-DD'),
    color: AttendanceStatusEnumColorMap[item?.status],
    extendedProps: item,
  }));

  const onEventClick = (e: EventClickArg) => {
    const event = e.event?.extendedProps as TAnalyticsSchema['EmployeeAttendance'];

    setEventToView(event);
  };

  const onDateChange = (e: DatesSetArg) => {
    const { start, end } = e;

    setCalendarQueryParams({
      from: start.toISOString(),
      to: end.toISOString(),
    });
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between '>
        <PageHeader title='Analytics' />
        <div className='flex gap-2'>
          <div className='space-y-2 w-[150px]'>
            <Label>Month</Label>
            <Dropdown
              options={MonthOptions}
              value={String(analyticsQueryParams.month)}
              onChange={value =>
                setAnalyticsQueryParams(prev => ({ ...prev, month: Number(value) }))
              }
            />
          </div>
          <div className='space-y-2'>
            <Label>Year</Label>
            <Dropdown
              options={YearOptions}
              value={String(analyticsQueryParams.year)}
              onChange={value =>
                setAnalyticsQueryParams(prev => ({ ...prev, year: Number(value) }))
              }
            />
          </div>
        </div>
      </div>
      {IsLoadingEmployeeMonthlyMetrics ? (
        <Loading />
      ) : (
        <>
          {employeeMonthlyMetrics && (
            <SectionCards
              cards={[
                {
                  title: 'Absent Days',
                  value: employeeMonthlyMetrics?.absentDays ?? 0,
                },
                {
                  title: 'Half Days',
                  value: employeeMonthlyMetrics?.halfDays ?? 0,
                },
                {
                  title: 'Leave Days',
                  value: employeeMonthlyMetrics?.leaveDays ?? 0,
                },
                {
                  title: 'Present Days',
                  value: employeeMonthlyMetrics?.presentDays ?? 0,
                },
                {
                  title: 'Total Overtime Hours',
                  value: employeeMonthlyMetrics?.totalOvertimeHours ?? 0,
                },
                {
                  title: 'Total Working Hours',
                  value: Math.round(employeeMonthlyMetrics?.totalWorkingHours) ?? 0,
                },
              ]}
            />
          )}
        </>
      )}

      <Card>
        <CardContent>
          <FullCalendar
            events={events}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            eventClick={onEventClick}
            datesSet={onDateChange}
          />
        </CardContent>
      </Card>

      <Dialog open={!!eventToView} onOpenChange={() => setEventToView(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {eventToView?.date && convertDateStringToReadableFormat(eventToView?.date)}
            </DialogTitle>
            <div>
              {eventToView?.status && (
                <div>Status: {AttendanceStatusEnumViewMap[eventToView?.status]}</div>
              )}
              {eventToView?.clockIn && (
                <div>
                  Clocked In: {convertDateStringToReadableFormat(eventToView?.clockIn, true)}
                </div>
              )}

              {eventToView?.clockOut && (
                <div>
                  Clocked Out: {convertDateStringToReadableFormat(eventToView?.clockOut, true)}
                </div>
              )}

              {eventToView?.totalWorkingHours && (
                <div>Total Working Hours: {Math.round(eventToView?.totalWorkingHours)}</div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
