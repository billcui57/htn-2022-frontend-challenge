import { BLUE, BLUE_DARK } from "@/constants/colours";
import { LG, SM } from "@/constants/sizes";
import { TEventID, TEvent } from "@/types";
import Typography from "@/components/Typography";
import { TextUtils, DateUtils } from "@/utils";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import { useState } from "react";
import { DownArrow, UpArrow } from "@/svg";
import Button from "@/components/Input/Button";
import { useRouter } from "next/router";
import WhenEventFlag from "@/components/EventFlags/WhenEventFlag";

type EventListItemProps = {
  event: TEvent;
  isAuthenticated: boolean;
};

const EventListItem = (props: EventListItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const router = useRouter();

  const displayDescription = () => {
    if (!props.event.description) {
      return null;
    }

    return (
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {" "}
        <Typography
          text={
            isExpanded
              ? props.event.description
              : TextUtils.shortenTextWithEllipse(props.event.description, 100)
          }
          colour="text"
          size="sm"
        ></Typography>
      </div>
    );
  };

  const handleDetailsButton = (TEventID: TEventID) => {
    router.push(`/${TEventID}`);
  };

  return (
    <div className={`rounded-lg border-2 border-solid border-${BLUE_DARK} p-4`}>
      <Typography
        text={props.event.name}
        className="mb-4"
        colour="text"
        size="sm"
        bold
      ></Typography>

      <div className="flex justify-between mb-2">
        <div>
          <GenericEventFlag
            text={props.event.event_type}
            colour="blue"
            className="mb-2 sm:mr-2"
          ></GenericEventFlag>

          {props.event.permission && (
            <GenericEventFlag
              text={props.event.permission?.toString()}
              colour="yellow"
            ></GenericEventFlag>
          )}
        </div>

        <WhenEventFlag
          event={props.event}
          isAuthenticated={props.isAuthenticated}
        ></WhenEventFlag>
      </div>

      {displayDescription()}

      {isExpanded && (
        <Button
          onClick={() => {
            handleDetailsButton(props.event.id);
          }}
          type="secondary"
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
