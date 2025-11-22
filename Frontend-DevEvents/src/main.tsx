import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      // 👇 ADD THIS APPEARANCE PROP
      appearance={{
        baseTheme:dark, // Uncomment if you want the whole modal to be dark mode
        variables: {
          colorPrimary: "#9333ea", // Matches your 'text-purple-600'
          colorInputBackground: "white", // <--- FIXES THE GREY BOX (try 'transparent' or 'white')
          colorInputText: "black",
          borderRadius: "0.5rem",
          colorModalBackdrop:"black",
          
        },
        elements: {
          // Customizing the main button to match your site
          formButtonPrimary: "bg-purple-600 hover:bg-purple-500 text-white shadow-none",
          // Customizing the input field to be cleaner
          formFieldInput: "border border-gray-300 focus:border-purple-600 focus:ring-purple-600",
          // Removes the grey background from the footer if any
          footer: "bg-transparent",
        }
      }}
    >
      <App />
    </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
