import {
  TEXT,
  WHITE,
  BLUE_LIGHT,
  RED,
  YELLOW_LIGHT,
  GREEN_LIGHT,
} from "@/constants/colours";
import classNames from "classnames";
import Typography from "@/components/Typography";

type GenericEventFlagProps = {
  text: string;
  colour: string;
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

const GenericEventFlag = (props: GenericEventFlagProps) => {
  const classes = classNames(
    `rounded-lg ${props.className} px-2 inline-block`,
    {
      [`bg-${WHITE}`]: props.colour == COLOURS.WHITE,
      [`bg-${TEXT}`]: props.colour == COLOURS.TEXT,
      [`bg-${BLUE_LIGHT}`]: props.colour == COLOURS.BLUE,
      [`bg-${RED}`]: props.colour == COLOURS.RED,
      [`bg-${YELLOW_LIGHT}`]: props.colour == COLOURS.YELLOW,
      [`bg-${GREEN_LIGHT}`]: props.colour == COLOURS.GREEN,
    }
  );

  return (
    <Typography
      className={classes}
      text={props.text}
      colour="black"
      size="base"
    ></Typography>
  );
};

export default GenericEventFlag;
