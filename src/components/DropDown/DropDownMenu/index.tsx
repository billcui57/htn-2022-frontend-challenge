import Button from "@/components/Input/Button";
import { BorgorMenu } from "@/svg";
import { DropDownItemProps } from "@/components/DropDown/DropDownItem";
import DropDownItem from "@/components/DropDown/DropDownItem";
import { useState } from "react";

type DropDownMenuProps = {
  items: DropDownItemProps[];
  className?: string;
};

const DropDownMenu = (props: DropDownMenuProps) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  return (
    <div className={props.className}>
      <Button
        type="transparent"
        fullWidth
        onClick={() => {
          setIsExpand(!isExpand);
        }}
      >
        <BorgorMenu></BorgorMenu>
      </Button>
      {isExpand && (
        <div className="grid grid-cols-1 justify-items-center space-y-2">
          {props.items.map((item: DropDownItemProps) => {
            return (
              <DropDownItem
                label={item.label}
                onClick={item.onClick}
              ></DropDownItem>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
