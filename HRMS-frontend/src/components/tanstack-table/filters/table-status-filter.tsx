import MultiSelect2 from '@/components/ui/multi-select2';
import { StatusEnum, StatusOptions } from '@/modules/core/constants';

const TableStatusFilter = ({
  value,
  onChange,
  clear,
}: {
  value?: StatusEnum;
  onChange: (value: StatusEnum) => void;
  clear: () => void;
}) => {
  return (
    <MultiSelect2
      value={value ? [value] : []}
      options={StatusOptions}
      singleSelect
      onChange={value => onChange(value?.[0]?.value as StatusEnum)}
      placeholder='Select Status'
      prefix='Status'
      clear={clear}
    />
  );
};

export default TableStatusFilter;
