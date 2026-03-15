'use client';

import ConfirmModal, { ConfirmActionsType } from '@/components/ConfirmDialog';
import PageHeader from '@/components/page-header';
import { TanstackDataTable } from '@/components/tanstack-table/tanstack-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/lib/routes';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { useDeleteDesignation, useGetAllDesignation } from '../hooks';
import { TDesignationSchema } from '../schema';

export default function DesignationListPage() {
  const { data: getAllDesignationResData, isPending } = useGetAllDesignation();
  const { mutate: deleteDesignation } = useDeleteDesignation();

  const router = useRouter();

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const designationList = getAllDesignationResData?.data ?? [];

  const onDeleteClick = useCallback(
    (id: string) => {
      confirmModalRef.current?.open({
        title: 'Delete Designation',
        contentSlot: 'Are you sure you want to delete this Designation?',
        accept: () => {
          confirmModalRef?.current?.setIsLoading(true);
          deleteDesignation(id, {
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
            onSuccess: () => {
              toast.success('Designation deleted successfully');
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
    [deleteDesignation]
  );

  const columnDef = useMemo(
    () =>
      [
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
          header: 'Department',
          accessorKey: 'departmentId',
          cell: ({ row }) => (
            <div className='min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.departmentId?.name}
            </div>
          ),
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
                  <Link href={ROUTES.admin.dashboard.designation.edit(row?.original?._id)}>
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
      ] as ColumnDef<TDesignationSchema['Doc']>[],
    [onDeleteClick]
  );

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Designations'
        buttons={[
          {
            id: 'add-designation',
            label: 'Add Designation',
            onClick: () => router.push(ROUTES.admin.dashboard.designation.create),
            icon: 'lucide:plus',
          },
        ]}
      />

      <Card>
        <CardContent>
          <TanstackDataTable<TDesignationSchema['Doc']>
            columns={columnDef}
            data={designationList}
            isLoading={isPending}
            isPaginated={false}
          />
        </CardContent>
      </Card>

      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}
