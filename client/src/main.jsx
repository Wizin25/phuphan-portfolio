import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeUmamiAnalytics } from './analytics.js';
import './index.css';

initializeUmamiAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
