import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom"; 
import GeneralLayout from "../Components/Layouts/GeneralLayout";
import GradientLayout from "../Components/Layouts/GradientLayout";
import RegisteredEventCard from "../Components/RegisteredEventCard";

// 1. Define the Interfaces
interface Event {
    _id: string;
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

interface Registration {
    _id: string;
    status: string;
    createdAt: string;
    eventId: Event; // This matches the populated field from backend
}

const MyEvents = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  
  // 2. Apply the Interface to useState
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
        if (!isLoaded || !isSignedIn) {
            setLoading(false);
            return;
        }

        try {
            const token = await getToken();
            const response = await fetch('http://localhost:5000/api/registrations/my-events', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch registrations");
            }

            const data = await response.json();
            setRegistrations(data.Data);

        } catch (error) {
            console.error(error);
            toast.error("Could not load your events");
        } finally {
            setLoading(false);
        }
    };

    fetchMyEvents();
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <div>
        <Toaster position="top-center" />
        <GeneralLayout>
            <GradientLayout Gradient={1} />
            
            <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="heading text-4xl md:text-5xl">My <span className="text-bg-main">Tickets</span></h1>
                    <p className="text-gray-400 mt-2">Manage your upcoming events and bookings here.</p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center h-60 gap-4">
                        <div className="w-10 h-10 border-4 border-bg-main border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400">Loading your events...</p>
                    </div>
                )}

                {/* Not Signed In State */}
                {!loading && !isSignedIn && (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
                        <h2 className="text-2xl text-white font-bold mb-2">Please Sign In</h2>
                        <p className="text-gray-400">You need to be logged in to view your registered events.</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && isSignedIn && registrations.length === 0 && (
                     <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center gap-4">
                        <div className="text-6xl">🎫</div>
                        <div>
                            <h2 className="text-2xl text-white font-bold mb-2">No Events Found</h2>
                            <p className="text-gray-400">You haven't registered for any events yet.</p>
                        </div>
                        <Link to="/" className="button-rounded mt-4">Explore Events</Link>
                    </div>
                )}

                {/* Grid of Cards */}
                {!loading && isSignedIn && registrations.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* 3. 'registration' is now automatically inferred as 'Registration' type */}
                        {registrations.map((registration) => (
                            <RegisteredEventCard 
                                key={registration._id} 
                                data={registration} 
                            />
                        ))}
                    </div>
                )}

            </div>
        </GeneralLayout>
    </div>
  )
}

export default MyEvents;