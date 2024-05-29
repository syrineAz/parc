import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import reportWebVitals from './reportWebVitals.js'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './Auth/AuthContexte.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>  
    </BrowserRouter>  
  </React.StrictMode>,

);
  reportWebVitals();