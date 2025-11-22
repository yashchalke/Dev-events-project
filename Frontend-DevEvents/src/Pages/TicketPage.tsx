import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Use 'react-router' if using v6
import { useAuth, useUser } from "@clerk/clerk-react";
import QRCode from "react-qr-code";
import toast, { Toaster } from "react-hot-toast";
import GeneralLayout from "../Components/Layouts/GeneralLayout";
import GradientLayout from "../Components/Layouts/GradientLayout";

interface TicketData {
    _id: string;
    userName: string;
    userEmail: string;
    status: string;
    createdAt: string;
    eventId: {
        title: string;
        image: string;
        location: string;
        date: string;
        time: string;
        address: string;
        organizer: string;
    };
}

const TicketPage = () => {
    const { id } = useParams();
    const { getToken, isLoaded: authLoaded } = useAuth();
    const { isSignedIn } = useUser();
    
    const [ticket, setTicket] = useState<TicketData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            if (!authLoaded || !isSignedIn || !id) return;

            try {
                const token = await getToken();
                const response = await fetch(`http://localhost:5000/api/registrations/ticket/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("Failed to load ticket");

                const data = await response.json();
                setTicket(data.Data);
            } catch (error) {
                console.error(error);
                toast.error("Could not load ticket details");
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id, authLoaded, isSignedIn, getToken]);

    if (loading) {
        return (
            <GeneralLayout>
                <div className="h-screen flex items-center justify-center text-white">
                    <div className="w-10 h-10 border-4 border-bg-main border-t-transparent rounded-full animate-spin"></div>
                </div>
            </GeneralLayout>
        );
    }

    if (!ticket) {
        return (
            <GeneralLayout>
                 <div className="h-screen flex items-center justify-center text-white flex-col gap-4">
                    <h2 className="text-2xl font-bold">Ticket Not Found</h2>
                    <Link to="/myevents" className="text-bg-main hover:underline">Go Back</Link>
                </div>
            </GeneralLayout>
        );
    }

    return (
        <GeneralLayout>
            <GradientLayout Gradient={1} />
            <Toaster position="top-center" />
            
            <div className="min-h-screen pt-28 pb-10 px-4 flex justify-center items-center">
                
                {/* TICKET CONTAINER */}
                <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-500">
                    
                    {/* --- TOP SECTION: IMAGE & EVENT --- */}
                    <div className="relative h-64 w-full">
                        <img 
                            src={ticket.eventId.image} 
                            alt={ticket.eventId.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h2 className="text-2xl font-bold leading-tight mb-1">{ticket.eventId.title}</h2>
                            <p className="text-sm text-gray-300">{ticket.eventId.organizer}</p>
                        </div>
                    </div>

                    {/* --- MIDDLE SECTION: DETAILS --- */}
                    <div className="p-6 bg-white text-gray-800 relative">
                        {/* SEMI-CIRCLE CUTOUTS (Left & Right) */}
                        <div className="absolute -left-3 top-[-12px] w-6 h-6 bg-[#0a0a0a] rounded-full"></div>
                        <div className="absolute -right-3 top-[-12px] w-6 h-6 bg-[#0a0a0a] rounded-full"></div>

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Date</p>
                                <p className="text-lg font-bold text-gray-900">{ticket.eventId.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Time</p>
                                <p className="text-lg font-bold text-gray-900">{ticket.eventId.time}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Location</p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">{ticket.eventId.location}</p>
                            <p className="text-xs text-gray-500 mt-1">{ticket.eventId.address}</p>
                        </div>

                        <div className="flex justify-between border-t border-dashed border-gray-300 pt-4">
                             <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Guest</p>
                                <p className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{ticket.userName}</p>
                            </div>
                             <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Status</p>
                                <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded uppercase">
                                    {ticket.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* --- DIVIDER: PERFORATED LINE --- */}
                    <div className="relative w-full h-8 bg-white flex items-center justify-center">
                        <div className="w-full border-t-2 border-dashed border-gray-300 relative top-[1px]"></div>
                        {/* Cutouts for Divider */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0a0a] rounded-full"></div>
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0a0a] rounded-full"></div>
                    </div>

                    {/* --- BOTTOM SECTION: QR CODE --- */}
                    <div className="bg-white p-6 pb-8 flex flex-col items-center justify-center text-center">
                        <p className="text-xs text-gray-400 mb-4 tracking-widest uppercase">Scan at entry</p>
                        <div className="p-2 border-2 border-gray-100 rounded-xl">
                            {/* Unique ID for the QR Code */}
                            <QRCode 
                                value={ticket._id} 
                                size={150}
                                level="H"
                                fgColor="#000000"
                                bgColor="#ffffff"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-4">Ticket ID: {ticket._id}</p>
                    </div>

                </div>
                
                {/* Floating Action Button (Optional: Print/Download) */}
                 <div className="fixed bottom-8 right-8">
                    <button 
                        onClick={() => window.print()}
                        className="bg-white text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform font-bold"
                        title="Print Ticket"
                    >
                        🖨️
                    </button>
                </div>

            </div>
        </GeneralLayout>
    );
};

export default TicketPage;