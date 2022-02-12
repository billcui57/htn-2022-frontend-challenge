import { TEvent } from "@/types";
import { DateUtils } from "@/utils";
import { UserProfile } from "@auth0/nextjs-auth0";
import DetailsSection from "@/components/DetailsSection";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import Button from "@/components/Input/Button";
import { Fragment } from "react";

type WhenEventFlagProps = {
  event: TEvent;
  isAuthenticated: boolean;
};

const WhenEventFlag = (props: WhenEventFlagProps) => {
  const handleJoinNow = () => {
    if (props.isAuthenticated) {
      if (props.event.private_url) {
        window.location.assign(props.event.private_url);
      } else if (props.event.public_url) {
        window.location.assign(props.event.public_url);
      }
    } else {
      if (props.event.public_url) {
        window.location.assign(props.event.public_url);
      }
    }
  };

  const shouldJoinNow = (event: TEvent) => {
    return DateUtils.isWithinRange(
      event.start_time,
      event.end_time,
      Date.now()
    );
  };

  const hasJoinLink = (event: TEvent, isAuthenticated: boolean) => {
    if (isAuthenticated) {
      return !!event.private_url || !!event.public_url;
    } else {
      return !!event.public_url;
    }
  };

  const displayWhen = () => {
    if (shouldJoinNow(props.event)) {
      if (hasJoinLink(props.event, props.isAuthenticated)) {
        return (
          <Button onClick={() => handleJoinNow()} type="primary">
            Join here!
          </Button>
        );
      } else {
        return (
          <GenericEventFlag
            text="Ask in Discord for the join link!"
            colour="green"
          ></GenericEventFlag>
        );
      }
    } else {
      return (
        <div>
          <GenericEventFlag
            text={`Starts ${DateUtils.formatUnixTimeStamp(
              props.event.start_time
            )}`}
            colour="green"
            className="mb-2 sm:mr-2"
          ></GenericEventFlag>
          <GenericEventFlag
            text={`Ends ${DateUtils.formatUnixTimeStamp(props.event.end_time)}`}
            colour="green"
          ></GenericEventFlag>
        </div>
      );
    }
  };

  return displayWhen();
};

export default WhenEventFlag;
