import { TEvent, EventID } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import Typography from "@/components/Typography";
import DetailsSection from "@/components/DetailsSection";
import { DateUtils } from "@/utils";
import Button from "@/components/Input/Button";
import _ from "lodash";

type DetailsContainerProps = {
  eventId: EventID;
};

const DetailsContainer = (props: DetailsContainerProps) => {
  const [event, ssetEvent] = useState<TEvent>();
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    EventService.get(props.eventId)
      .then((data: TEvent) => {
        setEvent(data);

        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!event) {
    return null;
  }

  const getStartEndText = (startTime, endTime) => {
    return `${DateUtils.formatUnixTimeStamp(
      startTime
    )} - ${DateUtils.formatUnixTimeStamp(endTime)}`;
  };

  return (
    <div className="px-8 lg:px-64 md:px-16 ">
      <Typography
        colour="text"
        size="subtitle"
        bold
        text={event.name}
        className="flex justify-center m-8"
      ></Typography>

      <div className="grid grid-cols-2 gap-4 justify-center mb-4">
        <DetailsSection
          text={event.description}
          sectionTitle="Description"
        ></DetailsSection>

        <DetailsSection
          text={event.event_type}
          sectionTitle="Event Type"
        ></DetailsSection>

        <DetailsSection
          text={event.permission}
          sectionTitle="Permission"
        ></DetailsSection>

        {DateUtils.isWithinRange(
          event.start_time,
          event.end_time,
          event.end_time - 1
        ) ? (
          <DetailsSection sectionTitle="When">
            <Button onClick={() => {}} type="primary">
              Join now!
            </Button>
          </DetailsSection>
        ) : (
          <DetailsSection
            text={getStartEndText(event.start_time, event.end_time)}
            sectionTitle="When"
          ></DetailsSection>
        )}

        <DetailsSection sectionTitle="You may also like..."></DetailsSection>
      </div>
    </div>
  );
};

export default DetailsContainer;
