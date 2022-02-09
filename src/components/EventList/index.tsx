import { TEvent } from "@/types";
import EventListItem from "../EventListItem";

type EventListProps = {
  events: TEvent[];
};

const EventList = (props: EventListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {props.events.map((event: TEvent) => {
        return <EventListItem event={event} key={event.id}></EventListItem>;
      })}
    </div>
  );
};

export default EventList;
