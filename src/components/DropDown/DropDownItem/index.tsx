import Button from "@/components/Input/Button";
import Typography from "@/components/Typography";

export type DropDownItemProps = {
  label: string;
  onClick: any;
};

const DropDownItem = (props: DropDownItemProps) => {
  return (
    <Button
      onClick={() => {
        props.onClick();
      }}
      type="secondary"
    >
      <Typography
        colour="text"
        size="base"
        bold
        text={props.label}
      ></Typography>
    </Button>
  );
};

export default DropDownItem;
