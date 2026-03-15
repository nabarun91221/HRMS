'use client';

import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import moment from 'moment';
import { useEffect, useEffectEvent, useState } from 'react';

export type TDateRangeValue = {
  from: string; // yyyy-MM-dd
  to: string; // yyyy-MM-dd
};

export function DateRangePicker({
  value,
  onChange,
  clear,
  startDate,
  endDate,
}: {
  value?: {
    from: string;
    to: string;
  };
  startDate?: string;
  endDate?: string;
  onChange: (value?: TDateRangeValue) => void;
  clear: () => void;
}) {
  const parseDate = (dateStr: string): Date | undefined => {
    const parsed = moment(dateStr, 'YYYY-MM-DD', true);
    return parsed.isValid() ? parsed.toDate() : undefined;
  };

  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    value
      ? {
          from: parseDate(value.from),
          to: parseDate(value.to),
        }
      : undefined
  );

  const formatDate = (d: Date) => moment(d).format('YYYY-MM-DD');

  const [isOpen, setIsOpen] = useState(false);

  const setSelectedDateEvent = useEffectEvent((date?: TDateRangeValue) => {
    if (date) {
      setSelectedDate({
        from: parseDate(date.from),
        to: parseDate(date.to),
      });
    } else {
      setSelectedDate(undefined);
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (value && value.from && value.to) {
        setSelectedDateEvent(value);
      }
    } else {
      setSelectedDateEvent(undefined);
    }
  }, [isOpen]);

  const handleSelect = (date: DateRange | undefined) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (selectedDate && selectedDate.from && selectedDate.to) {
      onChange({
        from: formatDate(selectedDate.from),
        to: formatDate(selectedDate.to),
      });
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className={cn('grid gap-2')}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button id='date' variant={'outline'} className={'w-full justify-start'}>
            <Icon icon='lucide:calendar' className={`mr-2 ${!value ? 'opacity-50' : ''}`} />
            {value && value?.from && value.to ? (
              <>
                {moment(value.from).format('MMM DD, YYYY')} -{' '}
                {moment(value.to).format('MMM DD, YYYY')}
              </>
            ) : (
              <span className='opacity-50'>Pick Date Range</span>
            )}
            {value && (
              <Icon
                onClick={e => {
                  e.stopPropagation();
                  clear();
                }}
                icon='lucide:x'
                className='h-4 w-4 text-red-500 cursor-pointer'
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(() => {
              if (startDate && endDate)
                return {
                  before: moment(startDate, 'YYYY-MM-DD').toDate(),
                  after: moment(endDate, 'YYYY-MM-DD').toDate(),
                };
              else if (startDate)
                return {
                  before: moment(startDate, 'YYYY-MM-DD').toDate(),
                };
              else if (endDate)
                return {
                  after: moment(endDate, 'YYYY-MM-DD').toDate(),
                };
            })()}
          />
          <div className='p-2 border-t border-border flex justify-end'>
            <Button size='sm' onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
