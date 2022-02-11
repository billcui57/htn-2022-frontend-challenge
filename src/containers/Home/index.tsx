import { TEvent } from "@/types";
import { Component, useEffect, useState } from "react";
import { EventService } from "@/services";
import EventList from "@/components/EventList";
import EventFlag from "@/components/EventFlag";
import Typography from "@/components/Typography";
import { useUser } from "@auth0/nextjs-auth0";

const HomeContainer = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setIsLoaded(false);
    EventService.list()
      .then((data: TEvent[]) => {
        setEvents(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="px-4 lg:px-64 md:px-16">
      <EventList hasSearch events={events} isAuthenticated={!!user}></EventList>
    </div>
  );
};

export default HomeContainer;
