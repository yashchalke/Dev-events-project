import { Link } from "react-router-dom";

interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

interface RegistrationData {
  _id: string;
  status: string;
  createdAt: string;
  eventId: Event;
}

const RegisteredEventCard = ({ data }: { data: RegistrationData }) => {
  const { eventId: event, status, _id: ticketId } = data;

  return (
    <div className="relative group w-full h-fit bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-lg flex flex-col md:flex-row">
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            status === "registered"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="md:w-1/3 w-full h-48 md:h-auto relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
        <div>
          <Link to={`/events/${event.slug}`}>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-500 transition-colors">
              {event.title}
            </h3>
          </Link>

          <div className="flex flex-col gap-2 mt-3 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>
                {event.date} at {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-xs text-gray-500">
            Booked: {new Date(data.createdAt).toLocaleDateString()}
          </span>

          <Link
            to={`/ticket/${ticketId}`}
            className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
          >
            <span>View Ticket</span>
            <span className="text-lg">🎫</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisteredEventCard;
