import { TEvent } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import EventList from "@/components/EventList";
import EventFlag from "@/components/EventFlag";

const HomeContainer = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    EventService.list()
      .then((data: TEvent[]) => {
        setEvents(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(events.length);

  return (
    <div>
      <EventFlag colour="blue" text="hello" />
    </div>
  );
};

export default HomeContainer;
