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
import { useDeleteDepartment, useGetAllDepartment } from '../hooks';
import { TDepartmentSchema } from '../schema';

export default function DepartmentListPage() {
  const { data: getAllDepartmentResData, isPending } = useGetAllDepartment();
  const { mutate: deleteDepartment } = useDeleteDepartment();

  const router = useRouter();

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const departmentList = getAllDepartmentResData?.data ?? [];

  const onDeleteClick = useCallback(
    (id: string) => {
      confirmModalRef.current?.open({
        title: 'Delete Department',
        contentSlot: 'Are you sure you want to delete this Department?',
        accept: () => {
          confirmModalRef?.current?.setIsLoading(true);
          deleteDepartment(id, {
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
            onSuccess: () => {
              toast.success('Department deleted successfully');
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
    [deleteDepartment]
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
                  <Link href={ROUTES.admin.dashboard.department.edit(row?.original?._id)}>
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
      ] as ColumnDef<TDepartmentSchema['Doc']>[],
    [onDeleteClick]
  );

  return (
    <div className='space-y-4'>
      <PageHeader
        title='Departments'
        buttons={[
          {
            id: 'add-department',
            label: 'Add Department',
            onClick: () => router.push(ROUTES.admin.dashboard.department.create),
            icon: 'lucide:plus',
          },
        ]}
      />

      <Card>
        <CardContent>
          <TanstackDataTable<TDepartmentSchema['Doc']>
            columns={columnDef}
            data={departmentList}
            isLoading={isPending}
            isPaginated={false}
          />
        </CardContent>
      </Card>

      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}
