'use client';

import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { ChevronDown, Loader2 } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Checkbox } from './checkbox';

import { Badge } from './badge';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  value: Option[];
  onChange: (value: Option[]) => void;
  options: Option[];
  loading?: boolean;
  titleTooltip?: string;
  onLoadMore?: () => void;
  disabled?: boolean;
  placeholder?: string;
  singleSelect?: boolean;
  prefix?: string;
  truncateView?: boolean;
  search: string;
  popoverWidth?: number;
  onSearchChange: (value: string) => void;
  clear?: () => void;
}

export function MultiSelect({
  value,
  onChange,
  options,
  loading = false,
  onLoadMore,
  placeholder = 'Select',
  truncateView = true,
  singleSelect = false,
  disabled = false,
  popoverWidth = 250,
  prefix,
  onSearchChange,
  search,
  titleTooltip,
  clear,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || !onLoadMore) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      onLoadMore();
    }
  };

  const toggleValue = (val: Option) => {
    if (singleSelect) {
      onChange([val]);
      setOpen(false);
    } else if (value?.find(v => v?.value === val?.value)) {
      onChange(value?.filter(v => v?.value !== val?.value));
    } else {
      onChange([...(value || []), val]);
    }
  };

  return (
    <div className='flex gap-2 mx-w-full items-center'>
      <Popover modal open={open} onOpenChange={setOpen}>
        <div title={titleTooltip} className='w-full'>
          <PopoverTrigger disabled={disabled} asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-full flex items-start max-w-full h-fit'
            >
              {value?.length > 0 && prefix ? `${prefix}: ` : ''}

              <div className='w-full text-left'>
                {value?.length > 0 ? (
                  singleSelect ? (
                    <span className='truncate max-w-40'>{value[0]?.label}</span>
                  ) : (
                    <div className='flex flex-wrap gap-1'>
                      {(truncateView ? value?.slice(0, 2) : value)?.map(v => {
                        return (
                          <div key={v?.value}>
                            <Badge>
                              <span className='truncate max-w-40'>{v?.label}</span>
                            </Badge>
                          </div>
                        );
                      })}
                      {truncateView && value?.length > 2 && (
                        <Badge variant='outline' className='text-xs'>
                          +{value?.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )
                ) : (
                  <span className='opacity-50'>{placeholder}</span>
                )}
              </div>

              <div className='h-5 gap-2 flex items-center'>
                <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                {value?.length > 0 && (
                  <Icon
                    onClick={e => {
                      e?.stopPropagation();
                      clear?.();
                    }}
                    icon='lucide:x'
                    className='h-4 w-4 text-red-500 cursor-pointer'
                  />
                )}
              </div>
            </Button>
          </PopoverTrigger>
        </div>

        <PopoverContent align='start' className='p-0 z-99999' style={{ width: popoverWidth }}>
          {/* Search */}
          <div className='flex h-9 items-center gap-2 border-b px-3'>
            <Icon icon='mdi:search' className='size-4 shrink-0 opacity-50' />
            <input
              type='text'
              value={search}
              onChange={e => {
                listRef.current?.scrollTo(0, 0);
                onSearchChange(e?.target?.value);
              }}
              placeholder='Search...'
              className='placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none'
            />
          </div>

          {/* Options List */}
          <ScrollArea
            className='max-h-56 overflow-auto'
            ref={listRef}
            onScrollCapture={handleScroll}
          >
            <div className='flex flex-col'>
              {options?.length === 0 && !loading && (
                <div className='p-3 text-sm text-muted-foreground'>No results found.</div>
              )}

              {options?.map(option => (
                <div
                  key={option?.value}
                  onClick={() => toggleValue(option)}
                  className='flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-accent'
                >
                  <Checkbox checked={value?.some(v => v?.value === option?.value)} />
                  <span>{option?.label}</span>
                </div>
              ))}

              {loading && (
                <div className='flex items-center justify-center p-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span className='ml-2 text-sm text-muted-foreground'>Loading...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
