import { TEvent } from "@/types";
import { useEffect, useState } from "react";
import EventListItem from "@/components/EventListItem";
import TextInput from "@/components/Input/Text";

type EventListProps = {
  events: TEvent[];
  hasSearch?: boolean;
};

const EventList = (props: EventListProps) => {
  const [filteredEvents, setFilteredEvents] = useState<TEvent[]>(props.events);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    if (filterText && filterText.length > 0 && props.hasSearch) {
      setFilteredEvents(
        props.events.filter((event: TEvent) => {
          return event.name.toLowerCase().includes(filterText);
        })
      );
    } else {
      setFilteredEvents(props.events);
    }
  }, [props.events, filterText, props.hasSearch]);

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
