import { TEvent } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import EventList from "@/components/EventList";
import EventFlag from "@/components/EventFlag";
import Typography from "@/components/Typography";

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

  return (
    <div className="px-8 lg:px-64 md:px-16">
      <EventList hasSearch events={events}></EventList>
    </div>
  );
};

export default HomeContainer;
