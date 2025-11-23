import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import GeneralLayout from "../Components/Layouts/GeneralLayout";
import GradientLayout from "../Components/Layouts/GradientLayout";
import MiniForm from "../Components/MiniForm";
import { Toaster, toast } from 'react-hot-toast';

// Define Interface
interface EventData {
  _id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  address: string;
  date: string;
  time: string;
  description: string;
  agenda: string;
  organizer: string;
  createdBy: string; // Added createdBy field
}

const EventDetails = () => {
  const { id } = useParams(); 
  const { user, isLoaded: isUserLoaded } = useUser(); // Get current user
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        const data = await response.json();
        setEvent(data.Data); 
      } catch (error) {
        console.error("Error:", error);
        toast.error("Could not load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Check if the current logged-in user is the creator of this event
  const isOrganizer = isUserLoaded && user && event && user.id === event.createdBy;

  if (loading) {
    return (
      <GeneralLayout>
        <GradientLayout Gradient={1} />
        <div className="h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-bg-main border-t-transparent rounded-full animate-spin"></div>
        </div>
      </GeneralLayout>
    );
  }

  if (!event) {
    return (
      <GeneralLayout>
        <GradientLayout Gradient={1} />
         <div className="h-screen flex items-center justify-center text-white">Event not found.</div>
      </GeneralLayout>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />
      <GeneralLayout>
        <GradientLayout Gradient={1} />
        
        <div className="mt-20 p-6 md:p-10 min-h-screen">
          
          {/* Header Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8">
            <h1 className="heading text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">{event.title}</h1>
            <p className="poppins-regular mt-1 text-lg md:text-xl italic text-purple-300">
               {event.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>
          </div>

          <div className="flex md:flex-row flex-col gap-10">
            
            {/* Left Column: Content */}
            <div className="w-full md:w-[65%] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              
              <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-white/10 mb-10 group">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105" 
                />
              </div>

              {/* MOBILE VIEW: Logic for Organizer vs Attendee */}
               <div className="block md:hidden mb-10">
                {isOrganizer ? (
                    <div className="bg-white/10 border border-white/20 p-6 rounded-xl text-center shadow-xl backdrop-blur-md">
                        <h3 className="text-xl font-bold text-white mb-2">Manage Your Event</h3>
                        <p className="text-gray-300 text-sm mb-4">Scan attendee tickets for entry.</p>
                        <Link to="/scan-ticket">
                            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-lg transition-all shadow-lg flex justify-center items-center gap-2">
                                <span>📷</span> Verify Tickets
                            </button>
                        </Link>
                    </div>
                ) : (
                    <MiniForm eventId={event._id} />
                )}
              </div>

              {/* Overview */}
              <div className="mb-10">
                <h3 className="font-special-gothic text-3xl text-white mb-4 border-b border-white/10 pb-2">Overview</h3>
                <p className="poppins-regular text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {event.description}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 mb-10 shadow-xl">
                <h3 className="font-special-gothic text-2xl text-bg-main mb-6 uppercase tracking-wider text-sm">Event Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300"><img src="/icons/calendar.svg" alt="Date" className="w-6 h-6 opacity-70"/></div>
                        <div><p className="text-gray-400 text-sm uppercase tracking-wider">Date</p><p className="text-white text-lg font-semibold mt-1">{event.date}</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                         <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300"><img src="/icons/clock.svg" alt="Time" className="w-6 h-6 opacity-70"/></div>
                        <div><p className="text-gray-400 text-sm uppercase tracking-wider">Time</p><p className="text-white text-lg font-semibold mt-1">{event.time}</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                         <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300"><img src="/icons/pin.svg" alt="Loc" className="w-6 h-6 opacity-70"/></div>
                        <div><p className="text-gray-400 text-sm uppercase tracking-wider">Location</p><p className="text-white text-lg font-semibold mt-1">{event.location}</p></div>
                    </div>
                     <div className="flex items-start gap-4">
                         <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300 flex items-center justify-center"><span className="text-xl">🗺️</span></div>
                        <div><p className="text-gray-400 text-sm uppercase tracking-wider">Full Address</p><p className="text-white text-lg font-semibold mt-1">{event.address}</p></div>
                    </div>
                </div>
              </div>

              {event.agenda && (
                  <div className="mb-10">
                    <h3 className="font-special-gothic text-3xl text-white mb-4 border-b border-white/10 pb-2">Agenda</h3>
                    <div className="bg-black/30 p-8 rounded-xl border-l-4 border-bg-main shadow-inner">
                        <p className="text-gray-300 poppins-regular leading-loose whitespace-pre-line font-mono text-sm md:text-base">{event.agenda}</p>
                    </div>
                  </div>
              )}
              
              {/* Organizer */}
              <div className="mb-20">
                <h3 className="font-special-gothic text-3xl text-white mb-6 border-b border-white/10 pb-2">Organizer</h3>
                <div className="flex items-center gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        {event.organizer.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white text-2xl font-bold">{event.organizer}</p>
                        <p className="text-sm text-bg-main uppercase tracking-wider mt-1">Official Event Host</p>
                    </div>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW: Sticky Sidebar Logic */}
            <div className="hidden md:block md:w-[35%] animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
              <div className="sticky top-32">
                  {isOrganizer ? (
                    <div className="bg-white/10 border border-white/20 p-8 rounded-xl text-center shadow-2xl backdrop-blur-xl">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Organizer Dashboard</h3>
                        <p className="text-gray-300 mb-6">You are the host of this event.</p>
                        
                        <Link to="/scan-ticket">
                            <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-900/50 flex justify-center items-center gap-3 transform hover:-translate-y-1">
                                <span className="text-xl">📷</span> 
                                <span>Launch Ticket Scanner</span>
                            </button>
                        </Link>
                        
                        <p className="text-xs text-gray-500 mt-4">Use this tool to validate attendee entry.</p>
                    </div>
                  ) : (
                    <MiniForm eventId={event._id} />
                  )}
              </div>
            </div>

          </div>
        </div>
      </GeneralLayout>
    </div>
  )
}

export default EventDetails;