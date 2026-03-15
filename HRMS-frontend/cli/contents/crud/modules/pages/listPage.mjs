export const page = ({ camelCaseName, pascalCaseName, normalCaseName, kebabCaseName }) => {
  return `
'use client';

import ConfirmModal, { ConfirmActionsType } from '@/components/ConfirmDialog';
import NextImageWithFallback from '@/components/NextImageWithFallback';
import PageHeader from '@/components/page-header';
import TableStatusFilter from '@/components/tanstack-table/filters/table-status-filter';
import { TanstackDataTable } from '@/components/tanstack-table/tanstack-table';
import TanstackTableHeader from '@/components/tanstack-table/tanstack-table-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { usePaginationPayload } from '@/hooks/use-pagination-payload';
import { ROUTES } from '@/lib/routes';
import { mediaUrl2 } from '@/lib/utils';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { use${pascalCaseName}StatusChange, useDelete${pascalCaseName}, useGetAll${pascalCaseName} } from '../hooks';
import { T${pascalCaseName}Schema } from '../schema';
import {StatusEnum, StatusStyles } from '@/modules/core/constants';

export default function ${pascalCaseName}ListPage() {
  const {
    payload,
    onNextPage,
    onPageChange,
    onPageSizeChange,
    onPreviousPage,
    search,
    onSearchChange,
    handleFilterChange,
  } = usePaginationPayload();

  const { data: getAll${pascalCaseName}ResData, isPending } = useGetAll${pascalCaseName}(payload);
  const { mutate: delete${pascalCaseName} } = useDelete${pascalCaseName}();
  const { mutate: change${pascalCaseName}Status } = use${pascalCaseName}StatusChange();

  const router = useRouter();

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const ${camelCaseName}List = getAll${pascalCaseName}ResData?.data?.docs ?? [];
  const metaData = getAll${pascalCaseName}ResData?.data?.meta;

  const nexPageEnable = !!metaData?.nextPage,
    previousPageEnable = !!metaData?.prevPage,
    totalPage = metaData?.totalPages ?? 0;

 const onDeleteClick = useCallback(
    (id: string) => {
      confirmModalRef.current?.open({
        title: 'Delete ${normalCaseName}',
        contentSlot: 'Are you sure you want to delete this ${normalCaseName}?',
        accept: () => {
          confirmModalRef?.current?.setIsLoading(true);
          delete${pascalCaseName}(id, {
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
            onSuccess: () => {
              toast.success('${pascalCaseName} deleted successfully');
              confirmModalRef?.current?.close();
            },
          });
          return;
        },
        reject: () => {
          confirmModalRef?.current?.close();
        },
      });
    },
    [delete${pascalCaseName}]
  );

  const onStatusChangeClick = useCallback(
    (id: string, currentStatus: string) => {
      confirmModalRef.current?.open({
        title: 'Change Status',
        contentSlot: \`Are you sure you want to \${
          currentStatus === StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active
        } this ${normalCaseName}?\`,
        accept: () => {
          confirmModalRef?.current?.setIsLoading(true);
          change${pascalCaseName}Status(
            { id, status: currentStatus === StatusEnum.Active ? StatusEnum.Inactive : StatusEnum.Active },
            {
              onSettled: () => {
                confirmModalRef?.current?.setIsLoading(false);
              },

              onSuccess: () => {
                toast.success('Status changed successfully');
                confirmModalRef?.current?.close();
              },
            }
          );
          return;
        },
        reject: () => {
          confirmModalRef?.current?.close();
        },
      });
    },
    [change${pascalCaseName}Status]
  );

  const columnDef = useMemo(
    () =>
      [
        {
          header: 'Image',
          accessorKey: 'image',
          cell: ({ row }) => (
            <div className='min-w-[100px]'>
              <NextImageWithFallback
                src={mediaUrl2(row?.original?.image)}
                alt='Image'
                width={100}
                height={100}
              />
            </div>
          ),
        },
        {
          header: 'Name',
          accessorKey: 'name',
          cell: ({ row }) => (
            <div className='min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.name}
            </div>
          ),
        },
        {
          header: 'Status',
          accessorKey: 'status',
          enableSorting: false,
          cell: ({ row }) => {
            return (
              <Badge
                className={\`capitalize cursor-pointer \${StatusStyles[row?.original?.status as StatusEnum]}\`}
                onClick={() => onStatusChangeClick(row?.original?._id, row?.original?.status)}
              >
                {row?.original?.status}
              </Badge>
            );
          },
        },
        {
          header: 'Action',
          accessorKey: 'action',
          cell: ({ row }) => {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>
                    <Icon icon={'lucide:ellipsis-vertical'} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='start'>
                  <Link href={ROUTES.dashboard.${camelCaseName}.view(row?.original?._id)}>
                    <DropdownMenuItem>
                      <Icon icon={'lucide:eye'} />
                      View
                    </DropdownMenuItem>
                  </Link>

                  <Link href={ROUTES.dashboard.${camelCaseName}.edit(row?.original?._id)}>
                    <DropdownMenuItem>
                      <Icon icon={'lucide:edit'} />
                      Edit
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem onClick={() => onDeleteClick(row?.original?._id)}>
                    <Icon icon={'lucide:trash'} className='text-red-500' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ] as ColumnDef<T${pascalCaseName}Schema['Doc']>[],
    [onDeleteClick, onStatusChangeClick]
  );

  return (
    <div className='space-y-4'>
      <PageHeader
        title='${normalCaseName}s'
        buttons={[
          {
            id: 'add-${kebabCaseName}',
            label: 'Add ${normalCaseName}',
            onClick: () => router.push(ROUTES.dashboard.${camelCaseName}.create),
            icon: 'lucide:plus',
          },
        ]}
      />

      <Card>
        <CardHeader>
          <TanstackTableHeader
            search={search}
            onSearchChange={onSearchChange}
            filters={[
              {
                id: 'status',
                Component: () => (
                  <TableStatusFilter
                    value={payload.status}
                    onChange={value => handleFilterChange('status', value)}
                    clear={() => handleFilterChange('status', undefined)}
                  />
                ),
              },
            ]}
          />
        </CardHeader>
        <Separator />
        <CardContent>
          <TanstackDataTable<T${pascalCaseName}Schema['Doc']>
            columns={columnDef}
            data={${camelCaseName}List}
            isLoading={isPending}
            isPaginated
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            currentPage={payload.page}
            pageSize={payload.limit}
            totalPage={totalPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            nextPageEnable={nexPageEnable}
            previousPageEnable={previousPageEnable}
          />
        </CardContent>
      </Card>

      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}

        `;
};

export default page;
