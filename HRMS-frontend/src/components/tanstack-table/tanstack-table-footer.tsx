
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type TComponentProps = {
    currentPage: number; // zero-based
    pageSize: number;
    totalPage: number; // total rows across ALL pages (for server-side pagination)
    onPageChange: (nextPageIndex: number) => void;
    onPageSizeChange: (nextPageSize: number) => void;
    onPreviousPage: () => void
    onNextPage: () => void
    nextPageEnable: boolean
    previousPageEnable: boolean
}

const TanstackTableFooter = ({
    onPageChange,
    onPageSizeChange,
    currentPage,
    pageSize,
    totalPage,
    onPreviousPage,
    onNextPage,
    nextPageEnable,
    previousPageEnable
}: TComponentProps) => {
    return (
        <div className="@container w-full">

            <div className="flex w-full flex-col @lg:flex-row items-center gap-8 justify-between px-2">
                <div className="flex gap-2">
                    <Label htmlFor="rows-per-page" className="text-sm font-medium">
                        Rows per page
                    </Label>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => {
                            onPageSizeChange(Number(value))
                        }}
                    >
                        <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                            <SelectValue
                                placeholder={pageSize}
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col @lg:flex-row items-center gap-6">
                    <div className=" text-sm font-medium">
                        Page {currentPage} of{" "}
                        {totalPage}
                    </div>
                    <div className="flex gap-2">

                        <Button
                            variant="outline"
                            className=" h-8 w-8 p-0 "
                            onClick={() => onPageChange(1)}
                            disabled={!previousPageEnable}
                        >
                            <span className="sr-only">Go to first page</span>
                            <IconChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => onPreviousPage()}
                            disabled={!previousPageEnable}

                        >
                            <span className="sr-only">Go to previous page</span>
                            <IconChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => onNextPage()}
                            disabled={!nextPageEnable}

                        >
                            <span className="sr-only">Go to next page</span>
                            <IconChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className=" size-8 "
                            size="icon"
                            onClick={() => onPageChange(totalPage)}
                            disabled={!nextPageEnable}
                        >
                            <span className="sr-only">Go to last page</span>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default TanstackTableFooter;
