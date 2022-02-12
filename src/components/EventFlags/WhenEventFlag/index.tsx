import { TEvent } from "@/types";
import { DateUtils } from "@/utils";
import { UserProfile } from "@auth0/nextjs-auth0";
import DetailsSection from "@/components/DetailsSection";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import Button from "@/components/Input/Button";

type WhenEventFlagProps = {
  event: TEvent;
  isAuthenticated: boolean;
};

const WhenEventFlag = (props: WhenEventFlagProps) => {
  const handleJoinNow = () => {
    if (props.isAuthenticated) {
      window.location.assign(props.event.private_url);
    } else {
      window.location.assign(props.event.public_url);
    }
  };

  const getStartEndText = (startTime, endTime) => {
    return `${DateUtils.formatUnixTimeStamp(
      startTime
    )} - ${DateUtils.formatUnixTimeStamp(endTime)}`;
  };

  const shouldJoinNow = (event: TEvent) => {
    return DateUtils.isWithinRange(
      event.start_time,
      event.end_time,
      event.end_time - 1
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
            {/* <GenericEventFlag
              text="Join here!"
              colour="green"
            ></GenericEventFlag> */}
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
        <GenericEventFlag
          text={getStartEndText(props.event.start_time, props.event.end_time)}
          colour="green"
        ></GenericEventFlag>
      );
    }
  };

  return displayWhen();
};

export default WhenEventFlag;
