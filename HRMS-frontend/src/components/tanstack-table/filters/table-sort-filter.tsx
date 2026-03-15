import MultiSelect2 from "@/components/ui/multi-select2";
import { SortEnum, SortOptions } from "@/modules/core/constants";

const TableSortFilter = ({
  value,
  onChange,
  clear,
}: {
  value?: SortEnum;
  onChange: (value: SortEnum) => void;
  clear: () => void;
}) => {
  return (
    <MultiSelect2
      value={value ? [value] : []}
      options={SortOptions}
      singleSelect
      onChange={(value) => onChange(value?.[0]?.value as SortEnum)}
      placeholder="Select Sort"
      prefix="Sort"
      clear={clear}
    />
  );
};

export default TableSortFilter;
