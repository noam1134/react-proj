import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LinkedInLinks from './Components/LinkedinPorfiles';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <LinkedInLinks />
  </React.StrictMode>,
)
