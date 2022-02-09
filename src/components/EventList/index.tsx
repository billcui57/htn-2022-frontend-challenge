import { TEvent } from "@/types";

type EventListProps = {
  events: TEvent[];
};

const EventList = (props: EventListProps) => {
  const displayEventItem = (event: TEvent) => {
    return <div>{event.name}</div>;
  };

  return (
    <div>
      {props.events.map((event: TEvent) => {
        return <div key={event.id}> {displayEventItem(event)} </div>;
      })}
    </div>
  );
};

export default EventList;
