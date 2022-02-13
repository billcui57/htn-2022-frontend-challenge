import { TEvent } from "@/types";
import { DateUtils } from "@/utils";
import { UserProfile } from "@auth0/nextjs-auth0";
import DetailsSection from "@/components/DetailsSection";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import Button from "@/components/Input/Button";
import { Fragment } from "react";
import Typography from "@/components/Typography";

type WhenEventFlagProps = {
  event: TEvent;
  isAuthenticated: boolean;
  className?: string;
};

const WhenEventFlag = (props: WhenEventFlagProps) => {
  const handleJoinNow = () => {
    if (!hasJoinLink(props.event, props.isAuthenticated)) {
      alert("Ask on discord for the join link!");
      return;
    }

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
      return (
        <Button onClick={() => handleJoinNow()} type="primary">
          Join here!
        </Button>
      );
    } else {
      return (
        <div className="flex items-center ">
          <GenericEventFlag
            text={`${DateUtils.formatUnixTimeStamp(props.event.start_time)}`}
            colour="green"
          ></GenericEventFlag>

          <Typography
            colour="text"
            size="sm"
            text="to"
            className="mx-1 sm:mb-0"
          ></Typography>

          <GenericEventFlag
            text={`${DateUtils.formatUnixTimeStamp(props.event.end_time)}`}
            colour="green"
          ></GenericEventFlag>
        </div>
      );
    }
  };

  return <div className={`${props.className}`}>{displayWhen()}</div>;
};

export default WhenEventFlag;
