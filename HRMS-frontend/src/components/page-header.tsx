import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Button } from "./ui/button";

type TComponentProps = {
  title: string;
  backButton?: boolean;
  onBackClick?: () => void;

  buttons?: {
    id: string;
    label: string;
    onClick?: (id: string) => void;
    icon?: string;
  }[];
};

const PageHeader = ({
  title,
  backButton,
  onBackClick,
  buttons,
}: TComponentProps) => {
  return (
    <div className="flex justify-between">
      <div className=" flex gap-2 items-center">
        {backButton && (
          <Button onClick={onBackClick} variant={"outline"} className="px-2">
            <Icon icon={"lucide:arrow-left"} className="text-lg" />
          </Button>
        )}
        <div className="text-xl font-semibold">{title}</div>
      </div>

      <div>
        {buttons?.map((button) => (
          <Button key={button.id} onClick={() => button?.onClick?.(button.id)}>
            {button?.icon && <Icon icon={button?.icon} />}
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
