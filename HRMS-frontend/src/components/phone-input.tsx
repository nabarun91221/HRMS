import Phone, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = ({
  onBlur,
  onChange,
  value,
  disabled,
  ...props
}: PhoneInputProps & React.ComponentProps<"input">) => {
  return (
    <div>
      <Phone
        inputClass=" aria-invalid:!ring-destructive/20 dark:aria-invalid:!ring-destructive/40 aria-invalid:!border-destructive !shadow-xs !w-full !bg-transparent dark:!bg-input/30 !border  dark:!border-input"
        buttonClass="!shadow-xs [&>.selected-flag]:dark:hover:!bg-input/30 [&>.selected-flag.open]:dark:!bg-input/30 !bg-transparent dark:!bg-input/30 !border  dark:!border-input"
        dropdownClass="!shadow-xs [&>.country]:hover:!bg-accent [&>.highlight]:!bg-accent !bg-input !border  dark:!border-input"
        country={"us"}
        inputProps={props}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneInput;
