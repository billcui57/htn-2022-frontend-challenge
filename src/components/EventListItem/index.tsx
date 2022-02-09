import { BLUE, BLUE_DARK } from "@/constants/colours";
import { LG, SM } from "@/constants/sizes";
import { EventID, TEvent } from "@/types";
import Typography from "@/components/Typography";
import { TextUtils, DateUtils } from "@/utils";
import EventFlag from "@/components/EventFlag";
import { useState } from "react";
import { DownArrow, UpArrow } from "@/svg";
import Button from "@/components/Input/Button";
import { useRouter } from "next/router";

type EventListItemProps = {
  event: TEvent;
};

const EventListItem = (props: EventListItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const router = useRouter();

  const displayDescription = () => {
    if (!props.event.description) {
      return null;
    }

    return (
      <Typography
        text={
          isExpanded
            ? props.event.description
            : TextUtils.shortenTextWithEllipse(props.event.description, 100)
        }
        colour={BLUE_DARK}
        size={SM}
      ></Typography>
    );
  };

  const getStartEndText = (startTime, endTime) => {
    return `${DateUtils.formatUnixTimeStamp(
      startTime
    )} - ${DateUtils.formatUnixTimeStamp(endTime)}`;
  };

  const handleDetailsButton = (eventId: EventID) => {
    router.push(`/${eventId}`);
  };

  return (
    <div className={`rounded-lg border-2 border-solid border-${BLUE_DARK} p-6`}>
      <Typography
        text={props.event.name}
        colour={BLUE_DARK}
        size={LG}
      ></Typography>

      <div className="flex justify-between">
        <div>
          <EventFlag text={props.event.event_type} colour="blue"></EventFlag>

          {props.event.permission && (
            <EventFlag
              text={props.event.permission?.toString()}
              colour="yellow"
            ></EventFlag>
          )}
        </div>

        {DateUtils.isWithinRange(
          props.event.start_time,
          props.event.end_time,
          props.event.end_time - 1
        ) ? (
          <Button onClick={() => {}} type="transparent">
            <EventFlag text="Join here!" colour="green"></EventFlag>
          </Button>
        ) : (
          <EventFlag
            text={getStartEndText(props.event.start_time, props.event.end_time)}
            colour="green"
          ></EventFlag>
        )}
      </div>

      {displayDescription()}

      {isExpanded && (
        <Button
          onClick={() => {
            handleDetailsButton(props.event.id);
          }}
          type="primary"
          className="my-2"
        >
          More Details
        </Button>
      )}

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          type="transparent"
        >
          {isExpanded ? <UpArrow></UpArrow> : <DownArrow></DownArrow>}
        </Button>
      </div>
    </div>
  );
};

export default EventListItem;
