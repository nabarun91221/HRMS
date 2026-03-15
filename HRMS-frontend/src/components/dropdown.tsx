import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type TDropdownProps = {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const Dropdown = ({ value, options, onChange, placeholder }: TDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className=' w-full flex justify-between text-sm  gap-2'>
          {options.find(o => o?.value === value)?.label || placeholder || 'Select'}
          <Icon icon='lucide:chevron-down' className='ml-2 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='max-h-[200px] overflow-auto'>
        {options.map(opt => (
          <DropdownMenuItem key={opt.value} onClick={() => onChange(opt?.value)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
