import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

type PhoneMaskProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

export const PhoneMask = forwardRef<HTMLElement, PhoneMaskProps>(
  function PhoneMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+{9\0} (000) 000-00-00"
        definitions={{
          "#": /[0-9]/,
        }}
        // @ts-ignore
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  }
);
