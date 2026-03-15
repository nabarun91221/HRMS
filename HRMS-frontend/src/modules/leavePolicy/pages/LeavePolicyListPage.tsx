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
import { usePaginationPayload } from '@/hooks/use-pagination-payload';
import { ROUTES } from '@/lib/routes';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { useDeleteLeavePolicy, useGetAllLeavePolicy } from '../hooks';
import { TLeavePolicySchema } from '../schema';

export default function LeavePolicyListPage() {
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

  const { data: getAllLeavePolicyResData, isPending } = useGetAllLeavePolicy();
  const { mutate: deleteLeavePolicy } = useDeleteLeavePolicy();

  const leavePolicyList = getAllLeavePolicyResData?.data || [];

  const router = useRouter();

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const onDeleteClick = useCallback(
    (id: string) => {
      confirmModalRef.current?.open({
        title: 'Delete Leave Policy',
        contentSlot: 'Are you sure you want to delete this Leave Policy?',
        accept: () => {
          confirmModalRef?.current?.setIsLoading(true);
          deleteLeavePolicy(id, {
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
            onSuccess: () => {
              toast.success('LeavePolicy deleted successfully');
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
    [deleteLeavePolicy]
  );

  const columnDef = useMemo(
    () =>
      [
        {
          header: 'Name',
          accessorKey: 'name',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.name}
            </div>
          ),
        },

        {
          header: 'Days per year',
          accessorKey: 'daysPerYear',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.daysPerYear}
            </div>
          ),
        },

        {
          header: 'Carry Forward',
          accessorKey: 'carryForward',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.carryForward ? 'Yes' : 'No'}
            </div>
          ),
        },

        {
          header: 'Max Carry Forward Days',
          accessorKey: 'maxCarryForwardDays',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.maxCarryForwardDays}
            </div>
          ),
        },

        {
          header: 'Is Paid',
          accessorKey: 'isPaid',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.isPaid ? 'Yes' : 'No'}
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
                  <Link href={ROUTES.admin.dashboard.leavePolicy.edit(row?.original?._id)}>
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
      ] as ColumnDef<TLeavePolicySchema['Doc']>[],
    [onDeleteClick]
  );

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Leave Policies'
        buttons={[
          {
            id: 'add-leave-policy',
            label: 'Add Leave Policy',
            onClick: () => router.push(ROUTES.admin.dashboard.leavePolicy.create),
            icon: 'lucide:plus',
          },
        ]}
      />

      <Card>
        <CardContent>
          <TanstackDataTable<TLeavePolicySchema['Doc']>
            columns={columnDef}
            data={leavePolicyList}
            isLoading={isPending}
            isPaginated={false}
          />
        </CardContent>
      </Card>

      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}
