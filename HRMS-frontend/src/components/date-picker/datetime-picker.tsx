'use client';

import { CalendarIcon } from 'lucide-react';
import moment, { Moment } from 'moment';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface IDateTimePickerProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder: string;
  startDate?: string;
}

export function DateTimePicker({ value, onChange, placeholder, startDate }: IDateTimePickerProps) {
  const internalDate: Moment | undefined = value ? moment(value) : undefined;

  const parsedStartDate = startDate ? moment(startDate) : undefined;

  const updateDate = (newDate: Moment | undefined) => {
    if (parsedStartDate && newDate?.isBefore(parsedStartDate)) return;

    if (onChange) {
      onChange(newDate && newDate.isValid() ? newDate.toISOString() : null);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      updateDate(undefined);
      return;
    }

    const current = internalDate || moment();
    const updated = moment(date).hour(current.hour()).minute(current.minute());

    if (parsedStartDate && updated.isBefore(parsedStartDate)) {
      updateDate(parsedStartDate.clone());
    } else {
      updateDate(updated);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', val: string) => {
    const current = internalDate || moment();
    const updated = current.clone();

    if (type === 'hour') updated.hour(+val);
    else updated.minute(+val);

    if (parsedStartDate && updated.isBefore(parsedStartDate)) {
      updateDate(parsedStartDate.clone());
    } else {
      updateDate(updated);
    }
  };

  const activeDay = internalDate || parsedStartDate || moment();

  return (
    <div className='space-y-5'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full pl-3 text-left font-normal',
              !internalDate && 'text-muted-foreground'
            )}
          >
            {internalDate ? internalDate.format('MM/DD/YYYY HH:mm') : <span>{placeholder}</span>}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0'>
          <div className='sm:flex'>
            <Calendar
              mode='single'
              selected={internalDate?.toDate()}
              onSelect={handleDateSelect}
              autoFocus
              disabled={date =>
                parsedStartDate ? moment(date).isBefore(parsedStartDate, 'day') : false
              }
            />

            <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
              {/* Hours */}
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {Array.from({ length: 24 }, (_, i) => i)
                    .reverse()
                    .map(hour => {
                      const candidate = activeDay.clone().hour(hour).minute(0);

                      const disabled =
                        parsedStartDate &&
                        candidate.isSame(parsedStartDate, 'day') &&
                        hour < parsedStartDate.hour();

                      return (
                        <Button
                          key={hour}
                          size='icon'
                          variant={internalDate?.hour() === hour ? 'default' : 'ghost'}
                          disabled={disabled}
                          className='sm:w-full shrink-0 aspect-square'
                          onClick={() => handleTimeChange('hour', hour.toString())}
                        >
                          {hour}
                        </Button>
                      );
                    })}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>

              {/* Minutes */}
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {Array.from({ length: 12 }, (_, i) => i * 5).map(minute => {
                    const candidate = activeDay.clone().minute(minute);

                    const disabled =
                      parsedStartDate &&
                      candidate.isSame(parsedStartDate, 'day') &&
                      candidate.isSame(parsedStartDate, 'hour') &&
                      minute < parsedStartDate.minute();

                    return (
                      <Button
                        key={minute}
                        size='icon'
                        variant={internalDate?.minute() === minute ? 'default' : 'ghost'}
                        disabled={disabled}
                        className='sm:w-full shrink-0 aspect-square'
                        onClick={() => handleTimeChange('minute', minute.toString())}
                      >
                        {minute.toString().padStart(2, '0')}
                      </Button>
                    );
                  })}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
