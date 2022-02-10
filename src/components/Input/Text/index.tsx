import Typography from "@/components/Typography";
import { BLUE_DARK, WHITE } from "@/constants/colours";

type TextInputProps = {
  label: string;
  onChange: any;
  className?: string;
  value: string | number;
};

const TextInput = (props: TextInputProps) => {
  return (
    <div className={`${props.className}`}>
      <Typography text={props.label} colour="text" size="lg" bold></Typography>
      <input
        type="text"
        name={props.label}
        onChange={props.onChange}
        className={`rounded-lg focus:outline-none border-2 border-${BLUE_DARK} px-2`}
      ></input>
    </div>
  );
};

export default TextInput;
