import React, { useEffect, useState } from "react";
import { useUser, useAuth, SignInButton } from "@clerk/clerk-react";
import toast from "react-hot-toast";

interface Props {
  eventId: string;
}

const MiniForm = ({ eventId }: Props) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (!eventId || !isSignedIn) return;

      setCheckingStatus(true);
      try {
        const token = await getToken();
        const response = await fetch(
          `http://localhost:5000/api/registrations/status/${eventId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsRegistered(data.isRegistered);
        }
      } catch (error) {
        console.error("Error checking status:", error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkStatus();
  }, [eventId, isSignedIn, getToken]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;

    setLoading(true);
    try {
      const token = await getToken();

      const response = await fetch(
        "http://localhost:5000/api/registrations/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName || user?.username || "Guest",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("🎉 Successfully Registered!");
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || checkingStatus) {
    return (
      <div className="w-full h-40 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-bg-main border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="w-full h-fit bg-white/5 backdrop-blur-md border border-white/10 px-6 py-8 flex flex-col gap-4 rounded-xl shadow-xl text-center">
        <h2 className="text-white font-semibold text-xl">Join the Event</h2>
        <p className="text-gray-400 text-sm">
          You must be logged in to register for this event.
        </p>
        <div className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
          <SignInButton mode="modal">Sign In to Register</SignInButton>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="w-full h-fit bg-green-500/10 backdrop-blur-md border border-green-500/50 px-6 py-8 flex flex-col gap-5 rounded-xl shadow-xl text-center">
        <div className="text-5xl">🎟️</div>
        <h2 className="text-green-400 font-semibold text-xl">You're Going!</h2>
        <p className="text-gray-300 text-sm">
          You have successfully registered for this event. Check your email for
          details.
        </p>
        <button className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg cursor-default">
          Registration Confirmed ✅
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleRegister}
      className="w-full h-fit bg-white/5 backdrop-blur-md border border-white/10 px-6 py-8 flex flex-col gap-5 rounded-xl shadow-xl"
    >
      <h2 className="text-white font-semibold text-xl border-b border-white/10 pb-2">
        Book Your Spot
      </h2>

      <div>
        <label className="text-gray-400 text-xs uppercase tracking-wider">
          Registered As
        </label>
        <div className="text-white font-medium text-lg truncate">
          {user?.fullName || user?.username}
        </div>
        <div className="text-gray-400 text-sm truncate">
          {user?.primaryEmailAddress?.emailAddress}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-bg-main hover:bg-purple-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-purple-900/50 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {loading ? "Registering..." : "Confirm Registration"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By registering, you agree to the event terms.
      </p>
    </form>
  );
};

export default MiniForm;
