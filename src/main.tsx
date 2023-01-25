import React from 'react'
import ReactDOM from 'react-dom/client'
import.meta.env.REACT_APP_BACKEND_DOMAIN
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right"
      reverseOrder={false} />
  </React.StrictMode>,
)
