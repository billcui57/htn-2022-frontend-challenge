import { TEvent, TEventID, TSpeaker } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import Typography from "@/components/Typography";
import DetailsSection from "@/components/DetailsSection";
import { DateUtils } from "@/utils";
import Button from "@/components/Input/Button";
import _ from "lodash";
import EventList from "@/components/EventList";
import EventFlag from "@/components/EventFlag";
import Image from "next/image";

type DetailsContainerProps = {
  TEventID: TEventID;
};

const DetailsContainer = (props: DetailsContainerProps) => {
  const [event, setEvent] = useState<TEvent>();
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    EventService.get(props.TEventID)
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
  }, [props.TEventID]);

  if (!event) {
    return null;
  }

  const getStartEndText = (startTime, endTime) => {
    return `${DateUtils.formatUnixTimeStamp(
      startTime
    )} - ${DateUtils.formatUnixTimeStamp(endTime)}`;
  };

  const displaySpeakers = () => {
    if (!_.isEmpty(event.speakers)) {
      return (
        <div>
          <DetailsSection sectionTitle="Speakers">
            {event.speakers.map((speaker: TSpeaker, i: number) => {
              const imageUrl = speaker.profile_pic;
              console.log(imageUrl);

              return (
                <div
                  key={`Speaker ${i}`}
                  className="flex justify-center items-center space-x-4"
                >
                  <div>
                    {speaker.profile_pic && (
                      <Image
                        width={100}
                        height={100}
                        src={imageUrl}
                        alt={`Speaker ${i}`}
                        className="rounded-full"
                      ></Image>
                    )}
                  </div>

                  <Typography
                    text={speaker.name}
                    colour="text"
                    size="base"
                  ></Typography>
                </div>
              );
            })}
          </DetailsSection>
        </div>
      );
    }
  };

  const handleJoinNow = (event: TEvent) => {};

  return (
    <div className="px-4 lg:px-64 md:px-16 ">
      <Typography
        colour="text"
        size="subtitle"
        bold
        text={event.name}
        className="flex justify-center m-8"
      ></Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center mb-4">
        <DetailsSection
          className="row-span-2 col-span-2"
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
          <DetailsSection sectionTitle="When">
            <EventFlag
              text={getStartEndText(event.start_time, event.end_time)}
              colour="green"
            ></EventFlag>
          </DetailsSection>
        )}

        {displaySpeakers()}

        {!_.isEmpty(relatedEvents) && (
          <DetailsSection
            sectionTitle="You may also like..."
            className="col-span-2"
          >
            <EventList events={relatedEvents}></EventList>
          </DetailsSection>
        )}
      </div>
    </div>
  );
};

export default DetailsContainer;
