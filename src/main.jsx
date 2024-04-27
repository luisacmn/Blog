import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByStk8w6G7cEWR4_wLXR1pa5IUa70Jcyc",
  authDomain: "react-blog-6da18.firebaseapp.com",
  projectId: "react-blog-6da18",
  storageBucket: "react-blog-6da18.appspot.com",
  messagingSenderId: "987389172255",
  appId: "1:987389172255:web:d416ae2e86cfbab5cd532a"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
