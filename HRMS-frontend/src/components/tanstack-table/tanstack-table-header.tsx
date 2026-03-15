import { SearchIcon } from "lucide-react";
import { ReactNode } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

type TComponentProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
  filters?: { id: string; Component: () => ReactNode }[];
  showSearch?: boolean;
};

const TanstackTableHeader = ({
  onSearchChange,
  search,
  filters,
  showSearch = true,
}: TComponentProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {showSearch && (
          <div className="w-75">
            <InputGroup>
              <InputGroupInput
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search..."
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
        )}

        {filters?.map(({ id, Component }) => (
          <div key={id}>{Component()}</div>
        ))}
      </div>
    </div>
  );
};

export default TanstackTableHeader;
