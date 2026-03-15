"use client";

import ConfirmModal, { ConfirmActionsType } from "@/components/ConfirmDialog";
import PageHeader from "@/components/page-header";
import TableSortFilter from "@/components/tanstack-table/filters/table-sort-filter";
import { TanstackDataTable } from "@/components/tanstack-table/tanstack-table";
import TanstackTableHeader from "@/components/tanstack-table/tanstack-table-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import MultiSelect2 from "@/components/ui/multi-select2";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";
import { convertDateStringToReadableFormat } from "@/lib/utils";
import { SortEnum } from "@/modules/core/constants";
import { useGetAllDepartment } from "@/modules/department/hooks";
import { useGetAllDesignation } from "@/modules/designation/hooks";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { ColumnDef } from "@tanstack/react-table";
import { useDebounceFn } from "ahooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useDeleteEmployee, useGetAllEmployee } from "../hooks";
import {
  EmployeeStatusEnumViewMap,
  EmploymentTypeEnum,
  EmploymentTypeEnumViewMap,
  EmploymentTypeOptions,
  TEmployeeSchema,
} from "../schema";

export default function EmployeeListPage() {
  const [payload, setPayload] = useState<
    TEmployeeSchema["GetAllEmployeePayload"]
  >({
    sort: SortEnum.Descending,
  });

  const { run: handleNameChangeDebounced } = useDebounceFn(
    (name: string) => {
      setPayload((prev) => ({ ...prev, name }));
    },
    {
      wait: 500,
    },
  );

  const [localSearchedName, setLocalSearchedName] = useState("");

  const [localSearchedEmployeeCode, setLocalSearchedEmployeeCode] =
    useState("");

  const { run: handleEmployeeCodeChangeDebounced } = useDebounceFn(
    (employeeCode: string) => {
      setPayload((prev) => ({ ...prev, employeeCode }));
    },
    {
      wait: 500,
    },
  );

  const { data: getAllEmployeeResData, isPending } = useGetAllEmployee(payload);
  const { mutate: deleteEmployee } = useDeleteEmployee();

  const router = useRouter();

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const employeeList = getAllEmployeeResData?.data ?? [];

  const { data: departmentResData, isLoading: isGetAllDepartmentPending } =
    useGetAllDepartment();

  const departmentOptions = (departmentResData?.data || [])?.map(
    (department) => {
      return {
        label: department.name,
        value: department._id,
      };
    },
  );

  const { data: designationResData, isLoading: isGetAllDesignationPending } =
    useGetAllDesignation();

  const designationOptions = useMemo(() => {
    return (designationResData?.data || [])
      ?.filter((designation) => {
        return designation?.departmentId?._id === payload?.departmentId;
      })
      ?.map((designation) => {
        return {
          label: designation.name,
          value: designation._id,
        };
      });
  }, [designationResData?.data, payload?.departmentId]);

  const onDeleteClick = useCallback(
    (id: string) => {
      confirmModalRef.current?.open({
        title: "Delete Employee",
        contentSlot: "Are you sure you want to delete this Employee?",
        accept: () => {
          confirmModalRef?.current?.setIsLoading(true);
          deleteEmployee(id, {
            onSettled: () => {
              confirmModalRef?.current?.setIsLoading(false);
            },
            onSuccess: () => {
              toast.success("Employee deleted successfully");
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
    [deleteEmployee],
  );

  const columnDef = useMemo(
    () =>
      [
        {
          header: "Employee Code",
          accessorKey: "employeeCode",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.employeeCode}
            </div>
          ),
        },
        {
          header: "Joining Date",
          accessorKey: "joiningDate",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {convertDateStringToReadableFormat(
                row?.original?.employment?.joiningDate,
              )}
            </div>
          ),
        },
        {
          header: "Name",
          accessorKey: "name",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.personalInfo?.firstName +
                " " +
                row?.original?.personalInfo?.lastName}
            </div>
          ),
        },
        {
          header: "Designation",
          accessorKey: "designation",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.employment?.designationId?.name}
            </div>
          ),
        },
        {
          header: "Department",
          accessorKey: "department",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.employment?.departmentId?.name}
            </div>
          ),
        },
        {
          header: "Employment Type",
          accessorKey: "employmentType",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              <Badge>
                {
                  EmploymentTypeEnumViewMap[
                    row?.original?.employment?.employmentType
                  ]
                }
              </Badge>
            </div>
          ),
        },

        {
          header: "Status",
          accessorKey: "status",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              <Badge>
                {EmployeeStatusEnumViewMap[row?.original?.employment?.status]}
              </Badge>
            </div>
          ),
        },

        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Icon icon={"lucide:ellipsis-vertical"} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <Link
                    href={ROUTES.admin.dashboard.employee.view(
                      row?.original?._id,
                    )}
                  >
                    <DropdownMenuItem>
                      <Icon icon={"lucide:eye"} />
                      View
                    </DropdownMenuItem>
                  </Link>

                  <Link
                    href={ROUTES.admin.dashboard.employee.edit(
                      row?.original?._id,
                    )}
                  >
                    <DropdownMenuItem>
                      <Icon icon={"lucide:edit"} />
                      Edit
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem
                    onClick={() => onDeleteClick(row?.original?._id)}
                  >
                    <Icon icon={"lucide:trash"} className="text-red-500" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ] as ColumnDef<TEmployeeSchema["Doc"]>[],
    [onDeleteClick],
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Employees"
        buttons={[
          {
            id: "add-employee",
            label: "Add Employee",
            onClick: () => router.push(ROUTES.admin.dashboard.employee.create),
            icon: "lucide:plus",
          },
        ]}
      />

      <Card>
        <CardHeader>
          <TanstackTableHeader
            showSearch={false}
            filters={[
              {
                id: "name",
                Component: () => (
                  <Input
                    placeholder="Name"
                    value={localSearchedName}
                    onChange={(e) => {
                      setLocalSearchedName(e.target.value);
                      handleNameChangeDebounced(e.target.value);
                    }}
                  />
                ),
              },
              {
                id: "employeeCode",
                Component: () => (
                  <Input
                    placeholder="Employee Code"
                    value={localSearchedEmployeeCode}
                    onChange={(e) => {
                      setLocalSearchedEmployeeCode(e.target.value);
                      handleEmployeeCodeChangeDebounced(e.target.value);
                    }}
                  />
                ),
              },
              {
                id: "employmentType",
                Component: () => (
                  <MultiSelect2
                    singleSelect
                    options={EmploymentTypeOptions}
                    value={
                      payload.employmentType ? [payload.employmentType] : []
                    }
                    prefix="Type"
                    placeholder="Select Employment Type "
                    onChange={(value) => {
                      if (value?.length) {
                        setPayload((prev) => ({
                          ...prev,
                          employmentType: value?.[0]
                            ?.value as EmploymentTypeEnum,
                        }));
                      } else {
                        setPayload((prev) => ({
                          ...prev,
                          employmentType: undefined,
                        }));
                      }
                    }}
                    clear={() => {
                      setPayload((prev) => ({
                        ...prev,
                        employmentType: undefined,
                      }));
                    }}
                  />
                ),
              },
              {
                id: "department",
                Component: () => (
                  <MultiSelect2
                    singleSelect
                    options={departmentOptions}
                    loading={isGetAllDepartmentPending}
                    value={payload.departmentId ? [payload.departmentId] : []}
                    prefix="Department"
                    placeholder="Select Department "
                    onChange={(value) => {
                      if (value?.length) {
                        setPayload((prev) => ({
                          ...prev,
                          departmentId: value?.[0]?.value,
                        }));
                      } else {
                        setPayload((prev) => ({
                          ...prev,
                          departmentId: undefined,
                          designationId: undefined,
                        }));
                      }
                    }}
                    clear={() => {
                      setPayload((prev) => ({
                        ...prev,
                        departmentId: undefined,
                        designationId: undefined,
                      }));
                    }}
                  />
                ),
              },
              {
                id: "designation",
                Component: () => (
                  <MultiSelect2
                    singleSelect
                    disabled={!payload?.departmentId}
                    options={designationOptions}
                    loading={isGetAllDesignationPending}
                    value={payload.designationId ? [payload.designationId] : []}
                    prefix="Designation"
                    placeholder="Select Designation "
                    onChange={(value) => {
                      if (value?.length) {
                        setPayload((prev) => ({
                          ...prev,
                          designationId: value?.[0]?.value,
                        }));
                      } else {
                        setPayload((prev) => ({
                          ...prev,
                          designationId: undefined,
                        }));
                      }
                    }}
                    clear={() => {
                      setPayload((prev) => ({
                        ...prev,
                        designationId: undefined,
                      }));
                    }}
                  />
                ),
              },
              {
                id: "sort",
                Component: () => (
                  <TableSortFilter
                    value={payload.sort}
                    onChange={(value) => {
                      setPayload((prev) => ({
                        ...prev,
                        sort: value,
                      }));
                    }}
                    clear={() =>
                      setPayload((prev) => ({
                        ...prev,
                        sort: undefined,
                      }))
                    }
                  />
                ),
              },
            ]}
          />
        </CardHeader>
        <Separator />
        <CardContent>
          <TanstackDataTable<TEmployeeSchema["Doc"]>
            columns={columnDef}
            data={employeeList}
            isLoading={isPending}
            isPaginated={false}
          />
        </CardContent>
      </Card>

      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}
