import classNames from "classnames";
import {
  BLUE,
  WHITE,
  BLUE_DARK,
  RED_DARK,
  RED_DARKER,
  PURPLE_LIGHT,
  BLACK,
  PURPLE,
} from "@/constants/colours";

const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
  TRANSPARENT: "transparent",
};

type ButtonProps = {
  type: string;
  children?: any;
  onClick: any;
  className?: string;
  hidden?: boolean;
};

const Button = ({
  type,
  children,
  onClick,
  className,
  hidden,
}: ButtonProps) => {
  const btnClasses = classNames(
    `${
      type == TYPES.TRANSPARENT ? "" : "w-36 h-12"
    } rounded-lg focus:outline-none flex items-center justify-center ${className}`,
    {
      [`bg-${PURPLE_LIGHT} text-${BLACK} hover:bg-${PURPLE}`]:
        type == TYPES.PRIMARY,
      [`bg-${WHITE} bg-opacity-0 hover:bg-opacity-40 text-${BLUE} border-${BLUE} border-2`]:
        type == TYPES.SECONDARY,
      [`bg-${RED_DARKER} text-${WHITE} hover:bg-${RED_DARK}`]:
        type == TYPES.WARNING,
      [`hover:opacity-75`]: type == TYPES.TRANSPARENT,
    }
  );

  return (
    <button className={btnClasses} onClick={onClick} hidden={hidden}>
      {children}
    </button>
  );
};

export default Button;
