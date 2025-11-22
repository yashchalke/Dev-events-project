import React, { useEffect } from "react"
import Navbar from "../Navbar";

interface LayoutProps{
    children:React.ReactNode;
}

const GeneralLayout = ({children}:LayoutProps) => {
  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[])
  return (
    <div className="relative">
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  )
}

export default GeneralLayout