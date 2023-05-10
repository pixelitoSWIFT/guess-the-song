import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/tailwind.css';
import './assets/styles/main.css';
import Router from './pages/router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router />
  // </React.StrictMode>
);


reportWebVitals();
