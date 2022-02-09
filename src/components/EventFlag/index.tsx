import { TEXT, WHITE, BLUE, RED } from "@/constants/colours";
import classNames from "classnames";

type EventFlagProps = {
  text: string;
  colour: string;
  isButton?: boolean;
  className?: string;
};

const COLOURS = {
  RED: "red",
  BLUE: "blue",
  TEXT: "text",
  WHITE: "white",
};

const EventFlag = (props: EventFlagProps) => {
  const classes = classNames(`inline-block rounded-lg ${props.className}`, {
    [`bg-${WHITE}`]: props.colour == COLOURS.WHITE,
    [`bg-${TEXT}`]: props.colour == COLOURS.TEXT,
    [`bg-${BLUE}`]: props.colour == COLOURS.BLUE,
    [`bg-${RED}`]: props.colour == COLOURS.RED,
  });

  return <div className={classes}>{props.text}</div>;
};

export default EventFlag;
