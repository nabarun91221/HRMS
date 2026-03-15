import { useEffect, useState } from 'react';
import { MultiSelect } from './multi-select';

export type TOption = {
  label: string;
  value: string;
};

type TComponentProps = {
  singleSelect?: boolean;
  options: TOption[];
  onChange: (value: TOption[]) => void;
  clear: () => void;
  value: string[];
  placeholder?: string;
  prefix?: string;
  disabled?: boolean;
  loading?: boolean;
};

const MultiSelect2 = ({
  onChange,
  options,
  value,
  singleSelect = false,
  loading = false,
  placeholder,
  prefix,
  clear,
  disabled,
}: TComponentProps) => {
  const [displayedOptions, setDisplayedOptions] = useState(options);

  const selectedValue = options.filter(option => value?.includes(option.value));

  useEffect(() => {
    setDisplayedOptions(options);
  }, [options]);

  const [search, setSearch] = useState('');

  return (
    <MultiSelect
      disabled={disabled}
      value={selectedValue}
      options={displayedOptions}
      search={search}
      onSearchChange={value => {
        const newOptions = options.filter(option =>
          option.label.toLowerCase().includes(value.toLowerCase())
        );

        setDisplayedOptions(newOptions);
        setSearch(value);
      }}
      loading={loading}
      onChange={onChange}
      singleSelect={singleSelect}
      placeholder={placeholder}
      prefix={prefix}
      clear={clear}
    />
  );
};

export default MultiSelect2;
