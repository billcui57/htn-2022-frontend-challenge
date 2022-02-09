import { TEvent, EventID } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";

type DetailsContainerProps = {
  eventId: EventID;
};

const DetailsContainer = (props: DetailsContainerProps) => {
  const [event, setEvent] = useState<TEvent>();
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

  return <div className="px-8 lg:px-64 md:px-16 ">{event.name}</div>;
};

export default DetailsContainer;
