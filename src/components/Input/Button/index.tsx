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
  fullWidth?: boolean;
};

const Button = ({
  type,
  children,
  onClick,
  className,
  hidden,
  fullWidth,
}: ButtonProps) => {
  const btnClasses = classNames(
    ` rounded-lg focus:outline-none flex items-center justify-center ${className}`,
    {
      ["w-36 h-12"]: type !== TYPES.TRANSPARENT,
      ["w-screen h-12"]: fullWidth,
      [`bg-${BLUE_DARK} text-${WHITE} hover:bg-opacity-40 `]:
        type == TYPES.PRIMARY,
      [`bg-${WHITE} bg-opacity-0 hover:bg-opacity-40 text-${BLUE_DARK} border-${BLUE_DARK} border-2`]:
        type == TYPES.SECONDARY,
      [`bg-${RED_DARKER} text-${WHITE} hover:bg-${RED_DARK}`]:
        type == TYPES.WARNING,
      // [`hover:opacity-75`]: type == TYPES.TRANSPARENT,
    }
  );

  return (
    <button className={btnClasses} onClick={onClick} hidden={hidden}>
      {children}
    </button>
  );
};

export default Button;
