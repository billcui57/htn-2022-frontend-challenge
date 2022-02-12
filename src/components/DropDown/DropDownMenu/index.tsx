import Button from "@/components/Input/Button";
import { BorgorMenu } from "@/svg";
import { DropDownItemProps } from "@/components/DropDown/DropDownItem";
import DropDownItem from "@/components/DropDown/DropDownItem";
import { useState } from "react";

type DropDownMenuProps = {
  items: DropDownItemProps[];
};

const DropDownMenu = (props: DropDownMenuProps) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  return (
    <div>
      <Button
        type="transparent"
        className="mb-2"
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
