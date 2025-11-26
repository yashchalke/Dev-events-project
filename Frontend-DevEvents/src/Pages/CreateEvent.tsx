import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth, SignInButton } from "@clerk/clerk-react";
import GeneralLayout from "../Components/Layouts/GeneralLayout";
import GradientLayout from "../Components/Layouts/GradientLayout";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileLabel, setFileLabel] = useState("Upload Banner Image");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    address: "",
    date: "",
    time: "",
    description: "",
    agenda: "",
    organizer: "",
  });

  const CLOUDINARY_LINK = import.meta.env.VITE_CLOUDINARY_LINK;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFileLabel(`✅ File uploaded: ${file.name}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) {
      toast.error("Please fill in Title, Date and Location to proceed.");
      return;
    }
    setStep(2);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(1);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formPayload = new FormData();
    formPayload.append("file", file);
    formPayload.append("upload_preset", "Dev_events_upload");

    const res = await fetch(CLOUDINARY_LINK, {
      method: "POST",
      body: formPayload,
    });

    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;

    setLoading(true);

    try {
      const token = await getToken();
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

      const response = await fetch(
        "http://localhost:5000/api/events/createevent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create event");
      }

      toast.success("🎉 Event created successfully!");
      navigate("/myevents");
    } catch (error) {
      console.error("Error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <GeneralLayout>
        <GradientLayout Gradient={1} />
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white/5 border border-white/10 p-10 rounded-2xl text-center backdrop-blur-lg max-w-md w-full animate-in fade-in zoom-in duration-300">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Restricted Access
            </h2>
            <p className="text-gray-400 mb-6">
              You must be an organizer to create events. Please sign in to
              continue.
            </p>
            <div className="flex justify-center">
              <SignInButton mode="modal">
                <button className="button-rounded">Sign In</button>
              </SignInButton>
            </div>
          </div>
        </div>
      </GeneralLayout>
    );
  }

  return (
    <GeneralLayout>
      <GradientLayout Gradient={1} />
      <Toaster position="top-center" />

      <div className="min-h-screen py-20 px-4 flex justify-center items-start pt-32">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl h-fit border border-purple-500/30 bg-black/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col items-center pt-8 pb-4 bg-white/5 border-b border-white/10">
            <h2 className="flex gap-1 font-bold text-2xl tracking-tighter text-white">
              <span>Dev</span>
              <span className="text-purple-500">Events</span>
            </h2>
            <div className="mt-6 flex gap-3 items-center">
              <div
                className={`h-2.5 w-12 rounded-full transition-colors duration-300 ${
                  step >= 1
                    ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`h-2.5 w-12 rounded-full transition-colors duration-300 ${
                  step >= 2
                    ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "bg-gray-700"
                }`}
              ></div>
            </div>
            <p className="text-gray-400 mt-2 text-xs uppercase tracking-widest">
              Step {step} of 2
            </p>
          </div>

          <div className="px-8 py-8 flex flex-col gap-6">
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="group">
                  <label
                    htmlFor="file"
                    className={`block w-full px-4 py-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 
                        ${
                          imageFile
                            ? "border-purple-500 bg-purple-500/10 text-purple-200"
                            : "border-gray-600 text-gray-500 hover:border-purple-400 hover:text-purple-400 hover:bg-white/5"
                        }`}
                  >
                    <div className="text-3xl mb-2">
                      {imageFile ? "🖼️" : "☁️"}
                    </div>
                    {fileLabel}
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 border-b border-gray-600 text-white bg-transparent w-full py-2 px-1 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                    placeholder="e.g. Global React Summit 2025"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Short Tagline / Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="mt-1 border-b border-gray-600 text-white bg-transparent w-full py-2 px-1 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                    placeholder="e.g. The biggest tech meetup..."
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 border-b border-gray-600 text-white bg-transparent w-full py-2 px-1 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                    placeholder="e.g. San Francisco, CA (or Online)"
                  />
                </div>

                <div className="flex md:flex-row flex-col gap-6">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-300 text-sm font-medium ml-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="mt-1 w-full bg-white/10 border border-transparent focus:border-purple-500 text-white p-3 rounded-lg outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-300 text-sm font-medium ml-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="mt-1 w-full bg-white/10 border border-transparent focus:border-purple-500 text-white p-3 rounded-lg outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNext}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-2"
                  >
                    Next Step <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 border-b border-gray-600 text-white bg-transparent w-full py-2 px-1 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                    placeholder="Building, Street, Zip Code"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    className="mt-1 border-b border-gray-600 text-white bg-transparent w-full py-2 px-1 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                    placeholder="Company or Community Name"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Detailed Overview
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 border border-gray-600 bg-white/5 w-full p-3 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
                    placeholder="What is this event about? Who should attend?"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium ml-1">
                    Agenda / Schedule
                  </label>
                  <textarea
                    name="agenda"
                    value={formData.agenda}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 border border-gray-600 bg-white/5 w-full p-3 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder-gray-500"
                    placeholder="e.g. 9:00 AM - Registration..."
                  />
                </div>

                <div className="flex justify-between items-center mt-8 gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                  >
                    <span>←</span> Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 flex-1 md:flex-none md:min-w-[200px]"
                  >
                    {loading ? "Publishing..." : "Publish Event"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </GeneralLayout>
  );
};

export default CreateEvent;
