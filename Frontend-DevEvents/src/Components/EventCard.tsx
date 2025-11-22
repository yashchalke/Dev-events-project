import { Link } from "react-router";

interface Props{
    title:string;
    image:string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
const EventCard = ({title,image,slug,location,date,time}:Props) => {
  return (
     <Link to={`/events/${slug}`} id="event-card">
        <img src={image} alt={title} width={410} height={300} className="poster"></img>
        <div className="flex flex-row gap-2">
            <img src="/icons/pin.svg" alt="Location" width={14} height={14}/>
            <p>{location}</p>
        </div>
        <div className="datetime">
            <div>
            <img src="/icons/calendar.svg" alt="date" width={14} height={14}/>
            <p>{date}</p>
            </div>
            <div>
            <img src="/icons/clock.svg" alt="time" width={14} height={14}/>
            <p>{time}</p>
            </div>
        </div>
        <p className="title">{title}</p>
    </Link>
  )
}

export default EventCard