import { TEvent, EventID } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import Typography from "@/components/Typography";
import DetailsSection from "@/components/DetailsSection";
import { DateUtils } from "@/utils";
import Button from "@/components/Input/Button";
import _ from "lodash";
import EventList from "@/components/EventList";
import EventFlag from "@/components/EventFlag";

type DetailsContainerProps = {
  eventId: EventID;
};

const DetailsContainer = (props: DetailsContainerProps) => {
  const [event, setEvent] = useState<TEvent>();
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    EventService.get(props.eventId)
      .then((data: TEvent) => {
        setEvent(data);
        const relatedEventPromises: Promise<TEvent>[] = [];
        if (data?.related_events && !_.isEmpty(data?.related_events)) {
          for (const related_event_id of data?.related_events) {
            relatedEventPromises.push(EventService.get(related_event_id));
          }
        }
        return Promise.all(relatedEventPromises);
      })
      .then((relatedEvents: TEvent[]) => {
        setRelatedEvents(relatedEvents);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [props.eventId]);

  if (!event) {
    return null;
  }

  const getStartEndText = (startTime, endTime) => {
    return `${DateUtils.formatUnixTimeStamp(
      startTime
    )} - ${DateUtils.formatUnixTimeStamp(endTime)}`;
  };

  const handleJoinNow = (event: TEvent) => {};

  return (
    <div className="px-8 lg:px-64 md:px-16 ">
      <Typography
        colour="text"
        size="subtitle"
        bold
        text={event.name}
        className="flex justify-center m-8"
      ></Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center mb-4">
        <DetailsSection
          text={event.description}
          sectionTitle="Description"
        ></DetailsSection>

        <DetailsSection sectionTitle="Event Type">
          <EventFlag text={event.event_type} colour="blue"></EventFlag>
        </DetailsSection>

        <DetailsSection sectionTitle="Permission">
          <EventFlag text={event.permission} colour="yellow"></EventFlag>
        </DetailsSection>

        {DateUtils.isWithinRange(
          event.start_time,
          event.end_time,
          Date.now()
        ) ? (
          <DetailsSection sectionTitle="When">
            <Button
              onClick={() => {
                handleJoinNow(event);
              }}
              type="primary"
            >
              Join now!
            </Button>
          </DetailsSection>
        ) : (
          <DetailsSection
            text={getStartEndText(event.start_time, event.end_time)}
            sectionTitle="When"
          ></DetailsSection>
        )}

        <DetailsSection sectionTitle="You may also like...">
          <EventList events={relatedEvents}></EventList>
        </DetailsSection>
      </div>
    </div>
  );
};

export default DetailsContainer;
