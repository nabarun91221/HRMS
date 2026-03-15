"use client";
"use no memo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TanstackTableFooter from "./tanstack-table-footer";

// ----------------------------
// Reusable component
// ----------------------------

export type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
  onRowClick?: (row: TData) => void;
} & (
  | {
      isPaginated?: false;
    }
  | {
      isPaginated?: true;
      totalPage: number; // total rows across ALL pages (for server-side pagination)
      onPageChange: (nextPageIndex: number) => void;
      onPageSizeChange: (nextPageSize: number) => void;
      onPreviousPage: () => void;
      onNextPage: () => void;
      nextPageEnable: boolean;
      previousPageEnable: boolean;
      currentPage: number; // zero-based
      pageSize: number;
    }
);

export function TanstackDataTable<TData>({
  columns,
  data,
  isLoading,
  onRowClick,
  ...paginationProps
}: DataTableProps<TData>) {
  const table = useReactTable<TData>({
    data,
    columns: [
      {
        header: "Sr No.",
        accessorKey: "Sr No.",
        cell: ({ row }) => (
          <div className="ml-2">
            {row?.index +
              1 +
              (paginationProps?.isPaginated
                ? (paginationProps?.currentPage - 1) * paginationProps?.pageSize
                : 0)}
          </div>
        ),
      },
      ...columns,
    ],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="w-full space-y-3">
      {/* Table */}
      <div className="rounded-sm border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={onRowClick ? "cursor-pointer" : ""}
                  onClick={() => onRowClick?.(row?.original)}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginationProps?.isPaginated && (
        <TanstackTableFooter
          onPageChange={paginationProps?.onPageChange}
          onPageSizeChange={paginationProps?.onPageSizeChange}
          currentPage={paginationProps?.currentPage}
          pageSize={paginationProps?.pageSize}
          totalPage={paginationProps?.totalPage}
          onPreviousPage={paginationProps?.onPreviousPage}
          onNextPage={paginationProps?.onNextPage}
          nextPageEnable={paginationProps?.nextPageEnable}
          previousPageEnable={paginationProps?.previousPageEnable}
        />
      )}
    </div>
  );
}
