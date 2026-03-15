'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';

export default function DatePicker({
  value,
  onChange,
  placeholder,
}: {
  value: string | undefined;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? (
            moment(value).format('MMM DD, YYYY')
          ) : (
            <span>{placeholder || 'Pick a date'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={value ? new Date(value) : undefined}
          onSelect={date => onChange?.(date ? moment(date).format('YYYY-MM-DD') : undefined)}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
