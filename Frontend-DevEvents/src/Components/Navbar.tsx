import { useState } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="glass w-full fixed top-0 z-50">
      <nav className="flex justify-between px-10 py-5 items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <h1 className="flex gap-x-1 nav-logo">
            <span>Dev</span>
            <span className="text-main">Events</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-ul">
          <Link to="/">Home</Link>
          <Link to="/myevents">My Events</Link>
          <Link to="/create-new-event">Create Event</Link>
        </ul>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          <AuthButton />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#0a0a0a] z-40 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center space-y-8 text-center">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-3xl font-bold text-white hover:text-purple-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/myevents"
            onClick={() => setIsOpen(false)}
            className="text-3xl font-bold text-white hover:text-purple-500 transition-colors"
          >
            My Events
          </Link>
          <Link
            to="/create-new-event"
            onClick={() => setIsOpen(false)}
            className="text-3xl font-bold text-white hover:text-purple-500 transition-colors"
          >
            Create Event
          </Link>
          <div className="pt-6">
            <AuthButton />
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;