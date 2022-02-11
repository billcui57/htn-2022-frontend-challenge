import { TEvent } from "@/types";
import { useEffect, useState } from "react";
import EventListItem from "@/components/EventListItem";
import TextInput from "@/components/Input/Text";

type EventListProps = {
  events: TEvent[];
  hasSearch?: boolean;
  isAuthenticated?: boolean;
};

const EventList = (props: EventListProps) => {
  const [filteredEvents, setFilteredEvents] = useState<TEvent[]>(props.events);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    let newEvents: TEvent[] = [];

    if (filterText && filterText.length > 0 && props.hasSearch) {
      newEvents = props.events.filter((event: TEvent) => {
        return event.name.toLowerCase().includes(filterText);
      });
    } else {
      newEvents = props.events;
    }

    if (!props.isAuthenticated) {
      newEvents = newEvents.filter((event: TEvent) => {
        return event.permission == "public";
      });
    }

    setFilteredEvents(
      newEvents.sort((a: TEvent, b: TEvent) => {
        if (a.start_time < b.start_time) {
          return 1;
        } else if (a.start_time > b.start_time) {
          return -1;
        } else {
          return 0;
        }
      })
    );
  }, [props, filterText]);

  const displaySearchBar = () => {
    const handleSearchBarChange = (e: any) => {
      const filter: string = e.target.value;
      setFilterText(filter);
    };

    return (
      <div>
        <TextInput label="Search" onChange={handleSearchBarChange}></TextInput>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {props.hasSearch && displaySearchBar()}
      {filteredEvents.map((event: TEvent) => {
        return <EventListItem event={event} key={event.id}></EventListItem>;
      })}
    </div>
  );
};

export default EventList;
