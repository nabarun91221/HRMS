import { TCommonSchema } from '@/modules/core/schema';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

export const usePaginationPayload = <T extends TCommonSchema['PaginationPayload']>(
  defaultFilters?: Partial<T>
) => {
  const [payload, setPayload] = useState<T>({
    ...({ page: 1, limit: 10 } as T),
    ...(defaultFilters as T),
  });

  const [search, setSearch] = useState('');

  const onPageChange = (page: number) => {
    setPayload({
      ...payload,
      page,
    });
  };

  const onPageSizeChange = (limit: number) => {
    setPayload({
      ...payload,
      limit,
    });
  };

  const onPreviousPage = () => {
    setPayload({
      ...payload,
      page: payload.page - 1,
    });
  };

  const onNextPage = () => {
    setPayload({
      ...payload,
      page: payload.page + 1,
    });
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    onSearchChangeDebounced(value);
  };

  const handleFilterChange = useCallback(<K extends keyof T>(key: K, value: T[K] | undefined) => {
    setPayload(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  const { run: onSearchChangeDebounced } = useDebounceFn(
    (value: string) => {
      setPayload(prev => {
        return {
          ...prev,
          page: 1,
          search: value,
        };
      });
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    return () => {
      onSearchChangeDebounced.cancel();
    };
  }, [onSearchChangeDebounced]);

  return {
    payload,
    onPageSizeChange,
    onPreviousPage,
    onNextPage,
    onPageChange,
    onSearchChange,
    search,
    handleFilterChange,
  };
};
