import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../I18.js'
import AuthProvider from "./context/Authcontext";
import { BrowserRouter } from "react-router-dom";
import { GranthProvider } from './context/GranthContext.jsx'
import { MandirProvider } from './context/MandirContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      
      <GranthProvider>
        <MandirProvider>
        
        <App />
        </MandirProvider>
    </GranthProvider>
    
    </AuthProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
