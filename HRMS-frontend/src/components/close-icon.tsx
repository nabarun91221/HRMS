import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const CloseIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Icon
      onClick={onClick}
      className="text-red-500 cursor-pointer"
      icon={"lucide:x"}
    />
  );
};

export default CloseIcon;
