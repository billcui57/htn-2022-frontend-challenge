import { TEvent, TEventID, TSpeaker } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import Typography from "@/components/Typography";
import DetailsSection from "@/components/DetailsSection";
import { DateUtils } from "@/utils";
import Button from "@/components/Input/Button";
import _ from "lodash";
import EventList from "@/components/EventList";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import EventWhenDetailsSection from "@/components/EventFlags/WhenEventFlag";
import WhenEventFlag from "@/components/EventFlags/WhenEventFlag";

type DetailsContainerProps = {
  TEventID: TEventID;
};

const DetailsContainer = (props: DetailsContainerProps) => {
  const [event, setEvent] = useState<TEvent>();
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const [isEventLoading, setIsEventLoading] = useState<boolean>(true);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setIsEventLoading(true);
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
        setIsEventLoading(false);
      })
      .catch((err) => console.log(err));
  }, [props.TEventID]);

  if (!event) {
    return null;
  }

  const displaySpeakers = () => {
    if (!_.isEmpty(event.speakers)) {
      return (
        <DetailsSection
          sectionTitle="Speakers"
          className="col-span-2 sm:col-span-1 my-4"
        >
          {event.speakers.map((speaker: TSpeaker, i: number) => {
            return (
              <div
                key={`Speaker ${i}`}
                className="flex justify-center items-center space-x-4"
              >
                {speaker.profile_pic && (
                  <Image
                    width={100}
                    height={100}
                    src={speaker.profile_pic}
                    alt={`Speaker ${i}`}
                    className="rounded-full"
                  ></Image>
                )}

                <Typography
                  text={speaker.name}
                  colour="text"
                  size="base"
                ></Typography>
              </div>
            );
          })}
        </DetailsSection>
      );
    }
  };

  const displayDetails = () => {
    if (isLoading || isEventLoading)
      return (
        <Typography
          text="Loading..."
          colour="text"
          size="base"
          bold
          className="flex justify-center"
        ></Typography>
      );

    return (
      <div>
        <Typography
          colour="green"
          size="subtitle"
          bold
          text={event.name}
          className="flex justify-center m-8"
        ></Typography>

        <DetailsSection
          text={event.description}
          sectionTitle="Description"
        ></DetailsSection>

        <div className="grid grid-cols-2 justify-items-stretch my-4">
          <DetailsSection sectionTitle="Event Type">
            <GenericEventFlag
              text={event.event_type}
              colour="blue"
            ></GenericEventFlag>
          </DetailsSection>

          {event.permission && (
            <DetailsSection sectionTitle="Permission">
              <GenericEventFlag
                text={event.permission}
                colour="yellow"
              ></GenericEventFlag>
            </DetailsSection>
          )}

          <DetailsSection
            sectionTitle="When"
            className="col-span-2 sm:col-span-1 my-4"
          >
            <WhenEventFlag
              event={event}
              isAuthenticated={!!user}
            ></WhenEventFlag>
          </DetailsSection>

          {displaySpeakers()}
        </div>

        {!_.isEmpty(relatedEvents) && (
          <DetailsSection sectionTitle="You may also like...">
            <EventList
              events={relatedEvents}
              isAuthenticated={!!user}
            ></EventList>
          </DetailsSection>
        )}
      </div>
    );
  };

  return <div className="px-4 lg:px-64 md:px-16">{displayDetails()}</div>;
};

export default DetailsContainer;
