import { usePaginationPayload } from '@/hooks/use-pagination-payload';
import { TCommonSchema } from '@/modules/core/schema';
import { Icon } from '@iconify-icon/react';

import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Spinner } from '../ui/spinner';

type componentProps = {
  value: string;
  onChange: (icon: string) => void;
  clear: () => void;
};

const useGetIcons = (payload: TCommonSchema['PaginationPayload']) => {
  return useQuery<{
    icons: string[];
  }>({
    queryKey: ['getIcons', JSON.stringify(payload)],
    queryFn: async () => {
      const response = await fetch(
        `https://api.iconify.design/search?query=${encodeURIComponent(payload?.search ?? '')}&limit=100`
      );
      return response.json();
    },
    enabled: !!payload?.search?.length,
  });
};

const IconSelector = ({ value, onChange, clear }: componentProps) => {
  const [open, setOpen] = useState(false);
  const { payload, onSearchChange, search } = usePaginationPayload();

  const { data, isFetching } = useGetIcons(payload);

  const icons = data?.icons?.map(icon => {
    return {
      label: <Icon icon={icon} className='text-2xl' noobserver />,
      value: icon,
    };
  });

  return (
    <div className='space-y-2'>
      <div className='flex gap-2 mx-w-full items-center'>
        <Popover modal open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='flex  items-center w-fit h-10'
            >
              <div className='w-full flex items-center text-left'>
                {value ? (
                  <Icon icon={value} className='text-xl' />
                ) : (
                  <span className='opacity-50'>Select Icon</span>
                )}
              </div>

              <div className='h-5 gap-2 flex items-center'>
                <Icon icon={'lucide:chevron-down'} />
                {value && (
                  <Icon
                    onClick={e => {
                      e.stopPropagation();
                      clear?.();
                    }}
                    icon='lucide:x'
                    className='h-4 w-4 text-red-500 cursor-pointer'
                  />
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='w-[500px] p-0'>
            <div className=''>
              <div className='flex h-9 items-center gap-2 border-b px-3'>
                <Icon icon='mdi:search' className='size-4 shrink-0 opacity-50' />
                <input
                  type='text'
                  value={search}
                  onChange={e => onSearchChange?.(e?.target?.value)}
                  className='placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
                />
              </div>

              <div className='max-h-56 overflow-auto p-4'>
                <div>
                  {isFetching && (
                    <div className='flex items-center justify-center p-2'>
                      <Spinner />
                      <span className='ml-2 text-sm text-muted-foreground'>Loading...</span>
                    </div>
                  )}

                  {!!payload?.search?.length && !icons?.length && !isFetching && (
                    <div className='flex items-center justify-center p-2'>
                      <span className='ml-2 text-sm text-muted-foreground'>No result found</span>
                    </div>
                  )}

                  {!payload?.search?.length && (
                    <div className='flex items-center justify-center p-2'>
                      <span className='ml-2 text-sm text-muted-foreground'>
                        Start typing to search for icons...
                      </span>
                    </div>
                  )}
                </div>
                <div className='flex flex-wrap '>
                  {icons?.map(option => (
                    <div
                      className='m-1 cursor-pointer'
                      key={option?.value}
                      onClick={() => {
                        onChange(option?.value);
                        setOpen(false);
                      }}
                    >
                      {option?.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default IconSelector;
