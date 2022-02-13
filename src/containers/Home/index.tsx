import { TEvent } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import EventList from "@/components/EventList";
import GenericEventFlag from "@/components/EventFlags/GenericEventFlag";
import Typography from "@/components/Typography";
import { useUser } from "@auth0/nextjs-auth0";

const HomeContainer = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState<boolean>(true);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setIsEventsLoading(true);
    EventService.list()
      .then((data: TEvent[]) => {
        setEvents(data);
        setIsEventsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const displayContents = () => {
    if (isLoading || isEventsLoading)
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
      <EventList hasSearch events={events} isAuthenticated={!!user}></EventList>
    );
  };

  return <div className="px-4 lg:px-32 md:px-16 ">{displayContents()}</div>;
};

export default HomeContainer;
