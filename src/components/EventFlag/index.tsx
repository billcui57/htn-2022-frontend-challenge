import {
  TEXT,
  WHITE,
  BLUE_LIGHT,
  RED,
  YELLOW_LIGHT,
  GREEN_LIGHT,
} from "@/constants/colours";
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
  YELLOW: "yellow",
  GREEN: "green",
};

const EventFlag = (props: EventFlagProps) => {
  const classes = classNames(
    `rounded-lg border-2 border-solid ${props.className} px-2 inline-block`,
    {
      [`bg-${WHITE}`]: props.colour == COLOURS.WHITE,
      [`bg-${TEXT}`]: props.colour == COLOURS.TEXT,
      [`bg-${BLUE_LIGHT}`]: props.colour == COLOURS.BLUE,
      [`bg-${RED}`]: props.colour == COLOURS.RED,
      [`bg-${YELLOW_LIGHT}`]: props.colour == COLOURS.YELLOW,
      [`bg-${GREEN_LIGHT}`]: props.colour == COLOURS.GREEN,
    }
  );

  return <p className={classes}>{props.text}</p>;
};

export default EventFlag;
