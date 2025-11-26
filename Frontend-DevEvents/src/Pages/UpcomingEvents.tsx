import { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";
import GradientLayout from "../Components/Layouts/GradientLayout";
// import { events } from "../Components/constants"

interface event {
  id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const UpcomingEvents = () => {
  const [events, setevents] = useState<event[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events/getevents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setevents(data.events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  return (
    <div className="relative h-fit overflow-visible">
      <div className="absolute top-1/2 w-full h-fit">
        <GradientLayout Gradient={1} />
      </div>

      <h1 className="p-10 subheading z-20 text-white">Upcoming Events</h1>
      <div className="flex justify-center mb-10">
        <ul className="events">
          {events.map((event) => (
            <li key={event.id} className="list-none glass p-2 bg-white/10">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingEvents;
